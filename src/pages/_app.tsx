/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import Layout from 'layouts/layout'
import { useRouter } from 'next/router'

interface _AppProps {
  Component: any
  pageProps: any
}

export default function _App({ Component, pageProps }: _AppProps) {
  const router = useRouter()

  if (router.pathname.includes('/login')) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
