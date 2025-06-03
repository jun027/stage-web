import { paths } from '@/routes/paths'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export function useCashConfig() {
  const t = useTranslations('Dashboard')

  const data = useMemo(
    () => [
      {
        id: uuid(),
        title: t('CashIn.NavName'),
        buttonImgUrl: '/images/buttons/cash-in.png',
        buttonHoverImgUrl: '/images/buttons/cash-in-hover.png',
        link: paths.dashboard.cashIn,
      },
      // {
      //   id: uuid(),
      //   title: '轉點',
      //   buttonImgUrl: '/images/buttons/transfer-point.png',
      //   buttonHoverImgUrl: '/images/buttons/transfer-point-hover.png',
      //   link: paths.dashboard.transferPoint,
      // },
      {
        id: uuid(),
        title: t('CashOut.NavName'),
        buttonImgUrl: '/images/buttons/cash-out.png',
        buttonHoverImgUrl: '/images/buttons/cash-out-hover.png',
        link: paths.dashboard.cashOut,
      },
    ],
    [t]
  )

  return { data }
}
