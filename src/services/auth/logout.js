import { logout } from '@/apis/auth'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await logout()
  return response
}
