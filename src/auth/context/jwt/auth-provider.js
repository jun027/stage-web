'use client'

import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { AuthContext } from './auth-context'
import loginAPI from '@/services/auth/login'
import memberStatusAPI from '@/services/member/status'
import memberInfoAPI from '@/services/member/info'
import { deleteCookie, getCookie } from '@/utils/cookie'
import { format } from 'date-fns'
import updateMemberInfoAPI from '@/services/member/updateInfo'

const initialState = {
  user: null,
  loading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        loading: false,
        user: action.payload.user,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.user.name,
          nickname: action.payload.user.nickname,
          gender: action.payload.user.gender,
          birthday: action.payload.user.birthday,
        },
      }
    case 'FETCH_NEW_USER_INFO':
      return {
        ...state,
        user: action.payload.user,
      }
    case 'SIGNUP':
      return {
        ...state,
        user: action.payload.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Initialize
  const initialize = useCallback(async () => {
    // 驗證 accessToken 是否有效
    if (getCookie('jwtToken')) {
      try {
        const memberStatusResponse = await memberStatusAPI()()
        const memberInfoResponse = await memberInfoAPI()()

        const user = {
          ...memberStatusResponse,
          ...memberInfoResponse,
        }

        dispatch({
          type: 'INITIALIZE',
          payload: { user },
        })
      } catch (error) {
        if (error.response.status === 401) {
          deleteCookie('jwtToken')
        }
      }
    } else {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          user: null,
        },
      })
    }
  }, [])

  useEffect(() => {
    initialize()
  }, [initialize])

  // UPDATE_USER
  const updateUser = useCallback(async (name, nickName, gender, birthday) => {
    const payload = {
      name,
      nick_name: nickName,
      gender: gender,
      birthday: format(new Date(birthday), 'yyyy-MM-dd'),
    }

    const response = await updateMemberInfoAPI(payload)()

    if (response) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          user: {
            name,
            nickname: nickName,
            gender,
            birthday,
          },
        },
      })
    }
  }, [])

  // FETCH_NEW_USER_INFO
  const fetchNewUserInfo = useCallback(async () => {
    try {
      const memberStatusResponse = await memberStatusAPI()()
      const memberInfoResponse = await memberInfoAPI()()

      const user = {
        ...memberStatusResponse,
        ...memberInfoResponse,
      }

      dispatch({
        type: 'FETCH_NEW_USER_INFO',
        payload: { user },
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  // LOGIN
  const login = useCallback(
    async (username, password) => {
      try {
        const data = { username, password, login_type: 'account', tg_id: null }
        await loginAPI(data)()

        fetchNewUserInfo()
      } catch (error) {
        throw error
      }
    },
    [fetchNewUserInfo]
  )

  // LOGOUT
  const logout = useCallback(async () => {
    deleteCookie('jwtToken')

    dispatch({
      type: 'LOGOUT',
    })
  }, [])

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      updateUser,
      fetchNewUserInfo,
      logout,
    }),
    [state.user, status, login, updateUser, fetchNewUserInfo, logout]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
