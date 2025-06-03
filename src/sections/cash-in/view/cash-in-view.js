'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useCashInData } from '../config/cash-in-config'
import SelectTypeBlock from '../select-type-block'
import UWalletTransfer from '../u-wallet-transfer'
import BackendCreditTopUp from '../backend-credit-top-up'
import DepositRecordSection from '../deposit-record-block'
import PromotionActivityBlock from '../promotion-activity-block'
import { useTranslations } from 'next-intl'
import { useAuthContext } from '@/auth/hooks'

export default function CashInView() {
  const tSidebar = useTranslations('Dashboard.CashIn.Sidebar')
  const { user } = useAuthContext()
  const { data: cashInData, dataList: cashInDataList } = useCashInData()
  const currentUserStatus = user?.status

  const showCashInDataList = useMemo(
    () =>
      cashInDataList.filter((data) => {
        // 如果沒有設定認證身份組，或當前使用者有在認證身份組裡，就顯示
        if (!data.identityVerification || data.identityVerification.includes(currentUserStatus)) {
          return true
        }

        return false
      }),
    [cashInDataList, currentUserStatus]
  )

  const depositRecordList = [
    {
      id: 1,
      title: '存款',
      value: 188,
      type: 'ATM',
      date: '2024-05-01 12:00:00',
    },
    {
      id: 2,
      title: '存款',
      value: 188,
      type: 'ATM',
      date: '2024-05-01 12:00:00',
    },
    {
      id: 3,
      title: '存款',
      value: 1000,
      type: 'CVS',
      date: '2024-05-01 12:00:00',
    },
    {
      id: 4,
      title: '存款',
      value: 5000,
      type: 'CVS',
      date: '2024-05-01 12:00:00',
    },
  ]

  const [currentType, setCurrentType] = useState(showCashInDataList[0].id)

  const handleCurrentTypeChange = useCallback((e) => {
    const currentTypeId = e.currentTarget.getAttribute('data-id')
    setCurrentType(Number(currentTypeId))
  }, [])

  return (
    <div className="flex gap-x-4 w-full">
      <div className="flex-1 flex flex-col gap-y-6">
        <div className="card">
          <SelectTypeBlock
            dataList={showCashInDataList}
            currentType={currentType}
            handleCurrentTypeChange={handleCurrentTypeChange}
          />
        </div>
        <div>
          {/* {currentType === cashInData.BankTransferPayment.id && <BankTransferPayment />} */}
          {currentType === cashInData.UWalletTransfer.id && <UWalletTransfer />}
          {currentType === cashInData.BackendCreditTopUp.id && <BackendCreditTopUp />}
        </div>
      </div>
      <div className="w-[296px] flex flex-col gap-y-4">
        {/* <DepositRecordSection title={tSidebar('DepositRecords')} list={depositRecordList} />
        <PromotionActivityBlock title={tSidebar('Promotions')} /> */}
      </div>
    </div>
  )
}
