import { memo } from 'react'
import WalletDetailCard from './wallet-detail-card'
import { useTranslations } from 'next-intl'

function WalletDetailBlock({ list }) {
  const t = useTranslations('Dashboard.CashOut')

  return (
    <div className="card flex flex-col gap-y-4">
      <h3 className="text-xl text-212529">{t('WalletDetails')}</h3>
      <div className="flex flex-row gap-x-6 gap-y-5 flex-wrap">
        {list.length === 0 && <p>無資料</p>}
        {list.length > 0 &&
          list.map((item) => (
            <WalletDetailCard key={item.id} title={item.game} value={item.balance} />
          ))}
      </div>
    </div>
  )
}

export default memo(WalletDetailBlock)
