import { useMemo } from 'react'

export const CATEGORY_TYPE = 'live'

export function useLiveData() {
  const data = useMemo(
    () => [
      {
        id: `${CATEGORY_TYPE}-1`,
        agentId: 1,
        type: CATEGORY_TYPE,
        title: 'MT 真人',
        imgUrl: '/images/icon/icon-realPerson-mt.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-2`,
        agentId: 13,
        type: CATEGORY_TYPE,
        title: 'DG 真人',
        imgUrl: '/images/icon/icon-realPerson-dg.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-3`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'SA 真人',
        imgUrl: '/images/icon/icon-realPerson-sa.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-4`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: '新歐博真人',
        imgUrl: '/images/icon/icon-realPerson-allbet.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-5`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'WM 真人',
        imgUrl: '/images/icon/icon-realPerson-wm.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-6`,
        agentId: null,
        type: CATEGORY_TYPE,
        title: 'DB 真人',
        imgUrl: '/images/icon/icon-realPerson-db.png',
        link: '/',
      },
    ],
    []
  )

  return { data }
}
