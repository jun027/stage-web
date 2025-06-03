import { gameList } from '@/apis/game'

// eslint-disable-next-line import/no-anonymous-default-export
export default (payload) => async () => {
  const response = await gameList(payload)
  return response
}
