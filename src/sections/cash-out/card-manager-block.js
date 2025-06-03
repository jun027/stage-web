import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { memo } from 'react'

function CardManagerBlock() {
  const t = useTranslations('Dashboard.CashOut')

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl text-212529">{t('CardManagement')}</h3>
        <p>{t('CardQuantity')}: 2/2</p>
      </div>
      <div className="flex flex-row flex-wrap gap-x-5 gap-y-4">
        <div className="w-[220px] relative">
          <div className="w-6 absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <Image
              className="aspect-square w-full h-full"
              src={'/images/icon/icon-success-02.png'}
              alt="card"
              width={24}
              height={24}
            />
          </div>
          <Image
            className="aspect-[220/105] w-full h-full"
            src={'/images/card-01.png'}
            alt="card"
            width={220}
            height={105}
          />
        </div>
        <div className="w-[220px] relative">
          <div className="w-6 absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2">
            <Image
              className="aspect-square w-full h-full"
              src={'/images/icon/icon-success-02.png'}
              alt="card"
              width={24}
              height={24}
            />
          </div>
          <Image
            className="aspect-[220/105] w-full h-full"
            src={'/images/card-02.png'}
            alt="card"
            width={220}
            height={105}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(CardManagerBlock)
