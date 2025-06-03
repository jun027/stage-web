'use client'

import { useRouter } from '@/navigation'
import { paths } from '@/routes/paths'
import { useCallback, useEffect, useState } from 'react'
import useAuthContext from '../hooks/use-auth-context'
import { useLocale } from 'next-intl'

function AuthGuard({ children }) {
  const { loading } = useAuthContext()

  return <>{loading ? <div>Loading...</div> : <Container>{children}</Container>}</>
}

export default AuthGuard

function Container({ children }) {
  const router = useRouter()
  const locale = useLocale()

  const { authenticated } = useAuthContext()

  const [checked, setChecked] = useState(false)

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname.replace(`/${locale}`, ''),
      }).toString()

      const loginPath = paths.login
      const href = `${loginPath}?${searchParams}`

      router.replace(href)
    } else {
      setChecked(true)
    }
  }, [authenticated, locale, router])

  useEffect(() => {
    check()
  }, [check])

  if (!checked) return null

  return <>{children}</>
}
