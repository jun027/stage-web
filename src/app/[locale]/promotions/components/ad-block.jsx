'use client'

import { memo, useCallback } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useAuthContext } from '@/auth/hooks'
import firstDepositAPI from '@/services/bonus/firstDeposit'

function AdBlock({ imageUrl, children }) {
  const { user } = useAuthContext()

  const handleApplyButtonClick = useCallback(async () => {
    if (!user) {
      toast.error('請先登入')
      return
    }

    const { message } = await firstDepositAPI()()

    if (message) {
      toast.error(message)
    }
  }, [user])

  return (
    <div className="bg-white border border-dark-400 rounded-2xl overflow-hidden">
      <Image
        className="w-full aspect-[841/263] relative z-10"
        src={imageUrl}
        alt="activity-01"
        width={1682}
        height={526}
      />
      <div className="p-6 space-y-6">{children}</div>
      <div className="p-6 pt-0">
        <button
          className="px-6 py-2 text-fff rounded-lg bg-common01 hover:opacity-80 duration-200"
          onClick={handleApplyButtonClick}
        >
          优惠申请
        </button>
      </div>
    </div>
  )
}

export default memo(AdBlock)
