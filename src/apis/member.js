import { axs } from '@/utils/axios'

const prefix = '/member'

const member = {
  status: async () => {
    const data = await axs(`${prefix}/status`, null, 'GET')
    return data
  },
  info: async () => {
    const data = await axs(`${prefix}/info`, null, 'GET')
    return data
  },
  updateInfo: async (payload) => {
    const data = await axs(`${prefix}/info`, payload, 'POST')
    return data
  },
  transRecords: async (payload) => {
    const data = await axs(`${prefix}/transRecords`, payload)
    return data
  },
  betRecords: async (payload) => {
    const data = await axs(`${prefix}/betRecords`, payload)
    return data
  },
}

export const { status, info, updateInfo, transRecords, betRecords } = member
export default member
