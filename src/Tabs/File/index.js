import React, { useContext, useState, useEffect, useCallback } from 'react'

import TabContainer from '../../Components/TabContainer'
import Button from '../../Components/Button'
import { Context } from '../../Components/DirectEditorsContext'
import { FormGroup, TextField, FormControlLabel } from '@material-ui/core'
import _ from 'lodash'
import moment from 'moment'

import FieldSet from '../../Components/FieldSet'

import { defaultSettings } from '../../defaultSettings'
import Axios from 'axios'
import { backendURL } from '../../appSettings'

import styles from './index.module.css'

_.defaultsDeep(defaultSettings, {
  revision: 0,
  filename: '',
  gameType: 'absent',
})

const File = () => {
  const context = useContext(Context)

  const [files, setFiles] = useState([])
  const [changeTracker, setChangeTracker] = useState(0)
  const [filename, setFilename] = useState('')

  const reload = useCallback(() => {
    setChangeTracker(changeTracker + 1)
  }, [changeTracker])

  useEffect(() => {
    Axios.get(backendURL + '/list').then(({ data: files }) => {
      setFiles(files)
    })
  }, [changeTracker])

  const addFile = useCallback(() => {
    if (!/^[a-z0-9_-]{5,}$/.test(filename)) {
      alert('Filename must contain a-z, 0-9, "_", "-" symbols and length should be at least at least 5')
      return
    }
    // support server pruning
    // whole object replace fails on server side
    // for unknown reason
    context.modify('dontSendUpdateToServer', () => ({}))
    context.modify('instant', (draft) => {
      const settings = {
        ...defaultSettings,
        gameType: 'unknown',
      }
      Object.assign(draft, settings)
      draft.filename = filename
    })
    setTimeout(() => {
      reload()
    }, 700)
  }, [context, filename, reload])

  const [archivedFilter, setArchivedFilter] = useState(false)

  return <TabContainer name="Field">
    <FormGroup row={true}>
      {!archivedFilter &&
      <Button onClick={() => setArchivedFilter(true)}>Показать архив</Button>}
      {archivedFilter &&
      <Button onClick={() => setArchivedFilter(false)}>Скрыть архив</Button>}
    </FormGroup>
    {files
    .filter(({ name }) => {
      return archivedFilter
        ? name[0] === '_'
        : name[0] !== '_'
    })
    .map(({ name: filename, mtime }) => {
      const [basename] = filename.split('.')
      return <FormGroup className={basename === context.value.filename ? styles.selected : undefined} key={basename} row={true}>
        <FormControlLabel
          className={styles.filenameLabel}
          label={basename}
          labelPlacement="start"
          control={<div/>}/>
        <FormControlLabel
          className={styles.mtimeLabel}
          label={moment(mtime).format('MMM D YY, HH:mm')}
          labelPlacement="start"
          control={<div/>}/>
        <Button
          onClick={() => {
            // trigger reload
            localStorage.setItem('filename', basename)
            context.modify('dontSendUpdateToServer', () => ({
              filename: basename + '*'
            }))
          }}
        >Редактировать</Button>
        {/* Doesn't work <Button
          onClick={() => {
            if (window.confirm('All change history will be lost. Are you sure?')) {
              Axios.get(backendURL + '/file/' + basename + '/prune')
            }
          }}
        >Сжать</Button> */}
        <Button
          onClick={async () => {
            const name = window.prompt('Please enter new filename')
            const resp = await Axios.post(backendURL + '/file/' + basename + '/clone', {
              name,
            })
            if (resp.data.error) {
              alert(resp.data.error)
            }
            reload()
          }}
        >Клонировать</Button>
        <Button
          onClick={() => {
            if (window.confirm('Include design?')) {
              window.location.href = backendURL + '/file/' + basename + '/export'
            } else {
              window.location.href = backendURL + '/file/' + basename + '/export?excludeDesign=true'
            }
          }}
        >Экспорт</Button>
        {basename[0] !== '_' &&
        <Button
          onClick={async () => {
            const resp = await Axios.post(backendURL + '/file/' + basename + '/archive')
            if (resp.data.error) {
              alert(resp.data.error)
            }
            reload()
          }}
        >В архив</Button>}
        {basename[0] === '_' &&
        <Button
          onClick={async () => {
            const resp = await Axios.post(backendURL + '/file/' + basename + '/unarchive')
            if (resp.data.error) {
              alert(resp.data.error)
            }
            reload()
          }}
        >Из архива</Button>}
      </FormGroup>
    })}
    <FieldSet label="Добавить файл">
      <FormGroup row={true}>
        <TextField
          size="small"
          variant="outlined"
          label="Имя нового файла"
          value={filename === undefined ? '' : filename}
          onChange={event => {
            const stringValue = event.target.value
            setFilename(stringValue)
          }}
        />
        <Button onClick={addFile}>
          Добавить новый файл
        </Button>
      </FormGroup>
    </FieldSet>
  </TabContainer>
}

export default File
