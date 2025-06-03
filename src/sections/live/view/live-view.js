'use client'

import EnterGameBtn from '@/components/components/enter-game-btn'
import useCategoryGetGame from '@/hook/useCategoryGetGame'
import {
  CATEGORY_TYPE as LIVE_CATEGORY_TYPE,
  useLiveData,
} from '@/sections/common/config/live-config'
import { Skeleton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LiveView() {
  const t = useTranslations('Category.Live')
  const { data: liveData } = useLiveData()
  const { isLoading, list } = useCategoryGetGame(LIVE_CATEGORY_TYPE, liveData)

  return (
    <div
      className="bg-white flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/images/LiveBackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-grow flex items-center justify-center p-6 lg:max-w-none max-w-xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-x-28">
          <div className="aspect-[620/720] w-full lg:w-[620px]">
            <Image
              className="w-full h-full"
              src="/images/cover-live-01.png"
              alt="真人"
              width={620}
              height={720}
            />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-y-8 max-w-[440px]">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-4xl font-bold text-[#A77A35]">{t('Title')}</h1>
              <p className="opacity-50 text-center lg:text-left">{t('Description')}</p>
            </div>
            {isLoading ? (
              <Stack width={'100%'}>
                <Skeleton animation="wave" />
                <Skeleton width={'30%'} animation="wave" />
              </Stack>
            ) : (
              <div className="flex flex-row flex-wrap gap-6 lg:gap-3 lg:justify-start justify-evenly">
                {list.map((item) => (
                  <EnterGameBtn
                    key={item.id}
                    id={item.id}
                    agentId={item.agentId}
                    title={item.title}
                    imgUrl={item.imgUrl}
                    type={item.type}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
