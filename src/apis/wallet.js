import { axs } from '@/utils/axios'

const prefix = '/wallet'

const wallet = {
  detail: async () => {
    const data = await axs(`${prefix}/detail`, null, 'GET')
    return data
  },
  centerWallet: async () => {
    const data = await axs(`${prefix}/centerWallet`, null, 'GET')
    return data
  },
  recycle: async () => {
    const data = await axs(`${prefix}/recycle`, null, 'GET')
    return data
  },
  bringin: async (payload) => {
    const data = await axs(`${prefix}/recycle`, payload)
    return data
  },
  initOrder: async (payload) => {
    const data = await axs(`${prefix}/initOrder`, payload)
    return data
  },
  adminPayment: async (payload) => {
    const data = await axs(`${prefix}/adminPayment`, payload)
    return data
  },
  withdraw: async (payload) => {
    const data = await axs(`${prefix}/withdraw`, payload)
    return data
  },
  withdrawGateFlow: async () => {
    const data = await axs(`${prefix}/withdrawGateFlow`, null, 'GET')
    return data
  },
}

export const {
  detail,
  centerWallet,
  recycle,
  bringin,
  initOrder,
  adminPayment,
  withdraw,
  withdrawGateFlow,
} = wallet
export default wallet
