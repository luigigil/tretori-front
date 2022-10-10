/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { Session } from 'inspector'
import Layout from 'layouts/layout'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

interface _AppProps {
  Component: any
  pageProps: any
}

export default function _App({ Component, pageProps }: _AppProps) {
  const router = useRouter()

  if (router.pathname.includes('/login')) {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    )
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
