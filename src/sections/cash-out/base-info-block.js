'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import toast from 'react-hot-toast'
import recycleAPI from '@/services/game/recycle'
import { LoadingButton } from '@mui/lab'
import { useBoolean } from '@/hook/use-boolean'
import centerWalletAPI from '@/services/wallet/centerWallet'

function BaseInfoBlock() {
  const t = useTranslations('Dashboard.CashOut')

  const [balance, setBalance] = useState(0)
  const [lockBalance, setLockBalance] = useState(0)
  const {
    value: apiFetchCenterWalletIsLoading,
    onTrue: setApiFetchCenterWalletIsLoadingTrue,
    onFalse: setApiFetchCenterWalletIsLoadingFalse,
  } = useBoolean(false)

  const handleOneClickTransferInClick = useCallback(async () => {
    try {
      const res = await recycleAPI()()
      const { message } = res
      toast.success(message)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchCenterWalletData = useCallback(async () => {
    try {
      setApiFetchCenterWalletIsLoadingTrue()
      const centerWalletResponse = await centerWalletAPI()()

      setBalance(centerWalletResponse.balance)
      setLockBalance(centerWalletResponse.lock_balance)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setApiFetchCenterWalletIsLoadingFalse()
    }
  }, [setApiFetchCenterWalletIsLoadingFalse, setApiFetchCenterWalletIsLoadingTrue])

  useEffect(() => {
    fetchCenterWalletData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-4">
        <h3 className="text-xl text-212529 font-bold">{t('CashOut')}</h3>
        <div
          role="button"
          className="w-8 drop-shadow-lg cursor-pointer"
          onClick={fetchCenterWalletData}
        >
          <Image
            className="w-full h-full aspect-square"
            src="/images/buttons/fresh.png"
            alt="託售"
            width={32}
            height={32}
          />
        </div>
      </div>

      <div className="border rounded-md p-4 flex flex-row items-stretch h-36">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-row justify-between">
            <div>{t('CentralWallet')}</div>
            <LoadingButton
              loading={apiFetchCenterWalletIsLoading}
              onClick={handleOneClickTransferInClick}
            >
              <p className="text-[#007AFF]">{t('OneClickTransferIn')}</p>
            </LoadingButton>
          </div>
          <p className="text-2xl text-212529">{`$${balance}`}</p>
        </div>
        <p className="mx-4 w-[1px] bg-gray-300 h-full" />
        <div className="flex flex-col justify-between flex-1">
          <div>{t('LockedWallet')}</div>
          <p className="text-2xl text-212529">{`$${lockBalance}`}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(BaseInfoBlock)
