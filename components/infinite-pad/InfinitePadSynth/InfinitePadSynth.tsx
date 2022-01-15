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
  {"name": 'Abaddon Choir', pads: keys},
  {"name": 'Lunaris 1', pads: keys},
]

const translateNote = (code: string) => {
  return code.replace('#', 'sharp')
}
const crossFadeTime = 5000
const spriteDuration = 10000

const generateSoundsForPatch = (patch: {name: string, pads: Array<string>}) => Object.fromEntries(patch.pads.map(k => [k, new Howl({
    src: [`/sounds/Infinite Pad - ${patch.name} - ${translateNote(k)}.mp3`],
    sprite: {
      main: [3000, spriteDuration]
    }
  })]))

const initialPatch = {...patches[0], sounds: generateSoundsForPatch(patches[0])}

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


  const [patch, setPatch] = useState(initialPatch)
  const prevLoopKey = useRef<string>()

  const [cutoff, setCutoff] = useState(245)
  const [volume, setVolume] = useState(127)


  const onButtonPadToggle = ({ key }: { key: string }) => {
    setState(prev => {
      if (prev.currentKey && prev.currentSoundId) {
        // @ts-ignore
        clearTimeout(state.loopTimeoutId)
        let playingSound: Howl = patch.sounds[prev.currentKey]
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
    const sound: Howl = patch.sounds[state.currentKey]

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


  const incPatch = (e: Event)=>{
    let currentIndex = patches.findIndex((p=>p.name == patch.name))
    let nextIndex = currentIndex + 1;

    if (nextIndex > patches.length-1){
      nextIndex = 0
    }

    setPatch({...patches[nextIndex], sounds: generateSoundsForPatch(patches[nextIndex])});
  }

  const decPatch = (e: Event)=>{
    let currentIndex = patches.findIndex((p=>p.name == patch.name))
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0){
      prevIndex = patches.length - 1;
    }

    setPatch({...patches[prevIndex], sounds: generateSoundsForPatch(patches[prevIndex])});
  }

  return (
    <div className={s.synth}>
      <div className='grid grid-cols-4 lg:gap-5 gap-2 items-center'>
        <ScreenDisplay className='lg:col-span-2 col-span-4' displayName={patch.name} />

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1'>
          <PatchButton dec={true} onClick={decPatch}/>
          Patch
          <PatchButton dec={false} onClick={incPatch} />
        </div>

        <div className='flex items-center justify-around col-span-4 md:col-span-2 lg:col-span-1 pt-10 pb-8'>
          <Knob label='Cutoff' initialValue={cutoff} unit={'Hz'} minValue={60} maxValue={1500} onChangeValue={(v: number) => setCutoff(v)} />
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
