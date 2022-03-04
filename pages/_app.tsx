import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'degen/styles'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
  )
    
}

export default MyApp
