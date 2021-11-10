import React from 'react'
import { ButtonPad } from '@components/infinite-pad-synth/ButtonPad'
import { Grid } from '@components/ui'
import s from './InfinitePadSynth.module.css'


const InfinitePadSynth = () => {
  return (
    <div>
      <Grid className={s.grid}>
        <ButtonPad />
        <ButtonPad />
        <ButtonPad />
        <ButtonPad />
        <ButtonPad />
        <ButtonPad />
        <ButtonPad />

      </Grid>
    </div>
  )
}

export default InfinitePadSynth
