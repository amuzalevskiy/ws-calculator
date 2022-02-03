import React, { useCallback, useContext } from 'react'
import { HexGrid, Layout, Hexagon, GridGenerator, Text, Path } from 'react-hexgrid';
import TabContainer from '../../Components/TabContainer'
import { Context, WithNestedContext } from '../../Components/DirectEditorsContext'
import Button from '../../Components/Button';
import _ from 'lodash'

import { defaultSettings } from '../../defaultSettings'

import styles from './index.module.css'
import { getHexagonColor } from '../../lib/mapUtil';
import DirectInput from '../../Components/DirectInput';
import PlayersSelector from '../../Components/PlayersSelector';
import { getCrunchAmount, getMiningBoost, getMiningSpeed, getMiningUnityPerPlayer, getRemoteMining } from '../../Math/game';
import DirectCheckbox from '../../Components/DirectCheckbox';

_.defaultsDeep(defaultSettings, {
  ws: {
    minerGroups: [

    ],
  },
})


function getWaypoints(minerGroup) {
  return minerGroup.path ? minerGroup.path.split(' ').filter(x => x.length === 2) : []  
}

const sectors800 = [ 'B2', 'C2', 'D2', 'E2', 'F2',
                     'B3', 'F3',
                     'B4', 'C5', 'D6', 'E5', 'F4' ]
function is800Sector(shortcut, sectors) {
  return sectors800.indexOf(shortcut) !== -1 && (!sectors[shortcut].type || sectors[shortcut].type[0] !== 'L') // doesn't have planet
}

const sectors3000 = ['C3', 'D3', 'E3', 'C4', 'D5', 'E4']
function is3000Sector(shortcut, sectors) {
  return sectors3000.indexOf(shortcut) !== -1 && (!sectors[shortcut].type || sectors[shortcut].type[0] !== 'L') // doesn't have planet
}

function allCombinations(miners, sectors, type, cb, i = 0, combination = []) {
  let miner = miners[i]
  if (!miner) {
    // console.log(i, combination.map(v => v.miner.name + '-' + v.sector).join(' '))
    cb(combination)
    return
  }
  // don't enable
  allCombinations(miners, sectors, type, cb, i + 1, combination)
  for (let j = 0; j < sectors.length; j++) {
    const sector = sectors[j];
    combination.push({
      type,
      miner,
      sector,
    })
    allCombinations(miners, sectors, type, cb, i + 1, combination)
    combination.pop()
  }
}

