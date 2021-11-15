import React from 'react'

const content: any = {
  'en-US': {
    copy: 'Stay tuned with the latest Heaven Sounds® news',
    cta: 'Subscribe',
    emailPlaceholder: 'mybestemail@gmail.com'
  },
  'pt-BR': {
    copy: 'Fique por dentro das últimas novidades Heaven Sounds®',
    cta: 'Inscreva-se',
    emailPlaceholder: 'meumelhoremail@gmail.com'
  }
}


const EmailForm = ({ locale }: { locale: string }) => {
  let { cta, copy, emailPlaceholder } = content[locale]
  return (
    <>
      <div id='mc_embed_signup' className='lg:p-10 p-1 flex justify-center text-center'>
        <form
          action='https://heavensounds.us20.list-manage.com/subscribe/post?u=bc099dc10ead3caf27aa31ae6&amp;id=6cd7657a3e'
          method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate'
          target='_blank' noValidate>
          <p className='text-primary-2 text-xl pb-3'>{copy}</p>

          <div id='mc_embed_signup_scroll' className='flex align-center justify-center'>
            <input type='email' name='EMAIL'
                   className='email rounded-l-lg w-full lg:w-72 lg:px-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white'
                   id='mce-EMAIL' placeholder={emailPlaceholder}
                   required />

            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
              <input type='text'
                     name='b_bc099dc10ead3caf27aa31ae6_6cd7657a3e'
                     tabIndex={-1} defaultValue='' />
            </div>
            <button type='submit' defaultValue='Subscribe' name='subscribe' id='mc-embedded-subscribe'
                    className='lg:px-8 lg:w-auto w-64 rounded-r-lg bg-violet text-sm text-white font-bold p-4 uppercase border-violet border-t border-b border-r'>{cta}
            </button>
          </div>
        </form>
      </div>

    </>
  )
}

export default EmailForm
