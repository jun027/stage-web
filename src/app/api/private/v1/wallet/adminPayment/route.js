import { NextResponse } from 'next/server'
import axios from 'axios'
import { getCookieWithKey } from '@/utils/cookie'
import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'

export async function POST(req) {
  const reqPayload = await req.json()
  const cookie = req.headers.get('Cookie')

  // get jwtToken from cookie
  const jwtTokenCookie = getCookieWithKey(cookie, 'jwtToken')

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/wallet/adminPayment`,
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
