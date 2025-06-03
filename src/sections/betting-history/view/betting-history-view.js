'use client'

import SearchBlock from '../search-block'
import ResultBlock from '../result-block'
import { useCallback, useState } from 'react'
import { format } from 'date-fns'

export default function BettingHistoryView() {
  const [dataTableList, setDataTableList] = useState([])

  const onDataChange = useCallback((data) => {
    const updatedData = data.map((item) => {
      return {
        ...item,
        bet_at: format(new Date(item.bet_at), 'yyyy-MM-dd HH:mm:ss'),
      }
    })
    setDataTableList(updatedData)
  }, [])

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <SearchBlock onDataChange={onDataChange} />
      <ResultBlock dataList={dataTableList} />
    </div>
  )
}
