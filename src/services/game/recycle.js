import { recycle } from '@/apis/game'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => async () => {
  const response = await recycle()
  return response
}
