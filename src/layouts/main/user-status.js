'use client'

import { useAuthContext } from '@/auth/hooks'
import UserLogin from '@/components/auth-login/user-login'
import UserUnLogin from '@/components/auth-login/user-un-login'
import { useHeaderNavData } from './config-navigation-header'

export default function UserStatus() {
  const { user } = useAuthContext()
  const { loginData } = useHeaderNavData()

  return (
    <>
      {!user ? (
        <UserUnLogin list={loginData} />
      ) : (
        <UserLogin name={user?.nickname} vipLevel={user?.vipLevel} balance={user?.balance} />
      )}
    </>
  )
}
