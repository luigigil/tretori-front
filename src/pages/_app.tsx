/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import Layout from 'layouts/layout'

interface _AppProps {
  Component: any
  pageProps: any
}

export default function _App({ Component, pageProps }: _AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
