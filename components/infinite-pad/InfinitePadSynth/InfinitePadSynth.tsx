import React, { useState } from 'react'
import { ButtonPad } from '@components/infinite-pad'
import s from './InfinitePadSynth.module.css'
import ScreenDisplay from '../ScreenDisplay'
import PatchButton from '../PatchButton'
import Knob from '@components/infinite-pad/Knob'


const keys = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const InfinitePadSynth = () => {
  const [state, setState] = useState({
    currentKey: null
  })

  const [cutoff, setCutoff] = useState(127)
  const [volume, setVolume] = useState(127)

  return (
    <div className={s.synth}>
      <div className='grid grid-cols-4 lg:gap-8 gap-2 items-center'>
        <ScreenDisplay className='lg:col-span-2 col-span-4' />

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1'>
          <PatchButton dec={true} />
          Patch
          <PatchButton dec={false} />
        </div>

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1 pt-16 pb-12'>
          <Knob label='Cutoff' initialValue={cutoff} setValue={(v: number) => setCutoff(v)} />
          <Knob label='Volume' initialValue={volume} setValue={(v: number) => setVolume(v)} />
        </div>
        {keys.map(k => (
          <ButtonPad key={k} label={k} active={state?.currentKey == k} setState={setState} />
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
