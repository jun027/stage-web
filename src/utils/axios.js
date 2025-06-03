import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'
import _axios from 'axios'
import toast from 'react-hot-toast'

const axios = (baseURL = API_PRIVATE_URL_PREFIX, method = 'POST', credentials = true) => {
  const instance = _axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: credentials,
    baseURL,
    method,
    timeout: 300000,
    responseType: 'json',
  })

  return instance
}

const handleCatchError = (err) => {
  if (err.response.status === 500) {
    toast.error('伺服器錯誤')
  } else if (err.response) {
    toast.error(err.response.data.message)
  } else {
    toast.error(`${err.code} ${JSON.stringify(err)}`)
  }

  return err
}

const axs = (apiName, payload, method) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve, reject) => {
    axios()({
      url: apiName,
      data: payload,
      method,
    })
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(handleCatchError(error))
      })
  })

export default axios
export { axs }
