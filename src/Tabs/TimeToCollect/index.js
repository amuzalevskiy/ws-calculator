import React, { useCallback, useContext } from 'react'
import { HexGrid, Layout, Hexagon, GridGenerator, Text } from 'react-hexgrid';
import TabContainer from '../../Components/TabContainer'
import { Context } from '../../Components/DirectEditorsContext'
import Button from '../../Components/Button';
import _ from 'lodash'

import { defaultSettings } from '../../defaultSettings'

import styles from './index.module.css'

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
            { hexagons.map((hex, i) => <Hexagon  className={styles.cell} key={i} q={hex.q} r={hex.r} s={hex.s}>
              <Text className={styles.cellName}>{hex.shortcut}</Text>
            </Hexagon>) }
          </Layout>
        </HexGrid>
      </div>
      <div className={styles.columnTwo}>
        <Button onClick={addMiningGroup}>Добавить группу майнеров</Button>
        <div className={styles.columnLayout}>
          {minerGroups.map((minerGroup) => {
            return <div className={styles.column}>
              <div className={styles.columnLabel}>Цвет: <span style={{background: `light${minerGroup.color}`}}>{minerGroup.color}</span></div>
              <Button className={styles.keepTopRight} onClick={() => removeMiningGroup(minerGroup)}>Удалить</Button>

            </div>
          })}
        </div>
      </div>
    </div>
  </TabContainer>
}

export default TimeToCollect
