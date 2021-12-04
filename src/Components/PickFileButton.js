import React, { useState } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Button } from '@material-ui/core'

import styles from './PickFileButton.module.css'
const PickFileButton = ({ onPick, accept }) => {
  const [counter, setCounter] = useState(0)
  return <Button className={styles.button} startIcon={<CloudUploadIcon />}>
      Load
      <input key={counter} type="file" accept={accept} className={styles.input} onChange={(e) => {
        setCounter(counter + 1)
        onPick(e)
      }} />
    </Button>
}

export default PickFileButton
