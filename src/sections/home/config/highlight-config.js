import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export function useHighLightData() {
  const data = useMemo(
    () => [
      {
        id: uuid(),
        title: '极速存提转款',
        subTitle: 'FAST TRANSACTION',
        description: '存款、托售、转账超快速，入账无延迟。',
        imgUrl: '/images/highlight-01.png',
      },
      {
        id: uuid(),
        title: '最全娱乐体验',
        subTitle: '1000+ GAMES',
        description: '丰富的游戏种类，多样玩法。',
        imgUrl: '/images/highlight-02.png',
      },
      {
        id: uuid(),
        title: '支持所有行动设备',
        subTitle: 'SUPPORT FOR ALL DEVICES',
        description: '不管使用任何设备，让您娱乐投注随心所欲！',
        imgUrl: '/images/highlight-03.png',
      },
      {
        id: uuid(),
        title: '加密安全管理',
        subTitle: 'ALWAYS ON PROTECTION',
        description: '独家开发加密技术，资料保障最完善。',
        imgUrl: '/images/highlight-04.png',
      },
    ],
    []
  )

  return { data }
}
