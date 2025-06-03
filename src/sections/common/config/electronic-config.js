import { useMemo } from 'react'

export const CATEGORY_TYPE = 'elect'

export function useElectronicData() {
  const data = useMemo(
    () => [
      {
        id: `${CATEGORY_TYPE}-1`,
        agentId: 9,
        type: CATEGORY_TYPE,
        title: 'GB電子',
        imgUrl: '/images/icon/icon-elect-gb.png',
        link: '/',
      },
      {
        id: `${CATEGORY_TYPE}-2`,
        agentId: 14,
        type: CATEGORY_TYPE,
        title: 'RSG電子',
        imgUrl: '/images/icon/icon-elect-rsg.png',
        link: '/',
      },
    ],
    []
  )

  return { data }
}
