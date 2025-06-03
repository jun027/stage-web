import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export function useCashInData() {
  const t = useTranslations('Dashboard.CashIn')

  const data = useMemo(
    () => ({
      // BankTransferPayment: {
      //   id: 1,
      //   title: t('PaymentTransfer'),
      //   imgUrl: '/images/buttons/bank-transfer-payment.png',
      //   hoverImgUrl: '/images/buttons/bank-transfer-payment-hover.png',
      //   identityVerification: null,
      // },
      UWalletTransfer: {
        id: 2,
        title: t('UWalletTransfer'),
        imgUrl: '/images/buttons/u-wallet-transfer.png',
        hoverImgUrl: '/images/buttons/u-wallet-transfer-hover.png',
        identityVerification: null,
      },
      BackendCreditTopUp: {
        id: 3,
        title: t('BackendTopUp'),
        imgUrl: '/images/buttons/backend-credit-top-up.png',
        hoverImgUrl: '/images/buttons/backend-credit-top-up-hover.png',
        identityVerification: ['admin'],
      },
    }),
    [t]
  )

  const dataList = Object.values(data)

  return { data, dataList }
}
