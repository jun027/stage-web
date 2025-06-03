'use client'

import { DataTablePro } from '@/components/dataTalePro'
import { memo, useMemo } from 'react'

function ResultBlock({ dataList = [] }) {
  const columns = useMemo(
    () => [
      {
        header: '交易類型',
        accessorKey: 'trans_type',
        id: 'trans_type',
        width: 15,
        align: 'left',
      },
      {
        header: '交易時間',
        accessorKey: 'trans_date',
        id: 'trans_date',
        width: 30,
        align: 'left',
      },
      {
        header: '訂單編號',
        accessorKey: 'order_seq',
        id: 'order_seq',
        width: 40,
        align: 'left',
      },
      {
        // 交易金額
        header: '交易金額',
        accessorKey: 'amount',
        id: 'amount',
        width: 20,
        align: 'left',
      },
      {
        // 交易手續費
        header: '交易手續費',
        accessorKey: 'fee',
        id: 'fee',
        width: 20,
        align: 'left',
      },
      {
        // 交易完成時間
        header: '交易完成時間',
        accessorKey: 'trans_done_date',
        id: 'trans_done_date',
        width: 30,
        align: 'left',
      },
      {
        // 狀態
        header: '狀態',
        accessorKey: 'status',
        id: 'status',
        width: 20,
        align: 'left',
      },
    ],
    []
  )

  return (
    <div className="card flex flex-col gap-y-4">
      {/* Table Result */}
      <DataTablePro
        loading={false}
        headerRowSx={{
          borderRadius: '12px',
          backgroundColor: '#f2f2f2',
        }}
        tableMinWidth={1000}
        tbodyMaxHeight={400}
        data={dataList}
        columns={columns}
      />
    </div>
  )
}

export default memo(ResultBlock)
