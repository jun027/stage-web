'use client'

import { useCallback, useState } from 'react'
import ResultBlock from '../result-block'
import SearchBlock from '../search-block'
import { format } from 'date-fns'

export default function TransactionHistoryView() {
  const [dataTableList, setDataTableList] = useState([])

  const onDataChange = useCallback((data) => {
    const updatedData = data.map((item) => {
      return {
        ...item,
        trans_date: format(new Date(item.trans_date), 'yyyy-MM-dd HH:mm:ss'),
        trans_done_date: format(new Date(item.trans_done_date), 'yyyy-MM-dd HH:mm:ss'),
      }
    })
    setDataTableList(updatedData)
  }, [])

  return (
    <div className="flex flex-row gap-x-4">
      <div className="flex-1 flex flex-col gap-y-4">
        <SearchBlock onDataChange={onDataChange} />
        <ResultBlock dataList={dataTableList} />
      </div>
    </div>
  )
}
