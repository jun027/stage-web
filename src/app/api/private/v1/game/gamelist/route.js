import { NextResponse } from 'next/server'
import axios from 'axios'
import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'

export async function POST(req) {
  const reqPayload = await req.json()

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}${API_PRIVATE_URL_PREFIX}/game/gamelist`,
      reqPayload
    )

    const res = NextResponse.json(response.data)
    return res
  } catch (error) {
    console.log('[error] ', error)
    return Response.json(error.response.data, { status: error.response.status })
  }
}
