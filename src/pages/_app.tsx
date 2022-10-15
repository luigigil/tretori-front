/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import Layout from 'layouts/layout'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import { PropsWithChildren, useEffect } from 'react'

interface _AppProps {
  Component: any
  pageProps: any
}

const Auth = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const router = useRouter()
  const loading = status === 'loading'
  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) router.push('/login') // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return <>{children}</>
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default function _App({ Component, pageProps }: _AppProps) {
  const router = useRouter()
  const shouldUseAuth = !router.pathname.includes('/login')

  return (
    <SessionProvider session={pageProps.session}>
      <SnackbarProvider maxSnack={3}>
        {shouldUseAuth ? (
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SnackbarProvider>
    </SessionProvider>
  )
}
