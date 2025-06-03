import { axs } from '@/utils/axios'

const prefix = '/auth'

const auth = {
  login: async (payload) => {
    const data = await axs(`${prefix}/login`, payload)
    return data
  },
  signup: async (payload) => {
    const data = await axs(`${prefix}/register`, payload)
    return data
  },
  logout: async () => {
    const data = await axs(`${prefix}/logout`)
    return data
  },
  validator: async (payload) => {
    const data = await axs(`${prefix}/validator`, payload)
    return data
  },
}

export const { login, signup, logout, validator } = auth
export default auth
