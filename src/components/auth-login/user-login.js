'use client'

import CashButton from '@/app/[locale]/dashboard/components/cash-button'
import NavButton from '@/app/[locale]/dashboard/components/nav-button'
import { useCashConfig } from '@/app/[locale]/dashboard/config/cash-config'
import { useNavConfig } from '@/app/[locale]/dashboard/config/nav-config'
import { useAuthContext } from '@/auth/hooks'
import { useRouter } from '@/navigation'
import { paths } from '@/routes/paths'
import Image from 'next/image'
import recycleAPI from '@/services/game/recycle'
import { memo, useCallback, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import toast from 'react-hot-toast'

function UserLogin({ avatarImgUrl = '', name = 'unknown', vipLevel = 0, balance = 0 }) {
  const { fetchNewUserInfo } = useAuthContext()
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const { logout } = useAuthContext()

  const { data: cashData } = useCashConfig()
  const { data: navData } = useNavConfig()

  const handleAvatarClick = useCallback(() => {
    setOpenMenu(!openMenu)
  }, [openMenu])

  const handleFreshButtonClick = useCallback(async () => {
    try {
      const res = await recycleAPI()()
      const { message } = res
      toast.success(message)

      await fetchNewUserInfo()
    } catch (error) {
      console.error(error)
    }
  }, [fetchNewUserInfo])

  const handleLogout = useCallback(async () => {
    await logout()
    router.push(paths.home)
  }, [logout, router])

  return (
    <div className="relative">
      <div role="button" className="flex flex-row gap-x-3 items-center cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            className="w-full h-full aspect-square"
            src={avatarImgUrl || '/images/icon/icon-default-user-01.png'}
            alt="avatar"
            width={40}
            height={40}
          />
        </div>
        <div
          role="button"
          className="w-10 h-10 rounded-full overflow-hidden shadow-lg"
          onClick={handleFreshButtonClick}
        >
          <Image
            className="w-full h-full aspect-square"
            src={avatarImgUrl || '/images/buttons/fresh.png'}
            alt="avatar"
            width={64}
            height={64}
          />
        </div>
        <div role="button" className="text-white" onClick={handleAvatarClick}>
          <div className="flex flex-row items-center gap-x-2">
            <p>{name}</p>
            <p className="text-white border-white border px-2 rounded bg-[#5296FD]">{`VIP${vipLevel}`}</p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <p>{`$${balance}`}</p>
            <button>
              <IoIosArrowDown fontSize={14} />
            </button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="absolute bottom-0 translate-y-[102.5%] left-1/2 -translate-x-1/2 z-50 w-[243px] rounded-lg">
          <div className="card p-0 flex flex-col items-stretch gap-y-4">
            {/* 存點 / 轉點 / 託售 */}
            <div className="flex flex-row justify-evenly items-center px-2 pt-6 pb-0">
              {cashData.map((item) => (
                <CashButton key={item.id} enableHover {...item} />
              ))}
            </div>

            <div className="pb-6 flex flex-col gap-y-4">
              {/* 其他列表 */}
              <ul className="flex flex-col items-stretch gap-y-4">
                {navData.map((item) => (
                  <NavButton key={item.id} enableHover {...item} />
                ))}
              </ul>

              {/* 登出 */}
              <div className="w-full px-6">
                <button
                  className="border w-full rounded-full text-[#5296FD] border-[#5296FD] text-center py-2 hover:bg-[#69a3fb] hover:text-white duration-200"
                  onClick={handleLogout}
                >
                  登出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(UserLogin)
