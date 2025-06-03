import { gameList } from '@/apis/game'
import { CATEGORY_TYPE as LIVE_CATEGORY_TYPE } from '@/sections/common/config/live-config'
import { CATEGORY_TYPE as SPORT_CATEGORY_TYPE } from '@/sections/common/config/sport-config'
import { CATEGORY_TYPE as LOTTERY_CATEGORY_TYPE } from '@/sections/common/config/lottery-config'
import { CATEGORY_TYPE as ElECTRONIC_CATEGORY_TYPE } from '@/sections/common/config/electronic-config'
import { filter, includes, map, pipe, prop } from 'ramda'

// eslint-disable-next-line import/no-anonymous-default-export
export default (originalDataList) => async () => {
  // eslint-disable-next-line no-undef
  const [liveData, sportData, lotteryData, electronicData] = await Promise.all([
    gameList({ game_type: LIVE_CATEGORY_TYPE }),
    gameList({ game_type: SPORT_CATEGORY_TYPE }),
    gameList({ game_type: LOTTERY_CATEGORY_TYPE }),
    gameList({ game_type: ElECTRONIC_CATEGORY_TYPE }),
  ])

  const resultGameList = [
    ...(liveData.list || []),
    ...(sportData.list || []),
    ...(lotteryData.list || []),
    ...(electronicData.list || []),
  ]

  const formattedGameList = pipe(
    filter((item) => includes(item.agent_id, originalDataList.map(prop('agentId')))),
    map((item) => originalDataList.find((original) => original.agentId === item.agent_id))
  )(resultGameList)

  return formattedGameList
}
