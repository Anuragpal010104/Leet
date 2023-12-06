import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <Head>
      <title>Leet</title>
      <meta name="description" content="Leet is a web app that helps you learn a new language by reading the news." />
      <link
      rel="icon"
      href="/favicon.png"
      type="image/<generated>"
      sizes="<generated>"
    />
    </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  ) 
}
