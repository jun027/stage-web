'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { CategoryButton } from './category-button'
import { paths } from '@/routes/paths'
import { useLiveData } from '@/sections/common/config/live-config'
import { useSportData } from '@/sections/common/config/sport-config'
import { useLotteryData } from '@/sections/common/config/lottery-config'
import { useElectronicData } from '@/sections/common/config/electronic-config'
import getAllGameListAPI from '@/services/home/getAllGameList'
import { useBoolean } from '@/hook/use-boolean'
import { Skeleton, Stack } from '@mui/material'
import EnterGameBtn from '@/components/components/enter-game-btn'

export function EnterGameBlock() {
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const { data: liveData } = useLiveData()
  const { data: sportData } = useSportData()
  const { data: lotteryData } = useLotteryData()
  const { data: electronicData } = useElectronicData()
  const [gameList, setGameList] = useState([])

  const onFetchGameList = useCallback(async () => {
    try {
      setApiIsLoadingTrue()
      const gameListMap = [...liveData, ...sportData, ...lotteryData, ...electronicData]
      const res = await getAllGameListAPI(gameListMap)()
      setGameList(res)
    } catch (error) {
      console.error(error)
    } finally {
      setApiIsLoadingFalse()
    }
  }, [liveData, lotteryData, setApiIsLoadingFalse, setApiIsLoadingTrue, sportData, electronicData])

  useEffect(() => {
    onFetchGameList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-between rounded-[32px] shadow-home-frame px-11 pt-52 pb-20">
      <div className="w-full lg:w-auto max-w-96 lg:max-w-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-10 flex flex-col items-center mb-24 bg-fff py-2 px-12 rounded-xl">
        <div className="flex flex-col items-center">
          <h3 className="text-62AFFF font-bold text-[40px]">热门游戏</h3>
          <p className="text-41425E text-base font-bold">TOP 1000+ GAMES</p>
          <p className="text-41425E text-base font-bold text-center">
          你想要的你想要的Ur娱乐城都有，千万玩家首选娱乐平台
          </p>
        </div>
        <ul className="flex items-center gap-x-4 mt-10">
          <li className="hover:brightness-150">
            <CategoryButton title={'真人'} link={paths.live} bgColor="#007AFF" />
          </li>
          <li className="hover:brightness-110">
            <CategoryButton title={'体育'} link={paths.sport} bgColor="#00D108" />
          </li>
          <li className="hover:brightness-110">
            <CategoryButton title={'彩票'} link={paths.lottery} bgColor="#FEC704" />
          </li>
          <li className="hover:brightness-125">
            <CategoryButton title={'电子'} link={paths.electronic} bgColor="#DB00FF" />
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:gap-x-16 gap-y-10 lg:gap-y-0">
        <div className="aspect-[538/485]">
          <Image
            className="w-full"
            src={'/images/highlight-05.png'}
            alt={'真人'}
            width={538}
            height={485}
          />
        </div>
        <div className="flex flex-col justify-start items-center lg:items-start gap-y-5 lg:max-w-[510px]">
          <h2 className="text-5xl text-362100 font-bold">Ur娱乐城</h2>
          <p className="text-2xl text-[#ff9b6d]">多款游戏任您挑选</p>
          {apiIsLoading ? (
            <Stack width={'100%'}>
              <Skeleton animation="wave" />
              <Skeleton width={'30%'} animation="wave" />
            </Stack>
          ) : (
            <div className="flex flex-row flex-wrap gap-6 lg:gap-3 lg:justify-start justify-evenly">
              {gameList.map((item) => (
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
  )
}
