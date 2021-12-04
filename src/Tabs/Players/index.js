import React, { useContext, useState, useCallback, useEffect } from 'react'
import TabContainer from '../../Components/TabContainer'
import DirectInput from '../../Components/DirectInput'
import FieldSet from '../../Components/FieldSet'
import { Tooltip, Button, FormGroup } from '@material-ui/core'
import { Context, WithNestedContext } from '../../Components/DirectEditorsContext'
import _ from 'lodash'

import { defaultSettings } from '../../defaultSettings'

import styles from './index.module.css'
import DirectSelect from '../../Components/DirectSelect'


_.defaultsDeep(defaultSettings, {
  ws: {
    players: [],
  },
})

const Players = () => {
  const context = useContext(Context)
  const [players, setPlayers] = context.useState('/ws/players')
  const addPlayer = useCallback(() => {
    setPlayers([...players, {}])
  }, [setPlayers, players])
  const removePlayer = useCallback((playerToDelete) => {
    setPlayers([...players].filter(x => x!==playerToDelete))
  }, [setPlayers, players])

  return <TabContainer name="Field">
    <table>
      <tr>
        <th><span>Имя</span></th>

        <th className={styles.verticalLabels} style={{width: 50}}><span>Уровень майнера</span></th>
        <th className={styles.verticalLabels} style={{width: 75}}><span>Объем</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Удаленная добыча</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Рост добычи</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Профсоюз</span></th>

        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Обогащение</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Генезис</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#e1c5ed'}}><span>Кризис</span></th>

        <th className={styles.verticalLabels} style={{width: 50, background: '#edddc5'}}><span>Грузоподъемность</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#edddc5'}}><span>Вручение</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#edddc5'}}><span>Экспедиция</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#edddc5'}}><span>Реликтовый дрон</span></th>

        <th className={styles.verticalLabels} style={{width: 50, background: '#bfe3bf'}}><span>Искажение времени</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#bfe3bf'}}><span>Телепорт</span></th>
        <th className={styles.verticalLabels} style={{width: 50, background: '#bfe3bf'}}><span>Скачок</span></th>
        <th></th>
      </tr>
      {players
      .map((player, index) => {
        return <WithNestedContext pointer={"/ws/players" + index}>
          <tr>
            <td><DirectInput pointer="/name" type="string"/></td>
            <td><DirectInput pointer="/minerLevel" /></td>
            <td><DirectInput pointer="/capacity" /></td>

            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/remoteMining" /></td>
            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/miningBoost" /></td>
            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/minerUnity" /></td>
            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/enrich" /></td>
            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/genesic" /></td>
            <td style={{width: 50, background: '#e1c5ed'}}><DirectInput pointer="/crunch" /></td>
            
            <td style={{width: 50, background: '#edddc5'}}><DirectInput pointer="/relicsInTransport" /></td>
            <td style={{width: 50, background: '#edddc5'}}><DirectInput pointer="/entrust" /></td>
            <td style={{width: 50, background: '#edddc5'}}><DirectInput pointer="/dispatch" /></td>
            <td style={{width: 50, background: '#edddc5'}}><DirectInput pointer="/relicDrone" /></td>


            <td style={{width: 50, background: '#bfe3bf'}}><DirectInput pointer="/timeWarp" /></td>
            <td style={{width: 50, background: '#bfe3bf'}}><DirectInput pointer="/teleport" /></td>
            <td style={{width: 50, background: '#bfe3bf'}}><DirectInput pointer="/leap" /></td>
            <td><Button onClick={() => {
              removePlayer(player)
            }}>Удалить</Button></td>
          </tr>
        </WithNestedContext>
      })}
    </table>
    
    <Button onClick={addPlayer}>
      Добавить игрока
    </Button>
  </TabContainer>
}

export default Players
