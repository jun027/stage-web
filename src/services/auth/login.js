import { login } from '@/apis/auth'

// eslint-disable-next-line import/no-anonymous-default-export
export default (payload) => async () => {
  const response = await login(payload)
  return response
}