function calculateBestMiningTimeWithUnity(miningTasksOrig, minerGroup, players) {
  let sectors = _.uniq(miningTasksOrig.map(x => x.sector)).filter(x => !!x)
  let miningTasks = miningTasksOrig.map(v => ({...v}))
  const miners = minerGroup.players
    .map((playerName) => {
      return players.find(x => x.name === playerName) || null
    })
    .filter(x => !!x)
    .map(x => ({...x}))
    .map(player => {
      player.miningSpeed = getMiningSpeed(player.minerLevel)
      player.miningBoostV = getMiningBoost(player.miningBoost)
      player.remoteMiningV = getRemoteMining(player.remoteMining)
      player.minerUnityV = getMiningUnityPerPlayer(player.minerUnity)
      player.crunchV = getCrunchAmount(player.crunch)

      return player
    })

  const minersWithUnity = miners.filter(player => player.minerUnityV > 0)
  const minersWithCrunch = miners.filter(player => player.crunchV > 0)
  
  let bestTotalTime = Infinity
  let bestMoveTime = 0
  let bestMiningTime = 0
  let bestTimeDetails = {}

  let start = Date.now()

  let unityTasks = sectors.map(name => {
    return miningTasks.filter(x => x.sector === name)[0]
  }).filter(x => !!x)
  let crunchTasks

  if (minerGroup.useCrunch) {
    crunchTasks = [...miningTasks.filter(x => x.type === 'mining')]
    crunchTasks.sort((a,b) => {
      return (a.count - b.count) + (b.water - a.water)/10000
    })
  }

  allCombinations(minersWithUnity, unityTasks, 'unity', (combinationUnity) => {
    if (crunchTasks) {
      allCombinations(minersWithCrunch, crunchTasks, 'crunch', (allCombinations) => {
        let { totalTime, moveTime, miningTime } = calculateMining(miningTasks, miners, minerGroup, allCombinations, bestTotalTime);
  
        if (totalTime < bestTotalTime) {
          bestTotalTime = totalTime
          bestMoveTime = moveTime
          bestMiningTime = miningTime
    
          bestTimeDetails = [...allCombinations]
        }
      }, 0, combinationUnity)
    } else {
      let { totalTime, moveTime, miningTime } = calculateMining(miningTasks, miners, minerGroup, combinationUnity, bestTotalTime);
  
      if (totalTime < bestTotalTime) {
        bestTotalTime = totalTime
        bestMoveTime = moveTime
        bestMiningTime = miningTime
  
        bestTimeDetails = [...combinationUnity]
      }
    }
  })

  console.log("TOOK " + (Date.now() - start).toFixed(0) + 'ms')

  // let { totalTime, moveTime, miningTime } = calculateMining(miningTasks, miners, minerGroup, combinationOpp);

  return {
    miningTasks,
    sectors,
    miners,
    minersWithUnity,
    totalTime: bestTotalTime,
    moveTime: bestMoveTime,
    miningTime: bestMiningTime,
    bestTimeDetails,
  }
}

const UNITY_DURATION = 50
function calculateMining(miningTasks, miners, minerGroup, combinationOpp, bestTotalTime) {
  let totalTime = 0.01;
  let moveTime = 0;
  let miningTime = 0;

  for (let m = 0; m < miners.length; m++) {
    const miner = miners[m];
    delete miner.unityEnabledAt
    miner.takenCapacity = 0
  }

  for (let i = 0; i < miningTasks.length; i++) {
    let task = miningTasks[i];
    switch (task.type) {
      case 'mining':
        let waterAmount = task.water
        let applicableCombos = combinationOpp.filter(x => x.sector === task)
        if (applicableCombos.length) {
          for (let j = 0; j < applicableCombos.length; j++) {
            const {miner: player, type} = applicableCombos[j];
            switch (type) {
              case 'unity':
                if (!player.unityEnabledAt) {
                  player.unityEnabledAt = totalTime
                }
                break
              case 'crunch':
                waterAmount -= player.crunchV / task.count
                if (waterAmount < 0) {
                  waterAmount = 0
                }
                break
              default:
            }
          }
        }
        // eslint-disable-next-line no-loop-func
        const miningSpeedPerAsteroid = miners.reduce((acc, player) => {
          let unityMultiplier = 1
          if (player.unityEnabledAt && totalTime < (player.unityEnabledAt + UNITY_DURATION)) {
            unityMultiplier = 1 + (miners.length - 1) * player.minerUnityV
          }
          if (minerGroup.removeRemoteMiningApprox) {
            return acc + player.miningSpeed * player.miningBoostV * unityMultiplier;
          }
          return acc + player.miningSpeed * player.miningBoostV * player.remoteMiningV * unityMultiplier;
        }, 0);

        totalTime += waterAmount / miningSpeedPerAsteroid;
        miningTime += waterAmount / miningSpeedPerAsteroid;
        break;
      case 'move':
        totalTime += task.time;
        moveTime += task.time;
        break;
      case 'crunch':
        break;
      default:
    }
    if (totalTime > bestTotalTime) {
      break
    }
  }
  return { totalTime, moveTime, miningTime };
}

