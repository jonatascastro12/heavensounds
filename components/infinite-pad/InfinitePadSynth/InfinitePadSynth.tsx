import React, { useEffect, useState } from 'react'
import { ButtonPad } from '@components/infinite-pad'
import s from './InfinitePadSynth.module.css'
import ScreenDisplay from '../ScreenDisplay'
import PatchButton from '../PatchButton'
import Knob from '@components/infinite-pad/Knob'
import { Howl, Howler } from 'howler'

const keys = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const patches = [
  'Abaddon Choir',
  'Lunaris 1'
]

const translateNote = (code: string) => {
  return code.replace('#', 'sharp')
}

const generateSoundsForPatch = (patchName: string) =>
  Object.fromEntries(keys.map(k => [k, new Howl({
    src: [`/sounds/Infinite Pad - ${patchName} - ${translateNote(k)}.mp3`],
    loop: true,
    sprite: {
      main: [0, 10000, true],
      main2: [1000, 9000, true]
    }
  })]))


const InfinitePadSynth = () => {
  const [state, setState] = useState<{ currentKey: string | null, prevKey: string | null, isPlaying: boolean }>({
    currentKey: null,
    prevKey: null,
    isPlaying: false
  })


  const [sounds, setSounds] = useState(generateSoundsForPatch('Abaddon Choir'))

  const [cutoff, setCutoff] = useState(127)
  const [volume, setVolume] = useState(127)

  const onButtonPadToggle = ({ key }: { key: string }) => {
    setState(prev => {
      if (prev.isPlaying && prev.currentKey) {
        let playingSound: Howl = sounds[prev.currentKey]
        playingSound.fade(1, 0, 5000)
        setTimeout(() => {
          playingSound.stop()
        }, 5000)
      }
      return { ...prev, prevKey: prev.currentKey, currentKey: key, isPlaying: true }
    })
  }

  useEffect(() => {
    if (state.isPlaying && state.currentKey) {
      state.currentKey && sounds[state.currentKey].fade(0, 1, 1000)
      state.currentKey && sounds[state.currentKey].play('main')
    }
  }, [state.currentKey, state.isPlaying])

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
          <ButtonPad key={k} label={k} active={state?.currentKey == k} onToggle={onButtonPadToggle} />
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
