import { adminPayment } from '@/apis/wallet'

// eslint-disable-next-line import/no-anonymous-default-export
export default (payload) => async () => {
  const response = await adminPayment(payload)
  return response
}
