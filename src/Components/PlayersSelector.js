import React, { useCallback, useContext, useEffect } from 'react'
import { Context } from './DirectEditorsContext'
import DirectSelect from './DirectSelect'
import styles from './PlayersSelector.module.css'

const PlayersSelector = ({ pointer, children }) => {

  const context = useContext(Context)
  const [players, setPlayers] = context.useState(pointer)
  const [availablePlayers] = context.useState('~/ws/players')

  const addPlayer = useCallback(() => {
    setPlayers([...players, ''])
  }, [players, setPlayers])
  const removePlayer = useCallback((playerName) => {
    setPlayers(players.filter(x => x !== playerName))
  }, [players, setPlayers])

  return <div className={styles.container}>
    {players.map((playerName, i) => {
      const playerOptions = [{name: playerName}, ...availablePlayers.filter(v => players.indexOf(v.name) === -1)].map(v => {
        return  {
          label: v.name,
          value: v.name
        }
      })
      return <div>
        <DirectSelect pointer={`${pointer}/${i}`} options={playerOptions} />
        <button className={styles.minusButton} onClick={() => removePlayer(playerName)}>-</button>
      </div>
    })}
    <button onClick={addPlayer}>+</button>
  </div>
}

export default PlayersSelector
