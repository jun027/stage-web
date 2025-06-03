import { memo } from 'react'
import MoreBtn from '../../components/components/more-btn'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function CardManagerBlock({ title = '' }) {
  const tButton = useTranslations('Button')

  return (
    <div className="card flex flex-col gap-y-6">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{title}</p>
        <MoreBtn title={tButton('Manage')} />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="w-full">
          <Image src="/images/card-01.png" alt="card-manager" width={440} height={210} />
        </div>
        <div className="w-full">
          <Image src="/images/card-02.png" alt="card-manager" width={440} height={210} />
        </div>
      </div>
    </div>
  )
}

export default memo(CardManagerBlock)
