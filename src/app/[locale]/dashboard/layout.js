import MainLayout from '@/layouts/main'
import Image from 'next/image'
import { useCashConfig } from './config/cash-config'
import { useNavConfig } from './config/nav-config'
import CashButton from './components/cash-button'
import NavButton from './components/nav-button'
import AuthGuard from '@/auth/guard/auth-guard'

export const metadata = {
  title: 'Ur 娛樂城 - 儀表板',
}

export default function Layout({ children }) {
  const { data: cashData } = useCashConfig()
  const { data: navData } = useNavConfig()

  return (
    <AuthGuard>
      <MainLayout>
        <div className="bg-[#EFF0F6] ">
          <div className="max-w-[1355px] pt-4 pb-8 mx-auto px-10 flex flex-row gap-x-4 min-h-[calc(100dvh-76px-208px)]">
            <aside className="w-[243px] py-6 rounded-lg shadow-dashboard-sidebar flex flex-col items-stretch gap-y-9 bg-white">
              <div className="flex flex-col gap-y-6 px-6">
                {/* 頭像 */}
                <div className="flex flex-col items-center gap-y-1">
                  <div className="w-[70px]">
                    <Image
                      className="aspect-square w-full h-full"
                      src="/images/avatar-image-01.png"
                      alt="avatar"
                      width={70}
                      height={70}
                    />
                  </div>
                  <p className="text-xs bg-vip rounded-md w-9 h-[22px] flex justify-center items-center text-fff">
                    VIP
                  </p>
                  <p className="text-808080 text-sm">加入 Ur 娛樂城第 0 天</p>
                </div>

                {/* 存點 / 轉點 / 託售 */}
                <div className="flex flex-row justify-evenly items-center">
                  {cashData.map((item) => (
                    <CashButton key={item.id} enableFocus enableHover {...item} />
                  ))}
                </div>
              </div>

              {/* 其他列表 */}
              <ul className="flex flex-col items-stretch gap-y-4">
                {navData.map((item) => (
                  <NavButton key={item.id} enableFocus enableHover {...item} />
                ))}
              </ul>
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  )
}
