// @flow
import * as React from 'react'

import s from './ButtonPad.module.css'


export const ButtonPad = ({ label = 'A', active = false, ...props }) => {
  return (<div className="justify-self-center">
      <label className={s.label}>{label}</label>
      <button className={[s.button, s['button-active']].join(' ')}
              onClick={() => props.onToggle({ key: label })}>
        <span className={s.led + (active ? ' ' + s['led-active'] : '')}></span>
      </button>
    </div>
  )
}

export default ButtonPad
