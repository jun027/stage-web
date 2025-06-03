import { useMemo } from 'react'

export const CATEGORY_TYPE = 'sport'

export function useSportData() {
  const data = useMemo(
    () => [
      {
        id: `${CATEGORY_TYPE}-1`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: '熊貓體育',
        imgUrl: '/images/icon/icon-sport-panda.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-2`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'WG體育',
        imgUrl: '/images/icon/icon-sport-wg.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-3`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'Super體育',
        imgUrl: '/images/icon/icon-sport-super.png',
        link: '/',
      },
    ],
    []
  )

  return { data }
}
