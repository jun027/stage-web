import { Button } from '@mui/material'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function WalletDetailCard({ title, value }) {
  const t = useTranslations('Dashboard.CashOut')

  return (
    <div className="border rounded-lg p-3 w-[200px] flex flex-col gap-y-6">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-base text-212529">{title}</h4>
        <Button
          variant="contained"
          sx={{
            borderRadius: 999,
            background: 'linear-gradient(180deg, rgba(166,209,255,1) 0%, rgba(0,123,255,1) 100%)',
          }}
        >
          {t('OneClickTransferIn')}
        </Button>
      </div>
      <p className="text-2xl text-212529">{`$${value}`}</p>
    </div>
  )
}

export default memo(WalletDetailCard)
