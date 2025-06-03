import { NextResponse } from 'next/server'
import axios from 'axios'
import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'

export async function POST(req) {
  const { username, valid_type, valid_value } = await req.json()

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/auth/validator`,
      {
        username,
        valid_type,
        valid_value,
      }
    )

    const res = NextResponse.json(response.data)
    return res
  } catch (error) {
    console.log('[error] ', error)
    return Response.json({ message: 'Validator failed' })
  }
}
