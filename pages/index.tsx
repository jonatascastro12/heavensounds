import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { useTheme } from 'next-themes'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from '@components/ui/Link'

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
      products,
      categories,
      brands,
      pages
    },
    revalidate: 60
  }
}

export default function Home({
                               products
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme, setTheme } = useTheme()
  // setTheme('system');

  return (
    <>
      <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
        <div className='sm:text-center lg:text-left'>
          <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            <span className='block text-primary xl:inline'>Infinite Pads</span>
            <span className='block text-indigo-600'>Online</span>
          </h1>
          <p
            className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
            Não precisa instalar nenhum app. Abra direto no navegador e comece criar um ambiente worship agora mesmo!
          </p>
          <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
            <div className='rounded-md shadow'>
              <Link href={{
                pathname: '/infinite-pad-app'
              }}>
                <a
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                  Abrir o App
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Home.Layout = Layout
