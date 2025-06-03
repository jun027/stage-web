import { axs } from '@/utils/axios'

const prefix = '/game'

const game = {
  joinGame: async (payload) => {
    const data = await axs(`${prefix}/joinGame`, payload)
    return data
  },
  gameList: async (payload) => {
    const data = await axs(`${prefix}/gamelist`, payload)
    return data
  },
  recycle: async () => {
    const data = await axs(`${prefix}/recycle`, null, 'GET')
    return data
  },
}

export const { joinGame, gameList, recycle } = game
export default game
