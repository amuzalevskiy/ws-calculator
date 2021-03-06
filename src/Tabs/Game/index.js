import React, { useContext } from 'react'

import TabContainer from '../../Components/TabContainer'
import { Context } from '../../Components/DirectEditorsContext'
import _ from 'lodash'

import FieldSet from '../../Components/FieldSet'
import DirectSelect from '../../Components/DirectSelect'

import { defaultSettings } from '../../defaultSettings'

_.defaultsDeep(defaultSettings, {
  revision: 0,
  filename: ''
})

const supportedGameTypes = [
  {
    label: 'БЗ (майнинг)',
    value: 'ws-mining',
  },
]

const Extras = () => {
  const context = useContext(Context)
  const [gameType] = context.useState('~/gameType')
  const gameConfig = supportedGameTypes.find((y) => y.value === gameType)
  if (gameConfig && gameConfig.extra) {
    const C = gameConfig.extra
    return <C context={context} />
  }
  return null
}

const File = () => {
  return <TabContainer name="Field">
    <FieldSet label="Тип игры">
      <DirectSelect label={'Тип игры'} pointer={'~/gameType'} options={supportedGameTypes} />
      <Extras />
    </FieldSet>
  </TabContainer>
}

export default File
