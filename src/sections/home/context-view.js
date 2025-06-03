import { MarqueeView } from './components/marquee'
import { HighLightBlock } from './components/high-light-block'
import { useHighLightData } from './config/highlight-config'
import { useHotGameData } from './config/hot-game.config'
import { HotGameBlock } from './components/hot-game-block'

import { EnterGameBlock } from './components/enter-game-block'
import CustomerServiceButton from './components/customerservicebutton'

export function ContextView() {
  const { data: highLightData } = useHighLightData()
  const { data: hotGameData } = useHotGameData()

  return (
    <div className="pt-9 pb-48">
      <div className="lg:max-w-[1260px] max-w-2xl mx-auto px-4">
        <MarqueeView title={'最新公告'} content={'123'} link={'/'} />

        <div className="flex flex-col gap-y-24 mt-32">
          {/* 熱門遊戲-1 */}
          <EnterGameBlock />

          {/* 熱門遊戲-2 */}
          <div className="relative flex flex-col items-center justify-between rounded-[32px] shadow-home-frame p-11 pt-28">
            <div className="w-full lg:w-auto max-w-96 lg:max-w-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-10 flex flex-col items-center mb-24 bg-fff py-2 px-12 rounded-xl">
              <h3 className="text-62AFFF font-bold text-[40px]">热门游戏</h3>
              <p className="text-41425E text-base font-bold">TOP 1000+ GAMES</p>
              <p className="text-41425E text-base font-bold text-center">
                你想要的你想要的Ur娱乐城都有，千万玩家首选娱乐平台
              </p>
            </div>
            <div className="flex flex-wrap justify-evenly gap-16">
              {hotGameData.map((item) => (
                <HotGameBlock key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* 賣點 */}
          <div className="flex flex-row flex-wrap gap-x-[1%] gap-y-4">
            {highLightData.map((item) => (
              <div key={item.id} className="lg:w-[49.5%] w-full">
                <HighLightBlock
                  imgUrl={item.imgUrl}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomerServiceButton />
    </div>
  )
}
