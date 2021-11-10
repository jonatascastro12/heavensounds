import { InferGetStaticPropsType } from 'next'
import { getStaticProps } from './index'
import { Layout } from '@components/common'
import { Container } from '@components/ui'
import InfinitePadSynth from '@components/infinite-pad-synth/InfinitePadSynth'

const InfinitePadApp = function({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <InfinitePadSynth />
    </Container>
  )
}


InfinitePadApp.Layout = Layout
InfinitePadApp.theme = 'dark'

export default InfinitePadApp
