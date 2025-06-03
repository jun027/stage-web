import { axs } from '@/utils/axios'

const prefix = '/bonus'

const bonus = {
  firstDeposit: async () => {
    const data = await axs(`${prefix}/firstDeposit`, null, 'GET')
    return data
  },
}

export const { firstDeposit } = bonus
export default bonus
