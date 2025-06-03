'use client'

import { useContext } from 'react'
import { AuthContext } from '../context/jwt/auth-context'

export default function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider')

  return context
}
