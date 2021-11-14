import React, { useEffect, useRef, useState } from 'react'
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
const crossFadeTime = 5000
const spriteDuration = 10000

const generateSoundsForPatch = (patchName: string) => Object.fromEntries(keys.map(k => [k, new Howl({
    src: [`/sounds/Infinite Pad - ${patchName} - ${translateNote(k)}.mp3`],
    sprite: {
      main: [3000, spriteDuration]
    }
  })]))

const initialSounds = generateSoundsForPatch('Abaddon Choir')

let lowpass:any;

const InfinitePadSynth = () => {
  const [state, setState] = useState<{
    currentKey: string | null,
    currentSoundId: number | null,
    loopTimeoutId: number | null,
    isPlaying: boolean
  }>({
    currentKey: null,
    currentSoundId: null,
    loopTimeoutId: null,
    isPlaying: false
  })


  const [sounds, setSounds] = useState(initialSounds)
  const prevLoopKey = useRef<string>()

  const [cutoff, setCutoff] = useState(245)
  const [volume, setVolume] = useState(127)


  const onButtonPadToggle = ({ key }: { key: string }) => {
    setState(prev => {
      if (prev.currentKey && prev.currentSoundId) {
        // @ts-ignore
        clearTimeout(state.loopTimeoutId)
        let playingSound: Howl = sounds[prev.currentKey]
        const soundIdToStop = prev.currentSoundId;
        soundIdToStop && playingSound.fade(playingSound.volume(soundIdToStop) as number, 0, crossFadeTime, soundIdToStop)
        setTimeout(() => {
          soundIdToStop && playingSound.stop(soundIdToStop)
        }, crossFadeTime)
      }
      return { ...prev, currentKey: key }
    })
  }

  const playLoop = (newId: number | null = null) => {
    if (!state.currentKey) return
    prevLoopKey.current = state.currentKey
    const sound: Howl = sounds[state.currentKey]

    if (newId) {
      sound.fade(1, 0, crossFadeTime, newId)
      setTimeout(() => {
        sound.stop(newId)
      }, crossFadeTime)
    }
    const id = sound.play('main')
    sound.fade(0, 1, crossFadeTime, id)
    setState(prev => ({ ...prev, currentSoundId: id }))

    return setTimeout(() => {
      if (prevLoopKey.current === state.currentKey) {
        playLoop(id)
      }
    }, spriteDuration - crossFadeTime)

  }
  useEffect(()=>{
    lowpass = Howler.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(245, Howler.ctx.currentTime);
    lowpass.gain.setValueAtTime(5, Howler.ctx.currentTime);
    Howler.masterGain.disconnect();
    Howler.masterGain.connect(lowpass);
    lowpass.connect(Howler.ctx.destination);
  },[])

  useEffect(() => {
    if (state.currentKey) {
      const loopTimeoutId = playLoop()
      // @ts-ignore
      setState(prev => ({ ...prev, loopTimeoutId }))
    }
  }, [state.currentKey])

  useEffect(() => {
    if (volume) {
      const howlValue = volume/127;
      Howler.volume(howlValue)
    }
  }, [volume])

  useEffect(() => {
    if (cutoff) {
      lowpass.frequency.setValueAtTime(cutoff, Howler.ctx.currentTime);
    }
  }, [cutoff])

  return (
    <div className={s.synth}>
      <div className='grid grid-cols-4 lg:gap-5 gap-2 items-center'>
        <ScreenDisplay className='lg:col-span-2 col-span-4' />

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1'>
          <PatchButton dec={true} />
          Patch
          <PatchButton dec={false} />
        </div>

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1 pt-10 pb-8'>
          <Knob label='Cutoff' initialValue={cutoff} unit={'Hz'} minValue={60} maxValue={1000} onChangeValue={(v: number) => setCutoff(v)} />
          <Knob label='Volume' initialValue={volume} onChangeValue={(v: number) => setVolume(v)} />
        </div>
        {keys.map(k => (
          <ButtonPad key={k} label={k} active={state?.currentKey == k} onToggle={onButtonPadToggle} />
        ))}
      </div>
    </div>
  )
}

export default InfinitePadSynth
