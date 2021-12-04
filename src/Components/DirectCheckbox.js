import React, { useContext, useCallback, useMemo } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

import { Context } from './DirectEditorsContext'

const DirectCheckbox = ({ label, pointer, disabled }) => {
  const context = useContext(Context)
  const [value, setValue] = context.useState(pointer)

  const handleChange = useCallback(event => {
    const boolValue = event.target.checked
    setValue(boolValue)
  }, [setValue])

  const control = useMemo(() => <Checkbox disabled={disabled} color="default" checked={!!value} onChange={handleChange} />, [disabled, handleChange, value])
  return <FormControlLabel
    control={control}
    label={label}
  />
}

export default DirectCheckbox
