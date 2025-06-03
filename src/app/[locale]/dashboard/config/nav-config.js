import { paths } from '@/routes/paths'
import { v4 as uuid } from 'uuid'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

export function useNavConfig() {
  const t = useTranslations('Dashboard')

  const data = useMemo(
    () => [
      {
        id: uuid(),
        title: t('PersonalProfile.NavName'),
        buttonImgUrl: '/images/buttons/person-profile.png',
        buttonHoverImgUrl: '/images/buttons/person-profile.png',
        link: paths.dashboard.personalProfile,
      },
      // {
      //   id: uuid(),
      //   title: 'VIP特權',
      //   buttonImgUrl: '/images/buttons/vip-privileges.png',
      //   buttonHoverImgUrl: '/images/buttons/vip-privileges.png',
      //   link: paths.dashboard.vipPrivileges,
      // },
      // {
      //   id: uuid(),
      //   title: '我的錢包',
      //   buttonImgUrl: '/images/buttons/my-wallet.png',
      //   buttonHoverImgUrl: '/images/buttons/my-wallet.png',
      //   link: paths.dashboard.myWallet,
      // },
      {
        id: uuid(),
        title: t('TransactionHistory.NavName'),
        buttonImgUrl: '/images/buttons/transaction-history.png',
        buttonHoverImgUrl: '/images/buttons/transaction-history.png',
        link: paths.dashboard.transactionHistory,
      },
      {
        id: uuid(),
        title: t('BettingHistory.NavName'),
        buttonImgUrl: '/images/buttons/betting-history.png',
        buttonHoverImgUrl: '/images/buttons/betting-history.png',
        link: paths.dashboard.bettingHistory,
      },
      // {
      //   id: uuid(),
      //   title: '福利中心',
      //   buttonImgUrl: '/images/buttons/welfare-center.png',
      //   buttonHoverImgUrl: '/images/buttons/welfare-center.png',
      //   link: paths.dashboard.welfareCenter,
      // },
      // {
      //   id: uuid(),
      //   title: '消息中心',
      //   buttonImgUrl: '/images/buttons/message-center.png',
      //   buttonHoverImgUrl: '/images/buttons/message-center.png',
      //   link: paths.dashboard.messageCenter,
      // },
    ],
    [t]
  )

  return { data }
}
