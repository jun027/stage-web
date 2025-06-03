import { memo, useCallback } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { CATEGORY_TYPE as LIVE_CATEGORY_TYPE } from '@/sections/common/config/live-config'
import { CATEGORY_TYPE as SPORT_CATEGORY_TYPE } from '@/sections/common/config/sport-config'
import { CATEGORY_TYPE as LOTTERY_CATEGORY_TYPE } from '@/sections/common/config/lottery-config'
import { CATEGORY_TYPE as ElECTRONIC_CATEGORY_TYPE } from '@/sections/common/config/electronic-config'
import { useAuthContext } from '@/auth/hooks'
import toast from 'react-hot-toast'
import joinGameAPI from '@/services/game/joinGame'
import { useBoolean } from '@/hook/use-boolean'

function EnterGameBtn({ id, agentId, title, imgUrl, type }) {
  const { user, logout } = useAuthContext()
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const handleGameOnClick = useCallback(
    async (e) => {
      const agentId = e.currentTarget.getAttribute('data-agent-id')

      if (!user) {
        toast.error('請先登入')
        return
      }

      try {
        setApiIsLoadingTrue()
        const response = await joinGameAPI({ agent_id: Number(agentId) })()
        const { url } = response
        if (url) {
          window.open(url, '_blank')
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('請重新登入')
          logout()
        }
        console.error(error)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [logout, setApiIsLoadingFalse, setApiIsLoadingTrue, user]
  )

  return (
    <button
      disabled={apiIsLoading}
      key={id}
      className="flex flex-col gap-y-2"
      onClick={handleGameOnClick}
      data-agent-id={agentId}
    >
      <div
        className={clsx(
          'rounded-xl border-white w-[78px] aspect-square',
          type === LIVE_CATEGORY_TYPE && 'bg-live-button',
          type === SPORT_CATEGORY_TYPE && 'bg-sport-button',
          type === LOTTERY_CATEGORY_TYPE && 'bg-lottery-button',
          type === ElECTRONIC_CATEGORY_TYPE && 'bg-electronic-button'
        )}
      >
        <Image className="w-full h-full" src={imgUrl} alt={title} width={78} height={78} />
      </div>
      <p className="text-4d4d4d text-base font-bold text-center w-full">{title}</p>
    </button>
  )
}

export default memo(EnterGameBtn)
