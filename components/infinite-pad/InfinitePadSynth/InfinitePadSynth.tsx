import React, { useState } from 'react'
import { ButtonPad } from '@components/infinite-pad'
import s from './InfinitePadSynth.module.css'
import ScreenDisplay from '../ScreenDisplay'
import PatchButton from '../PatchButton'


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
        <ScreenDisplay className="col-span-2" />
        <div className="flex items-center justify-around">
          <PatchButton dec={true}/>
          Patch
          <PatchButton dec={false}/>
        </div>

        <div className="">
          //knobs
        </div>
        {keys.map(k => (
        <ButtonPad key={k} label={k} active={state?.currentKey == k} setState={setState}/>
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
