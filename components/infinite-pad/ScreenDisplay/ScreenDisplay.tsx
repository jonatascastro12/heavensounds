// @flow
import * as React from 'react'

import s from './ScreenDisplay.module.css'

export const ScreenDisplay = ({ displayName = 'Infinite Pad', className = '' }) => {
  return (
    <div className={[s.container, className].join(' ')}>
      <div className={[s.screen].join(' ')}>
        <span>{displayName}</span>
      </div>
    </div>
  )
}

export default ScreenDisplay
