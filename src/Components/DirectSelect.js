import React, { useContext, useCallback } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import styles from './DirectSelect.module.css'
import { Context } from './DirectEditorsContext'

const DirectSelect = ({ label, pointer, options, onBeforeSet, onChange, className }) => {
  const context = useContext(Context)
  const [value, setValue] = context.useState(pointer)

  const handleChange = useCallback(async event => {
    let value = event.target.value
    if (value === '') {
      value = undefined
    }
    if (typeof onBeforeSet === 'function') {
      await onBeforeSet(value)
    }
    setValue(value)
    if (typeof onChange === 'function') {
      onChange()
    }
  }, [onBeforeSet, onChange, setValue])

  return <FormControl variant="outlined" margin="dense" className={className}>
    {label && <InputLabel className={styles.selectLabel}>{label}</InputLabel>}
    <Select
      margin="dense"
      value={value || ''}
      onChange={handleChange}
    >
      {options.map(({ label, value }, i) => {
        return <MenuItem key={i} value={value}>{label}</MenuItem>
      })}
    </Select>
  </FormControl>
}

export default DirectSelect
