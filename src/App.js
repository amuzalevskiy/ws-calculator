import { Tabs, Tab, AppBar, Backdrop, CircularProgress, Paper, Toolbar, Typography } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import _ from 'lodash'

import './lib/StateManager'

import SportsEsportsIcon from '@material-ui/icons/SportsEsports'

import DirectEditorsContext, { Context } from './Components/DirectEditorsContext'

import File from './Tabs/File'

import WSField from './Tabs/WSField'
import Game from './Tabs/Game'

import styles from './App.module.css'
import Axios from 'axios'
import { backendURL } from './appSettings'
import produce, { applyPatches } from 'immer'
import { defaultSettings } from './defaultSettings'
import Players from './Tabs/Players'

function App() {
  return (
    <DirectEditorsContext>
      <AppTabs />
    </DirectEditorsContext>
  )
}

export default App

const tabsByFileType = {
  'absent': ['File'],
  'unknown': ['File', 'Game'],
  'ws-mining': ['File', 'Game', 'Players', 'WSField'],
}

const tabsConfig = {
  File: {
    name: 'File',
    render: File,
  },

  Game: {
    name: 'Game',
    render: Game,
  },

  WSField: {
    name: 'Field',
    render: WSField,
  },

  Players: {
    name: 'Players',
    render: Players,
  }
}

function AppTabs() {
  const context = useContext(Context)
  const [contextFilename] = context.useState('/filename')
  const isLoaded = contextFilename !== ''
  const [selectedTab, setSelectedTab] = useState(parseInt(localStorage.getItem('openedTab')) || 0)
  const [showBackdrop, setShowBackdrop] = useState(true)
  const handleChange = (event, newValue) => {
    localStorage.setItem('openedTab', newValue)
    setSelectedTab(newValue)
  }

  let [gameType] = context.useState('~/gameType')
  if (!gameType) {
    gameType = 'absent'
  }
  if (!tabsByFileType[gameType]) {
    gameType = 'unknown'
    console.warn('Unknown game type')
  }
  const visibleTabs = tabsByFileType[gameType].map(x => tabsConfig[x])

  useEffect(() => {
    // load behavior
    const filename = localStorage.getItem('filename')
    if (filename !== contextFilename) {
      setShowBackdrop(true)
      Axios.get(backendURL + '/file/' + filename, { transformResponse: res => res }).then(({ data: content }) => {
        const patches = content.split('\n')
        let currentValue = {}
        let errorCount = 0
        // skip empty line at the start of file
        for (let i = 1; i < patches.length; i++) {
          const patch = JSON.parse(patches[i])
          switch (patch.action) {
            case 'modify':
              try {
                currentValue = applyPatches(currentValue, patch.payload)
              } catch (e) {
                errorCount++
                console.log(e)
              }
              break
            default:
              throw new Error('Unknown operation')
          }
        }

        if (errorCount > 0) {
          alert(`File is recovered. Please doublecheck everything. Unable to apply ${errorCount} patches`)
        }

        if (currentValue.filename !== filename) {
          // it is clone
          currentValue = produce(currentValue, (value) => {
            value.filename = filename
          })
        }

        // apply defaults
        const valueWithDefaults = produce(currentValue, (value) => {
          _.defaultsDeep(value, defaultSettings)
        })

        if (valueWithDefaults === currentValue) {
          context.modify('dontSendUpdateToServer', () => currentValue)
        } else {
          context.modify(() => valueWithDefaults)
        }
        setShowBackdrop(false)
      }, () => {
        context.modify('dontSendUpdateToServer', () => defaultSettings)
        setShowBackdrop(false)
      })
    }
  }, [context, contextFilename])

  return <>
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <SportsEsportsIcon />&nbsp;&nbsp;
        <Typography variant="h6">{gameType} - {context.value.filename}</Typography>
      </Toolbar>
    </AppBar>
    <div className={styles.container}>
      <div className={styles.menu}>
        <Tabs orientation="vertical" className={styles.tabs} value={isLoaded ? selectedTab : 0} onChange={handleChange} aria-label="simple tabs example">
          {visibleTabs.map(({ name }) => {
            return <Tab key={name} label={name} />
          })}
        </Tabs>        
      </div>
      <div className={styles.content}>
        <Paper elevation={3}>
        {
          visibleTabs[selectedTab] && typeof visibleTabs[selectedTab].render === 'function'
          ? React.createElement(visibleTabs[selectedTab].render, {
            key: visibleTabs[selectedTab].label,
          })
          : <File />
        }
        </Paper>
      </div>
    </div>
    {showBackdrop && <Backdrop open={true} className={styles.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>}
  </>
}
