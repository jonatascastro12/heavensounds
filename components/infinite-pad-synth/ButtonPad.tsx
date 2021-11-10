// @flow
import * as React from 'react'

import s from './ButtonPad.module.css'


export const ButtonPad = () => {
  return (<div>
      <label className={s.label}>A</label>
      <button className={s.button + ' ' + s['button-active']} />
    </div>
  )
}

export default ButtonPad
