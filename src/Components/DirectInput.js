import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

import { Context } from './DirectEditorsContext'

const parsers = {
  string: {
    isValid: () => true,
    parse: value => value
  },
  number: {
    isValid: value => !isNaN(Number(value)) || value === undefined,
    parse: value => {
      if (value === undefined || value === '') {
        return undefined
      }
      return parseFloat(value)
    }
  }
}

const DirectInput = ({ label, disabled, pointer, type = 'number', multiplier = 1, helperText, units, defaultValue = '', inputProps = {} }) => {
  const context = useContext(Context)
  const parser = parsers[type] || parsers.text
  const [contextValue, setContextValue] = context.useState(pointer)
  const [isValid, setIsValid] = useState(parser.isValid(contextValue))
  const [value, setValue] = useState(
    type === 'number' 
    ? (!isNaN(contextValue) ? contextValue * multiplier : undefined)
    : contextValue
  )

  useEffect(() => {
    if (!isNaN(contextValue) && contextValue * multiplier !== parseFloat(value)) {
      setValue(contextValue * multiplier)
    }
  }, [contextValue, value, multiplier])

  const _inputProps = useMemo(() => ({
    ...inputProps,
    endAdornment: units ? <InputAdornment position="start">{units}</InputAdornment> : undefined,
  }), [units, inputProps])

  const handleChange = useCallback(event => {
    const parser = parsers[type]
    const stringValue = event.target.value
    setValue(stringValue)
    if (parser.isValid(stringValue)) {
      setIsValid(true)
      if (type === 'number') {
        const parsed = parser.parse(stringValue)
        setContextValue(parsed === undefined ? undefined : parsed / multiplier)
      } else {
        setContextValue(parser.parse(stringValue))
      }
    } else {
      setIsValid(false)
    }
  }, [setContextValue, type, multiplier])

  return <TextField
    size="small"
    variant="outlined"
    disabled={disabled}
    InputProps={_inputProps}
    helperText={helperText}
    error={!isValid}
    label={label}
    value={value === undefined ? defaultValue : value}
    onChange={handleChange}
  />
}

export default DirectInput
