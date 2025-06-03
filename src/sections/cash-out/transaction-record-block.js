'use client'

import React, { memo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { startOfToday, endOfToday, format } from 'date-fns'
import MoreBtn from '@/components/components/more-btn'
import transRecordsAPI from '@/services/member/transRecords'
import { paths } from '@/routes/paths'
import { useRouter } from '@/navigation'

function useTrnasRecords() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      const payload = {
        type: -1,
        start_date: format(startOfToday(), 'yyyy-MM-dd HH:mm:ss'),
        end_date: format(endOfToday(), 'yyyy-MM-dd HH:mm:ss'),
      }
      try {
        setLoading(true)
        const data = await transRecordsAPI(payload)()
        // 限制只顯示前10筆
        const limitedData = data.slice(0, 10)
        setRecords(limitedData)
      } catch (error) {
        console.error('Error fetching transaction records:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [])

  return { records, loading }
}

function TransactionRecordBlock({ type, value, date }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500">{type}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
      <div className="flex flex-row justify-end">
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  )
}

function TransactionRecord() {
  const { records, loading } = useTrnasRecords()
  const t = useTranslations('Dashboard.CashOut.Sidebar')
  const tButton = useTranslations('Button')
  const router = useRouter()

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{t('DepositRecords')}</p>
        <MoreBtn
          title={tButton('More')}
          onClick={() => router.push(paths.dashboard.transactionHistory)}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          records.map(
            (item, index) => (
              <React.Fragment key={item.id}>
                <TransactionRecordBlock
                  type={item.trans_type}
                  value={item.amount}
                  date={format(new Date(item.trans_date), 'yyyy-MM-dd HH:mm:ss')}
                />
                {index !== records.length - 1 && <div className="w-full h-[1px] bg-gray-400" />}
              </React.Fragment>
            ),
            []
          )
        )}
      </div>
    </div>
  )
}

export default memo(TransactionRecord)
