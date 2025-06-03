import { NextResponse } from 'next/server'
import axios from 'axios'
import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'

export async function POST(req) {
  const { username, password } = await req.json()

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/auth/login`,
      {
        username,
        password,
        login_type: 'account',
        tg_id: null,
      }
    )

    const cookie = response.headers['set-cookie']

    console.log('response: ', response)

    const res = NextResponse.json({ message: 'Login successful' })
    res.headers.set('Set-Cookie', cookie)
    return res
  } catch (error) {
    console.log('[error] ', error)
    return Response.json(error.response.data, { status: error.response.status })
  }
}
