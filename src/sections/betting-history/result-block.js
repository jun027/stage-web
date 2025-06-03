'use client'

import { DataTablePro } from '@/components/dataTalePro'
import { useTranslations } from 'next-intl'
import { memo, useMemo } from 'react'

function ResultBlock({ dataList }) {
  const t = useTranslations('Dashboard.BettingHistory')

  const columns = useMemo(
    () => [
      {
        header: '遊戲類型',
        accessorKey: 'game_type',
        id: 'game_type',
        width: 20,
        align: 'left',
      },
      {
        // 有效押注
        header: '有效押注',
        accessorKey: 'effect_bet',
        id: 'effect_bet',
        width: 20,
        align: 'left',
      },
      {
        // 輸贏
        header: '輸贏',
        accessorKey: 'win_lose',
        id: 'win_lose',
        width: 20,
        align: 'left',
      },
      {
        // 押注時間
        header: '押注時間',
        accessorKey: 'bet_at',
        id: 'bet_at',
        width: 20,
        align: 'left',
      },
    ],
    []
  )

  return (
    <div className="card flex flex-col gap-y-4">
      <div>
        <h3 className="text-xl text-212529">{t('FlowingWaterRecord')}</h3>
      </div>

      {/* Table Result */}
      <DataTablePro
        loading={false}
        headerRowSx={{
          borderRadius: '12px',
          backgroundColor: '#f2f2f2',
        }}
        tableMinWidth={500}
        tbodyMaxHeight={400}
        data={dataList}
        columns={columns}
      />
    </div>
  )
}

export default memo(ResultBlock)
