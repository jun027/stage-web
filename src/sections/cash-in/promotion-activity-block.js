import Image from 'next/image'
import MoreBtn from '../../components/components/more-btn'
import { useTranslations } from 'next-intl'

function PromotionActivityBlock({ title }) {
  const tButton = useTranslations('Button')

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{title}</p>
        <MoreBtn title={tButton('More')} />
      </div>
      <div>
        <div className="w-full">
          <Image
            className="w-full h-full"
            src="/images/cover-banner-01.jpg"
            alt="activity"
            width={3840}
            height={1174}
          />
        </div>
      </div>
    </div>
  )
}

export default PromotionActivityBlock
