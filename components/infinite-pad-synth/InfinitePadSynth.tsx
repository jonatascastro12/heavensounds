import React from 'react'
import { ButtonPad } from '@components/infinite-pad-synth/ButtonPad'
import s from './InfinitePadSynth.module.css'


const keys = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const InfinitePadSynth = () => {
  return (
    <div>
      <div className={s.grid}>
        {keys.map(k => (
        <ButtonPad label={k} active={true}/>
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
