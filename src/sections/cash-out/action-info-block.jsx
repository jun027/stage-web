import { memo } from 'react'
import axios from 'axios'
import { cookies } from 'next/headers'
import { COMMON } from './constants/common'
import { API_PRIVATE_URL_PREFIX } from '@/apis/constants'

async function getCashOutInfo(cookie) {
  try {
    const host = process.env.BASE_URL
    const url = `${host}${API_PRIVATE_URL_PREFIX}/wallet/withdrawGate`
    const {
      data: { withdrawable_times, withdrawable_amount },
    } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })

    return {
      cashOutTimes:
        withdrawable_times === COMMON.INFINITY.id ? COMMON.INFINITY.label : withdrawable_times,
      cashOutAmount:
        withdrawable_amount === COMMON.INFINITY.id ? COMMON.INFINITY.label : withdrawable_amount,
    }
  } catch (error) {
    console.log('>>> error: ', error)
    return {
      cashOutTimes: '未知數',
      cashOutAmount: '未知數',
    }
  }
}

async function ActionInfoBlock() {
  const cookieStore = cookies()
  const jwtTokenData = cookieStore.get('jwtToken')
  const { cashOutTimes, cashOutAmount } = await getCashOutInfo(
    `${jwtTokenData.name}=${jwtTokenData.value}`
  )
  return (
    <div className="flex flex-row gap-x-4">
      {/* 託售次數 */}
      <div className="flex-1 flex flex-col w-40 justify-center items-center h-28 rounded-lg overflow-hidden border">
        <div className="bg-[#265FFD] py-1.5 w-full">
          <h4 className=" text-white text-center">{'托售次數'}</h4>
        </div>
        <div className="flex-1 py-2 flex flex-col justify-center items-center">
          <p className="text-center text-212529">{cashOutTimes}</p>
          <p className="text-center text-gray-400">{'今日可托售次數'}</p>
        </div>
      </div>

      {/* 託售額度 */}
      <div className="flex-1 flex flex-col w-40 justify-center items-center h-28 rounded-lg overflow-hidden border">
        <div className="bg-[#265FFD] py-1.5 w-full">
          <h4 className="text-white text-center">{'托售金額'}</h4>
        </div>
        <div className="flex-1 py-2 flex flex-col justify-center items-center">
          <p className="text-center text-212529">{cashOutAmount}</p>
          <p className="text-center text-gray-400">{'今日可用額度'}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(ActionInfoBlock)
