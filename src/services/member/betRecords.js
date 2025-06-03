import { betRecords } from '@/apis/member'

// eslint-disable-next-line import/no-anonymous-default-export
export default (payload) => async () => {
  const response = await betRecords(payload)
  return response
}
