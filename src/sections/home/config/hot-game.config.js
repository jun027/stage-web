import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export function useHotGameData() {
  const data = useMemo(
    () => [
      {
        id: uuid(),
        bgImgUrl: '/images/deco/deco-01.png',
        iconUrl: '/images/icon/icon-01.png',
        value: '60',
        unit: '秒',
        title: '平均存款 60 秒',
        subTitle: 'AVERAGE TIME OF DEPOSIT',
      },
      {
        id: uuid(),
        bgImgUrl: '/images/deco/deco-02.png',
        iconUrl: '/images/icon/icon-02.png',
        value: '60',
        unit: '秒',
        title: '平均托售时间 60秒',
        subTitle: 'AVERAGE TIME OF WITHDRAW',
      },
      {
        id: uuid(),
        bgImgUrl: '/images/deco/deco-01.png',
        iconUrl: '/images/icon/icon-03.png',
        value: '20',
        unit: '+',
        title: '官方合作伙伴 20+',
        subTitle: 'COOPERATIVE PLATFORM',
      },
      {
        id: uuid(),
        bgImgUrl: '/images/deco/deco-02.png',
        iconUrl: '/images/icon/icon-04.png',
        value: '365',
        unit: '+',
        title: '全年服务不打烊 365+',
        subTitle: '24 Hours',
      },
    ],
    []
  )

  return { data }
}
