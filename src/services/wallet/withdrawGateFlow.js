import { withdrawGateFlow } from '@/apis/wallet'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await withdrawGateFlow()

  return response
}
