import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'
import { getCookieWithKey } from '@/utils/cookie'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const cookie = req.headers.get('Cookie')

  // get jwtToken from cookie
  const jwtTokenCookie = getCookieWithKey(cookie, 'jwtToken')

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/member/info`,
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

export async function POST(req) {
  const reqPayload = await req.json()
  const cookie = req.headers.get('Cookie')

  // get jwtToken from cookie
  const jwtTokenCookie = getCookieWithKey(cookie, 'jwtToken')

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/private/v1/member/info`,
      reqPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwtTokenCookie,
        },
      }
    )

    const res = NextResponse.json(response.data)
    return res
  } catch (error) {
    console.log('[error] ', error)
    return Response.json(error.response.data, { status: error.response.status })
  }
}
