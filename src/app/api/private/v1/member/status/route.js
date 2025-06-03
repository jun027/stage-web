import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'
import { getCookieWithKey } from '@/utils/cookie'
import axios from 'axios'

export async function GET(req) {
  const cookie = req.headers.get('Cookie')

  // get jwtToken from cookie
  const jwtTokenCookie = getCookieWithKey(cookie, 'jwtToken')

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/member/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwtTokenCookie,
        },
      }
    )

    return Response.json(response.data)
  } catch (error) {
    console.log(
      '[server-api-error:api/v1/member/center] status: ',
      error.response.status,
      ' / data: ',
      error.response.data
    )
    return Response.json(error.response?.data || { message: 'Status failed' }, {
      status: error.response?.status,
    })
  }
}
