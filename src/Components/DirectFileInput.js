import React, { useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { TextField, FormGroup, Button, InputAdornment } from '@material-ui/core'
import { getFileContent, removeFile, addFile } from '../lib/fileManager'
import PickFileButton from './PickFileButton'
import { Context } from './DirectEditorsContext'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import styles from './DirectFileInput.module.css'
import _ from 'lodash'

import { defaultSettings } from '../defaultSettings'

_.defaultsDeep(defaultSettings, {
  files: {},
})

const DirectFileInput = ({ label, pointer, helperText, type }) => {
  const context = useContext(Context)
  const [value, setValue] = context.useState(pointer)
  const isBase64 = value && value.startsWith('data:')
  const [previewUrl, setPreviewUrl] = useState(null)
  const same = useRef({
    timeout: NaN,
    enabled: true,
  }).current

  const updatePreview = useCallback(() => {
    if (isBase64) {
      setPreviewUrl(getFileContent(context, value))
    } else {
      setPreviewUrl(value)
    }
  }, [context, isBase64, value])

  useEffect(() => {
    if (same.enabled) {
      updatePreview()
    }
    same.enabled = false
    clearTimeout(same.timeout)
    same.timeout = setTimeout(() => {
      same.enabled = true
      updatePreview()
    }, 700)
  }, [same, same.enabled, same.timeout, updatePreview])

  const handleChange = useCallback(event => {
    const stringValue = event.target.value
    setValue(stringValue)
  }, [setValue])

  const handleDelete = useCallback(() => {
    removeFile(context, value) 
    setValue('')
  }, [context, setValue, value])

  const handlePick = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select image')
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      if (isBase64) {
        removeFile(context, value)
      }

      setValue(await addFile(context, e.target.result))
    }

    reader.readAsDataURL(file)
  }, [isBase64, setValue, context, value])

  const inputProps = useMemo(() => ({
    endAdornment: previewUrl ? <InputAdornment><img alt="preview" className={styles.preview} src={previewUrl} /></InputAdornment> : null
  }), [previewUrl])

  return <FormGroup row={true}>
    <TextField
      margin="dense"
      variant="outlined"
      helperText={helperText}
      label={label}
      value={value || ''}
      disabled={!!isBase64}
      onChange={handleChange}
      InputProps={inputProps}
    />
    {isBase64 &&
    <Button onClick={handleDelete} startIcon={<DeleteSharpIcon />}>
      Clear
    </Button>}
    <PickFileButton accept="image/*" onPick={handlePick} />
  </FormGroup>
}

export default DirectFileInput
