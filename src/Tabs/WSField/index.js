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
    field: {
      sectors: {
        A1: {asteroids: 4, hydro: 350},
        A2: {asteroids: 4, hydro: 350},
        A3: {asteroids: 4, hydro: 350},
        A4: {asteroids: 4, hydro: 350},

        B1: {asteroids: 4, hydro: 350},
        B2: {asteroids: 4, hydro: 350},
        B3: {asteroids: 4, hydro: 350},
        B4: {asteroids: 4, hydro: 350},
        B5: {asteroids: 4, hydro: 350},

        C1: {asteroids: 4, hydro: 350},
        C2: {asteroids: 4, hydro: 350},
        C3: {asteroids: 4, hydro: 350},
        C4: {asteroids: 4, hydro: 350},
        C5: {asteroids: 4, hydro: 350},
        C6: {asteroids: 4, hydro: 350},

        D1: {asteroids: 4, hydro: 350},
        D2: {asteroids: 4, hydro: 350},
        D3: {asteroids: 4, hydro: 350},
        D4: {asteroids: 0, hydro: 0},
        D5: {asteroids: 4, hydro: 350},
        D6: {asteroids: 4, hydro: 350},
        D7: {asteroids: 4, hydro: 350},

        E1: {asteroids: 4, hydro: 350},
        E2: {asteroids: 4, hydro: 350},
        E3: {asteroids: 4, hydro: 350},
        E4: {asteroids: 4, hydro: 350},
        E5: {asteroids: 4, hydro: 350},
        E6: {asteroids: 4, hydro: 350},

        F1: {asteroids: 4, hydro: 350},
        F2: {asteroids: 4, hydro: 350},
        F3: {asteroids: 4, hydro: 350},
        F4: {asteroids: 4, hydro: 350},
        F5: {asteroids: 4, hydro: 350},

        G1: {asteroids: 4, hydro: 350},
        G2: {asteroids: 4, hydro: 350},
        G3: {asteroids: 4, hydro: 350},
        G4: {asteroids: 4, hydro: 350},
      }
    },
  },
})

const supportedCellTypes = [
  {
    label: '---',
  },
  {
    label: 'Наши ворота',
    value: 'our-gates',
  },
  {
    label: 'Ворота врага',
    value: 'their-gates',
  },
  {
    label: 'Единичка',
    value: 'L1',
  },
  {
    label: 'Пятерка',
    value: 'L5',
  },
  {
    label: 'Десятка',
    value: 'L10',
  }
]


const asteroidsCount = [
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  }
]

const hydroAmount = [
  {
    label: '160',
    value: 160,
  },
  {
    label: '300',
    value: 300,
  },
  {
    label: '350',
    value: 350,
  },
  {
    label: '400',
    value: 400,
  },
  {
    label: '3000',
    value: 3000,
  }
]

const Hexagon = ({place, sectors}) => {
  let sector = sectors[place]
  let hexColor = 'white'

  // eslint-disable-next-line default-case
  switch(sector.type) {
    case 'our-gates':
    case 'their-gates':
      hexColor = '#ffeeee'
      break;
    
    case 'L1':
      hexColor = '#f8fff8'
      break;

    case 'L5':
      hexColor = '#eeffee'
      break;

    case 'L10':
      hexColor = '#d0ffd0'
      break;
  }

  if (sector.hydro === 3000) {
    hexColor = '#eeeeff'
  }

  return <div className={`${styles.hexagonContainer} ${styles[place]}`} style={{
    '--hexagonColor': hexColor
  }}>
    <div className={styles.trapezoidUpOut}></div>
    <div className={styles.trapezoidDownOut}></div>
    <div className={styles.trapezoidUpIn}></div>
    <div className={styles.trapezoidDownIn}></div>
    <div className={styles.hexLabel}>{place}</div>
    {place !== 'D4' &&
    <WithNestedContext pointer={`/${place}`}>
      <div className={styles.cellType}>
        <DirectSelect label="Тип" pointer="/type" options={supportedCellTypes} />
      </div>
      <div className={styles.hydro}>
        <DirectSelect label="В" pointer="/hydro" options={hydroAmount} />
      </div>
      <div className={styles.asteroids}>
        <DirectSelect label="A" pointer="/asteroids" options={asteroidsCount} />
      </div>
    </WithNestedContext>}
  </div>
}

const ChestField = () => {
  const context = useContext(Context)
  const [sectors, setSectors] = context.useState('/ws/field/sectors')
  const [RTP, setRTP] = useState(0)

  return <TabContainer name="WSField">
    <WithNestedContext pointer="/ws/field/sectors">
      <div className={styles.mapContainer}>
        <div className={styles.lineA}>
          <Hexagon place="A1" sectors={sectors}/>
          <Hexagon place="A2" sectors={sectors}/>
          <Hexagon place="A3" sectors={sectors}/>
          <Hexagon place="A4" sectors={sectors}/>
        </div>
        <div className={styles.lineB}>
          <Hexagon place="B1" sectors={sectors}/>
          <Hexagon place="B2" sectors={sectors}/>
          <Hexagon place="B3" sectors={sectors}/>
          <Hexagon place="B4" sectors={sectors}/>
          <Hexagon place="B5" sectors={sectors}/>
        </div>
        <div className={styles.lineC}>
          <Hexagon place="C1" sectors={sectors}/>
          <Hexagon place="C2" sectors={sectors}/>
          <Hexagon place="C3" sectors={sectors}/>
          <Hexagon place="C4" sectors={sectors}/>
          <Hexagon place="C5" sectors={sectors}/>
          <Hexagon place="C6" sectors={sectors}/>
        </div>
        <div className={styles.lineD}>
          <Hexagon place="D1" sectors={sectors}/>
          <Hexagon place="D2" sectors={sectors}/>
          <Hexagon place="D3" sectors={sectors}/>
          <Hexagon place="D4" sectors={sectors}/>
          <Hexagon place="D5" sectors={sectors}/>
          <Hexagon place="D6" sectors={sectors}/>
          <Hexagon place="D7" sectors={sectors}/>
        </div>
        <div className={styles.lineE}>
          <Hexagon place="E1" sectors={sectors}/>
          <Hexagon place="E2" sectors={sectors}/>
          <Hexagon place="E3" sectors={sectors}/>
          <Hexagon place="E4" sectors={sectors}/>
          <Hexagon place="E5" sectors={sectors}/>
          <Hexagon place="E6" sectors={sectors}/>
        </div>
        <div className={styles.lineF}>
          <Hexagon place="F1" sectors={sectors}/>
          <Hexagon place="F2" sectors={sectors}/>
          <Hexagon place="F3" sectors={sectors}/>
          <Hexagon place="F4" sectors={sectors}/>
          <Hexagon place="F5" sectors={sectors}/>
        </div>
        <div className={styles.lineG}>
          <Hexagon place="G1" sectors={sectors}/>
          <Hexagon place="G2" sectors={sectors}/>
          <Hexagon place="G3" sectors={sectors}/>
          <Hexagon place="G4" sectors={sectors}/>
        </div>
      </div>
    </WithNestedContext>
  </TabContainer>
}

export default ChestField
