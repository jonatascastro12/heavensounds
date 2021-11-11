// @flow
import * as React from 'react'
import PatchButton from '../PatchButton'

import s from './ScreenDisplay.module.css'

export const ScreenDisplay = ({ patch = 'Infinite Pad', className = '' }) => {
  return (
    <div className={[s.container, className].join(' ')}>
      <div className={[s.screen].join(' ')}>
        <span>{patch}</span>
      </div>
    </div>
  )
}

export default ScreenDisplay
