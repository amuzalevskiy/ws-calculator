import React from 'react'

import styles from './LinePreview.module.css'

const repeat = (numbers) => {
  const result = []
  for (var i = 0; i < numbers; i++) {
    result.push(i)
  }
  return result
}

const LinePreview = ({ columns, value, onChange }) => {
  const handleClick = (position) => {
    const intermediateValue = value ? [...value] : []
    intermediateValue[position.column] = position.row
    if (onChange) {
      onChange(intermediateValue)
    }
  }
  return <div className={styles.minHeight}>
    <div className={styles.container}>
      {columns.map((column, columnIndex) => {
        const rows = repeat(column.cells)
        return <div className={styles.column} key={columnIndex} style={{
          marginTop: column.shift / 10
        }}>
          {rows.map(row => {
            const selected = value[columnIndex] === row
            return <div key={row} onClick={() => {
              handleClick({
                column: columnIndex,
                row
              })
            }} className={styles.row + (selected ? ' ' + styles.selected : '')}></div>
          })}
        </div>
      })}
    </div>
  </div>
}

export default LinePreview
