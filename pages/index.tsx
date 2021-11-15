import commerce from '@lib/api/commerce'
import Image from 'next/image'
import { Layout } from '@components/common'
import { useTheme } from 'next-themes'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from '@components/ui/Link'
import { useRouter } from 'next/router'

export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any)
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      locale,
      products,
      categories,
      brands,
      pages
    },
    revalidate: 60
  }
}

const content: any = {
  'en-US': {
    mainCopy: 'You don\'t need to install any app. Just open from your browser and start the worship atmosphere right now!',
    cta: 'Start App (Beta)'
  },
  'pt-BR': {
    mainCopy: 'Não precisa instalar nenhum app. Abra direto no navegador e comece criar um ambiente worship agora mesmo!',
    cta: 'Iniciar App (Beta)'
  }
}

export default function Home({
                               products
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme, setTheme } = useTheme()
  const { locale } = useRouter()
  const { mainCopy, cta } = locale && content[locale]

  return (
    <section className='w-full'>
      <div className='
          relative
          items-center
          w-full
          px-5
          py-12
          mx-auto
          md:px-12
          lg:px-16
          max-w-7xl
          lg:py-24
        '>
        <div className='flex w-full mx-auto text-left'>
          <div className='relative inline-flex items-center mx-auto align-middle'>
            <div className='text-center'>
              <h1 className='
                  max-w-5xl
                  text-2xl
                  font-bold
                  leading-none
                  tracking-tighter
                  text-neutral-600
                  md:text-5xl
                  lg:text-6xl lg:max-w-7xl
                '> Infinite Pads <br className='hidden lg:block' /> <span className='text-blue'>Online</span></h1>
              <p className='
                  max-w-xl
                  mx-auto
                  mt-8
                  text-base
                  leading-relaxed
                  text-gray-300
                '> {mainCopy} </p>
              <div className='flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6'>
                <div className='mt-3 rounded-lg sm:mt-0'>
                  <Link href={"/infinite-pad-app"}>
                    <button className='
                      items-center
                      block
                      px-5
                      py-4
                      text-white
                      font-medium
                      text-center text-white
                      transition
                      duration-500
                      ease-in-out
                      transform
                      bg-violet
                      lg:px-10
                      rounded-xl
                      hover:bg-blue-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-blue-500
                    '> {cta}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id='intro'>
          <div className='
              flex flex-col
              items-center
              justify-center
              pt-24
              mx-auto
              rounded-lg
              lg:px-10
              max-w-7xl
            '>
            <img className='object-cover object-center w-full rounded-xl' alt='hero'
                 src='/featured-infinite-pad-3.jpg' />
          </div>
        </section>
      </div>
    </section>
  )
}

Home.Layout = Layout
