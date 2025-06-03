import { memo } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function SelectTypeBlock({ dataList, currentType, handleCurrentTypeChange }) {
  const t = useTranslations('Dashboard.CashIn')

  return (
    <div className="flex flex-col items-start gap-y-1">
      <h3 className="text-xl font-bold text-212529">{t('CashIn')}</h3>
      <p className="text-sm text-aeaeae">{t('CashInDescription')}</p>
      <ol className="flex flex-row gap-x-4 mt-4">
        {dataList.map((item) => (
          <button
            className={clsx(
              'px-7 py-4 rounded-[4px] border-2 duration-200 flex flex-col items-center gap-y-1 relative',
              item.id === currentType ? 'border-blue-400 text-blue-500' : 'border-343A40 text-black'
            )}
            data-id={item.id}
            key={item.id}
            onClick={handleCurrentTypeChange}
          >
            <div className="relative w-7">
              <Image
                className="aspect-square w-full h-full"
                src={item.imgUrl}
                alt={item.title}
                width={28}
                height={28}
              />
              <Image
                className={clsx(
                  'aspect-square w-full h-full absolute top-0 left-0 z-10 duration-100',
                  item.id === currentType ? 'opacity-100' : 'opacity-0'
                )}
                src={item.hoverImgUrl}
                alt={item.title}
                width={28}
                height={28}
              />
            </div>
            {item.title}
            <div
              className={clsx(
                'w-5 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 duration-200 pointer-events-none',
                item.id === currentType ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Image
                className="w-full h-full"
                src={'/images/icon/icon-success-01.png'}
                alt="success"
                width={20}
                height={20}
              />
            </div>
          </button>
        ))}
      </ol>
    </div>
  )
}

export default memo(SelectTypeBlock)