function mapToRegularNames(hexagons) {
  const map = {}
  let letters = ['A','B','C','D','E','F','G']
  let shifts = [-3,-3,-3,-3,-2,-1,0]
  hexagons.forEach(hexagon => {
    // hexagon.q // column
    // hexagon.s // row
    const shortcut = letters[hexagon.q + 3] + (1 - hexagon.s - shifts[hexagon.q + 3])
    hexagon.shortcut = shortcut
    map[shortcut] = hexagon
  });
  return map
}

let colors = ['green', 'blue', 'yellow', 'coral', 'seagreen']
function getUnusedColor(minerGroups) {
  return colors.find(color => !minerGroups.some(v => v.color === color))
}

const TimeToCollect = () => {
  const context = useContext(Context)
  const [minerGroups, setMinerGroups] = context.useState('/ws/minerGroups')
  const [sectors] = context.useState('/ws/field/sectors')
  const [players] = context.useState('/ws/players')
  const hexagons = GridGenerator.hexagon(3);
  const strToHexagon = mapToRegularNames(hexagons);

  const addMiningGroup = useCallback(() => {
    setMinerGroups([...minerGroups, {
      color: getUnusedColor(minerGroups),
      players: [],
      path: '',
      enable800: true,
      enable3000: true
    }])
  }, [minerGroups, setMinerGroups])
  const removeMiningGroup = useCallback((groupToRemove) => {
    setMinerGroups(minerGroups.filter(x => x !== groupToRemove))
  }, [minerGroups, setMinerGroups])
  return <TabContainer name="CollectRoutes">
    <div className={styles.twoColumnLayout}>
      <div className={styles.columnOne}>
        <HexGrid width={400} height={400}>
          <Layout size={{ x: 7, y: 7 }} flat={true} spacing={1.1} >
            { hexagons.map((hex, i) => {
              return <Hexagon className={styles.cell + ' ' + styles[getHexagonColor(sectors[hex.shortcut]).replace('#', 'color-')]} key={i} q={hex.q} r={hex.r} s={hex.s}>
                <Text className={styles.cellName}>{hex.shortcut}</Text>
              </Hexagon>
            }) }
            { minerGroups.map((minerGroup, i) => {
              if (!minerGroup.path) {
                return <></>
              }
              let waypoints = getWaypoints(minerGroup)
              return waypoints.map((from, index) => {
                if (index === waypoints.length - 1) {
                  return <></>
                }
                const to = waypoints[index+1]
                return <g style={{
                  stroke: 'light' + minerGroup.color,
                  strokeWidth: 2,
                  strokeLinecap: 'round'
                }} ><Path start={strToHexagon[from]} end={strToHexagon[to]} /></g>
              })
            }) }
          </Layout>
        </HexGrid>
      </div>
      <div className={styles.columnTwo}>
        <Button onClick={addMiningGroup}>Добавить группу майнеров</Button>
        <div className={styles.columnLayout}>
          {minerGroups.map((minerGroup, i) => {
            return <WithNestedContext pointer={`/ws/minerGroups/${i}`}>
              <div className={styles.column}>
                <div className={styles.columnLabel}>Цвет: <span style={{background: `light${minerGroup.color}`}}>{minerGroup.color}</span></div>
                <Button className={styles.keepTopRight} onClick={() => removeMiningGroup(minerGroup)}>Удалить</Button>
                <DirectInput label="Путь" pointer="/path" type="string" defaultValue=''/>
                <DirectCheckbox label="Старт после 800 астера" pointer="/enable800" defaultValue={true}/>
                <DirectCheckbox label="После 3000 астера" pointer="/enable3000" defaultValue={true}/>
                <DirectCheckbox label="Использовать кризис" pointer="/useCrunch" defaultValue={true}/>
                <DirectCheckbox label="Снять удаленку (прибл.)" pointer="/removeRemoteMiningApprox" defaultValue={false}/>

                <hr />

                Игроки: <PlayersSelector pointer="/players" />
              
                <PathDetails minerGroup={minerGroup} sectors={sectors} players={players} />
              </div>
            </WithNestedContext>
          })}
        </div>
      </div>
    </div>
  </TabContainer>
}

