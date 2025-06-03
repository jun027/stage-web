'use client'

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { formatISO9075 } from 'date-fns'
import { DataTablePro } from '@/components/dataTalePro'
import withdrawGateFlowAPI from '@/services/wallet/withdrawGateFlow'

function CashOutLimitBlock() {
  const [list, setList] = useState([])

  const columns = useMemo(
    () => [
      {
        header: '時間',
        accessorKey: 'create_at',
        id: 'create_at',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          const date = formatISO9075(new Date(row.original.create_at))
          return date
        },
      },
      {
        header: '點數',
        accessorKey: 'amount',
        id: 'amount',
        width: 7,
        align: 'left',
      },
      {
        header: '所需流水',
        accessorKey: 'gate',
        id: 'gate',
        width: 15,
        align: 'left',
      },
      {
        header: '剩餘流水',
        accessorKey: 'gate_flow',
        id: 'gate_flow',
        width: 15,
        align: 'left',
      },
    ],
    []
  )

  const fetchWithdrawGateFlow = useCallback(async () => {
    const { list } = await withdrawGateFlowAPI()()
    setList(list)
  }, [])

  useEffect(() => {
    fetchWithdrawGateFlow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="border rounded-lg overflow-hidden">
      <DataTablePro
        loading={false}
        headerRowSx={{
          color: '#fff',
          borderRadius: '8px',
          backgroundColor: '#265FFD',
        }}
        tableMinWidth={700}
        tbodyMaxHeight={200}
        data={list}
        columns={columns}
        defaultSortBy={[{ id: 'create_at', desc: true }]}
      />
    </div>
  )
}

export default memo(CashOutLimitBlock)
