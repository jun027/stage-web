import { useMemo } from 'react'

export const CATEGORY_TYPE = 'lottery'

export function useLotteryData() {
  const data = useMemo(
    () => [
      {
        id: `${CATEGORY_TYPE}-1`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'DB彩票',
        imgUrl: '/images/icon/icon-lottery-db.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-2`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'WG彩票',
        imgUrl: '/images/icon/icon-lottery-wg.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-3`,
        agentId: 7,
        type: CATEGORY_TYPE,
        title: 'MT彩票',
        imgUrl: '/images/icon/icon-lottery-mt.png',
        link: '/',
      },
    ],
    []
  )

  return { data }
}