const PathDetails = React.memo(function PathDetails({minerGroup, sectors, players}) {
  let assignedTasks = []
  let waypoints = getWaypoints(minerGroup)
  const totalWaterAmount = waypoints.reduce((a, c) => {
    let hydro = (sectors[c]?.hydro || 0)
    if (minerGroup.enable800 && is800Sector(c, sectors)) {
      hydro = hydro + 800
    }

    if (minerGroup.enable3000 && is3000Sector(c, sectors)) {
      hydro = hydro + 3000
    }

    return a + hydro
  }, 0)

  const totalWaterCapacity = minerGroup.players.reduce((acc, playerName) => {
    return acc + (players.find(x => x.name === playerName) || {}).capacity || 0
  }, 0)
  
  const miningSpeedPerAsteroid = minerGroup.players.reduce((acc, playerName) => {
    let player = players.find(x => x.name === playerName)
    if (!player) {
      return acc
    }
    if (minerGroup.removeRemoteMiningApprox) {
      return acc + getMiningSpeed(player.minerLevel) * getMiningBoost(player.miningBoost)                  
    }
    return acc + getMiningSpeed(player.minerLevel) * getMiningBoost(player.miningBoost) * getRemoteMining(player.remoteMining)
  }, 0)


  const miningTasks = waypoints.reduce((a,c) => {
    let waterPerAsteroid = (sectors[c]?.hydro || 0) / (sectors[c]?.asteroids || 1)
    let generalTask = {
      type: 'mining',
      sector: c,
      water: waterPerAsteroid,
      count: (sectors[c]?.asteroids || 1)
    }
    let additionalTask
    if (minerGroup.enable800 && is800Sector(c, sectors)) {
      additionalTask = {
        type: 'mining',
        sector: c,
        water: 800 - waterPerAsteroid,
        count: 1
      }
      generalTask.count++
    }
    if (minerGroup.enable3000 && is3000Sector(c, sectors)) {
      additionalTask = {
        type: 'mining',
        sector: c,
        water: 3000 - waterPerAsteroid,
        count: 1
      }
      generalTask.count++
    }
    a.push(generalTask)
    if (additionalTask) {
      a.push(additionalTask)
    }
    a.push({
      type: 'move',
      time: 10,
    })
    return a
  }, [])

  miningTasks.splice(miningTasks.length-1, 1)

  const miningResult = calculateBestMiningTimeWithUnity(miningTasks, minerGroup, players)

  const totalMovementTimeHrs = miningResult ? miningResult.moveTime : 0
  const totalMiningTimeHrs = miningResult ? miningResult.miningTime : 0

  try {
    miningResult.bestTimeDetails.forEach(({type, miner, sector}) => {
      switch(type) {
        case 'unity':
          assignedTasks.push({
            playerName: miner.name,
            type: 'профик',
            sector: sector,
          })
          break
        case 'crunch':
          assignedTasks.push({
            playerName: miner.name,
            type: 'кризис',
            sector: sector,
          })
          break
        default:
      }
    })
  } catch(e) {
    console.error(e)
  }

  return <>
    <dl>
      <dt>Общий бак:</dt>
      <dd>{totalWaterCapacity}</dd>

      <dt>Всего воды:</dt>
      <dd>{totalWaterAmount}</dd>

      <dt>Скорость добычи:</dt>
      <dd>{miningSpeedPerAsteroid.toFixed(2)} в час</dd>

      <dt>Время движения:</dt>
      <dd>{totalMovementTimeHrs.toFixed(2)} часов</dd>

      <dt>Время добычи:</dt>
      <dd>{totalMiningTimeHrs.toFixed(2)} часов</dd>
    </dl>
    <hr />
    <h5>Задачи:</h5>
    {assignedTasks.map((v, i) => {
      return <div key={i}>{v.playerName} {v.type} {v.sector.sector}</div>
    })}
  </>
})

export default TimeToCollect