'use client'

import React, { memo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { startOfToday, endOfToday } from 'date-fns'
import MoreBtn from '@/components/components/more-btn'
import betRecordsAPI from '@/services/member/betRecords'

async function getBetRecords() {
  const payload = {
    game_type: null,
    start_date: startOfToday(),
    end_date: endOfToday(),
  }
  let response
  try {
    response = await betRecordsAPI(payload)()
  } catch (error) {
    console.error(error)
  }
  console.log('>>> response: ', response)

  return response
}

function CashOutRecordBlock({ title, value, number, date }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500">{number}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  )
}

function CashOutRecord() {
  const [records, setRecords] = useState([])
  const t = useTranslations('Dashboard.CashOut')
  const tButton = useTranslations('Button')

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getBetRecords()
      setRecords(data)
    }

    fetchRecords()
  }, [])

  const list = [
    {
      id: 1,
      title: '託售',
      value: '4458',
      number: '13323628',
      date: '2024-01-01 00:00:00',
    },
    {
      id: 2,
      title: '託售',
      value: '4458',
      number: '13323628',
      date: '2024-01-01 00:00:00',
    },
    {
      id: 3,
      title: '託售',
      value: '4458',
      number: '13323628',
      date: '2024-01-01 00:00:00',
    },
  ]

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{t('CashOutRecords')}</p>
        <MoreBtn title={tButton('More')} />
      </div>
      <div className="flex flex-col gap-y-4">
        {list.map(
          (item, index) => (
            <React.Fragment key={item.id}>
              <CashOutRecordBlock
                title={item.title}
                value={item.value}
                number={item.number}
                date={item.date}
              />
              {index !== list.length - 1 && <div className="w-full h-[1px] bg-gray-400" />}
            </React.Fragment>
          ),
          []
        )}
      </div>
    </div>
  )
}

export default memo(CashOutRecord)
