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

_.defaultsDeep(defaultSettings, {
  ws: {
    minerGroups: [

    ],
  },
})

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
  const hexagons = GridGenerator.hexagon(3);
  const strToHexagon = mapToRegularNames(hexagons);

  const addMiningGroup = useCallback(() => {
    setMinerGroups([...minerGroups, {
      color: getUnusedColor(minerGroups)
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
                console.log(from, '=>', to)
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
              let waypoints = getWaypoints(minerGroup)
              const totalWaterAmount = waypoints.reduce((a, c) => {
                return a + (sectors[c]?.hydro || 0)
              }, 0)
              return <WithNestedContext pointer={`/ws/minerGroups/${i}`}>
              <div className={styles.column}>
                <div className={styles.columnLabel}>Цвет: <span style={{background: `light${minerGroup.color}`}}>{minerGroup.color}</span></div>
                <Button className={styles.keepTopRight} onClick={() => removeMiningGroup(minerGroup)}>Удалить</Button>
                <DirectInput label="Путь" pointer="/path" type="string" defaultValue=''/>
                <div className={styles.columnLabel}>Воды: {totalWaterAmount}</div>
              </div>
            </WithNestedContext>
          })}
        </div>
      </div>
    </div>
  </TabContainer>
}

export default TimeToCollect
function getWaypoints(minerGroup) {
  return minerGroup.path.split(' ').filter(x => x.length === 2);
}

