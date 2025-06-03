import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export function useInfoConfig() {
  const t = useTranslations('Dashboard.PersonalProfile')

  const data = useMemo(
    () => ({
      baseInfo: {
        id: 1,
        iconImgUrl: '/images/icon/icon-base-info-01.png',
        title: t('BasicInformation'),
      },
      phoneInfo: {
        id: 2,
        iconImgUrl: '/images/icon/icon-phone-01.png',
        title: t('PhoneNumber'),
      },
      mailInfo: {
        id: 3,
        iconImgUrl: '/images/icon/icon-mail-01.png',
        title: t('Email'),
      },
      bankInfo: {
        id: 4,
        iconImgUrl: '/images/icon/icon-wallet-01.png',
        title: t('BankInformation'),
      },
    }),
    [t]
  )

  return { data }
}
