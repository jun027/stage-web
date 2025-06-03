'use client'

import useCategoryGetGame from '@/hook/useCategoryGetGame'
import { Link } from '@/navigation'
import {
  CATEGORY_TYPE as SPORT_CATEGORY_TYPE,
  useSportData,
} from '@/sections/common/config/sport-config'
import { Skeleton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function SportView() {
  const t = useTranslations('Category.Sport')
  const { data } = useSportData()
  const { isLoading, list } = useCategoryGetGame(SPORT_CATEGORY_TYPE, data)

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
              src="/images/cover-sport-01.png"
              alt="真人"
              width={620}
              height={720}
            />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-y-8 max-w-[440px]">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-4xl font-bold text-[#58A9FE]">{t('Title')}</h1>
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
                  <Link key={item.id} href={item.link} className="flex flex-col gap-y-2">
                    <div className="rounded-xl border-white w-[78px] bg-sport-button aspect-square">
                      <Image
                        className="w-full h-full"
                        src={item.imgUrl}
                        alt={item.title}
                        width={78}
                        height={78}
                      />
                    </div>
                    <p className="text-4d4d4d text-base font-bold text-center">{item.title}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
