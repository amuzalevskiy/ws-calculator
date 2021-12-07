import React from 'react'
import { Button as ButtonImpl } from '@material-ui/core'

import styles from './Button.module.css'

const Button = (props) => {
  return <ButtonImpl
    className={`${styles.main} ${props.className}`}
    variant="outlined"
    color="primary"
    disableElevation
    {...props}
  />
}

export default Button
