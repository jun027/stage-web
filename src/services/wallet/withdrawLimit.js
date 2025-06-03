import { withdrawLimit } from '@/apis/wallet'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await withdrawLimit()

  return response
}
