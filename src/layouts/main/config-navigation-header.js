import { paths } from '@/routes/paths'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export function useHeaderNavData() {
  const t = useTranslations('Layout.Header')

  const navData = useMemo(
    () => [
      {
        id: uuid(),
        label: t('Home'),
        href: paths.home,
      },
      {
        id: uuid(),
        label: t('Live'),
        href: paths.live,
        games: ['MT 真人', 'DG 真人', 'SA 真人', '歐博 真人', 'WM 真人', 'EVO 真人'],
        previewImages: [
          '/images/preview/preview-MT.png',
          '/images/preview/preview-DG.png',
          '/images/preview/preview-SA.png',
          '/images/preview/preview-OB.png',
          '/images/preview/preview-WM.png',
          '/images/preview/preview-EVO.png',
        ]

      },
      {
        id: uuid(),
        label: t('Sport'),
        href: paths.sport,
        games: ['熊貓 體育', 'Super 體育','WG 體育' ],
        previewImages: [
          '/images/preview/preview-PANDA.png',
          '/images/preview/preview-SUPER.png',
          '/images/preview/preview-WG.png',
        ]
      },
      {
        id: uuid(),
        label: t('Lottery'),
        href: paths.lottery,
        games: ['MT 彩票', '9K 彩票', 'DB 彩票'],
        previewImages: [
          '/images/preview/previewLottery-MT.png',
          '/images/preview/previewLottery-9K.png',
          '/images/preview/previewLottery-DB.png',
        ]
      },
      {
        id: uuid(),
        label: t('Electronic'),
        href: paths.electronic,
        games: ['FG 電子', 'GB 電子', 'RSG 電子'],
        previewImages: [
          '/images/preview/preview-FG.png',
          '/images/preview/preview-GB.png',
          '/images/preview/preview-RSG.png',
        ]
      },
      {
        id: uuid(),
        label: t('Promotions'),
        href: paths.promotions.root,
      },
    ],
    [t]
  )

  const loginData = useMemo(
    () => [
      {
        id: uuid(),
        label: t('Login'),
        href: paths.login,
      },
      {
        id: uuid(),
        label: t('SignUp'),
        href: paths.signup,
      },
    ],
    [t]
  )

  return { navData, loginData }
}
