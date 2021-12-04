import React from 'react'
import { Tooltip } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import styles from './Info.module.css'
const Info = ({ content, children }) => {
  return <Tooltip title={children}>
    <HelpOutlineIcon className={styles.icon}/>
  </Tooltip>
}

export default Info
