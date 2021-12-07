import React, { useContext } from 'react'
import TabContainer from '../../Components/TabContainer'
import { Context } from '../../Components/DirectEditorsContext'
import _ from 'lodash'

import { defaultSettings } from '../../defaultSettings'

import styles from './index.module.css'
import { getMiningBoost, getMiningSpeed, getRemoteMining } from '../../Math/game'


_.defaultsDeep(defaultSettings, {
  ws: {
    players: [],
  },
})

const PlayerStats = () => {
  const context = useContext(Context)
  const [players] = context.useState('/ws/players')

  return <TabContainer name="Field">
    <table>
      <tr>
        <th><span>Имя</span></th>
        <th className={styles.verticalLabels} style={{width: 50}}><span>Уровень майнера</span></th>
        <th className={styles.verticalLabels} style={{width: 75}}><span>Объем</span></th>
        <th className={styles.verticalLabels} style={{width: 50}}><span>Скорость добычи</span></th>
        <th className={styles.verticalLabels} style={{width: 50}}><span>Буст</span></th>
        <th className={styles.verticalLabels} style={{width: 50}}><span>Удаленная добыча</span></th>
      </tr>
      {players
      .map((player, index) => {
        return <tr>
          <td>{player.name}</td>
          <td>{player.minerLevel}</td>
          <td>{player.capacity}</td>
          <td>{getMiningSpeed(player.minerLevel)}</td>
          <td>x{getMiningBoost(player.miningBoost)}</td>
          <td>x{getRemoteMining(player.remoteMining)}</td>
        </tr>
      })}
    </table>
  </TabContainer>
}

export default PlayerStats
