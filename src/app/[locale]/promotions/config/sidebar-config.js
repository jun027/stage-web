import { paths } from '@/routes/paths'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export function useSideBarData() {
  const t = useTranslations('Category.Promotions')

  const data = useMemo(
    () => [
      {
        id: uuid(),
        title: t('AllPromotions'),
        link: paths.promotions.allPromotions,
      },
      {
        id: uuid(),
        title: t('LimitedTimeOffers'),
        link: paths.promotions.limitedTimeEvent,
      },
      {
        id: uuid(),
        title: t('NewUserFirstDeposit'),
        link: paths.promotions.newUserFirstDeposit,
      },
    ],
    [t]
  )

  return { data }
}
