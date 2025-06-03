import { memo } from 'react'
import { useInfoConfig } from './config/info-config'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'

function InfoBlock({
  securityLevel = '未知',
  checkList = [
    {
      id: 1,
      check: false,
    },
    {
      id: 2,
      check: false,
    },
    {
      id: 3,
      check: false,
    },
    {
      id: 4,
      check: false,
    },
  ],
}) {
  const { data } = useInfoConfig()
  const t = useTranslations('Dashboard.PersonalProfile')

  return (
    <div className="card flex flex-col gap-y-4">
      <h3 className="text-xl text-212529 font-bold">{t('PersonalInfo')}</h3>
      <div className="p-3 border flex flex-col gap-y-3">
        <h4 className="text-base text-212529">{`${t(
          'AccountSecurityLevel'
        )}：${securityLevel}`}</h4>
        <p className="text-sm text-gray-400">{t('SecurityInformationPrompt')}</p>
        <p className="w-full h-[1px] bg-gray-200" />
        <div className="flex flex-row gap-x-9 gap-y-4 flex-wrap">
          {Object.values(data).map((item) => {
            const check = checkList.find((checkItem) => checkItem.id === item.id)

            return (
              <div key={item.id} className="flex items-center gap-x-3">
                <div className={clsx('w-10', check.check ? 'opacity-100' : 'opacity-50')}>
                  <Image
                    className="w-full h-full aspect-square"
                    src={item.iconImgUrl}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-sm text-212529">{item.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(InfoBlock)
