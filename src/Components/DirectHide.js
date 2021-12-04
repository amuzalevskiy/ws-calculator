import React, { useContext } from 'react'
import { Context } from './DirectEditorsContext'

const DirectHide = ({ children, pointer }) => {
  const context = useContext(Context)
  
  const [value] = context.useState(pointer)
  if (!value) {
    return null
  }

  return <>
    {typeof children === 'function' ? children() : children}
  </>
}

export default DirectHide
