import React, { useState } from 'react'
import { ButtonPad } from '@components/infinite-pad'
import s from './InfinitePadSynth.module.css'
import ScreenDisplay from '../ScreenDisplay'


const keys = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const InfinitePadSynth = () => {
  const [state, setState] = useState({
    currentKey: null
  });

  return (
    <div className={s.synth}>
      <div className="grid grid-cols-4 gap-8">
        <ScreenDisplay className="col-span-4" />
        {keys.map(k => (
        <ButtonPad key={k} label={k} active={state?.currentKey == k} setState={setState}/>
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
