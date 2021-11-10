// @flow
import * as React from 'react'

import s from './ButtonPad.module.css'


export const ButtonPad = ({label='A', active=false}) => {
  return (<div>
      <label className={s.label}>{label}</label>
      <button className={s.button + ' ' + s['button-active']} >
        <span className={s.led + (active? ' '+s.ledActive:'')}></span>
      </button>
    </div>
  )
}

export default ButtonPad
