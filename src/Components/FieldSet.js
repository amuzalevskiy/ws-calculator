import React, { useContext } from 'react'
import styles from './FieldSet.module.css'
import { Context, WithNestedContext } from './DirectEditorsContext'
import DirectCheckbox from './DirectCheckbox'
import { FormGroup } from '@material-ui/core'
import _ from 'lodash'

import { defaultSettings } from '../defaultSettings'

_.defaultsDeep(defaultSettings, {
  editor: {
    collapse: {},
  },
})

const FieldSet = ({ label, pointer, checkboxPointer, children, designLess }) => {
  const context = useContext(Context)
  const collapseBoolPointer = '~/editor/collapse' + context.basepath + (checkboxPointer || pointer) + '_$'
  const [collapsed] = context.useState(collapseBoolPointer)
  const showChildren = ((pointer || checkboxPointer) && !designLess) ? !collapsed : true
  const main = <div className={styles.container + (designLess ? ' ' + styles.designLess : '') + (!showChildren ? ' ' + styles.collapsed : '')}>
    {label && <div className={styles.title}>
      {((pointer || checkboxPointer) && !designLess)
        ? <DirectCheckbox label={label} pointer={collapseBoolPointer} />
        : <div className={styles.titleTextOnly}>{label}</div>}
    </div>}
    {showChildren 
      ? <FormGroup>{children}</FormGroup>
      : null}
  </div>
  if (pointer) {
    return <WithNestedContext pointer={pointer}>
      {main}
    </WithNestedContext>
  } else {
    return main
  }
}

export default FieldSet
