import { firstDeposit } from '@/apis/bonus'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await firstDeposit()
  return response
}
