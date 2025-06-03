'use client'

import { memo, useCallback, useState } from 'react'
import { useLocale } from 'next-intl'
import clsx from 'clsx'
import { useRouter, usePathname } from '@/navigation'

function LangButton() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [currentLang, setCurrentLang] = useState(locale === 'zh-CN' ? 2 : 1)

  const handleTWClick = useCallback(() => {
    setCurrentLang(1)
    router.push(pathname, { locale: 'zh-TW' })
  }, [pathname, router])

  const handleCNClick = useCallback(() => {
    setCurrentLang(2)
    router.push(pathname, { locale: 'zh-CN' })
  }, [pathname, router])

  return (
    <div className="w-[104px] h-9 rounded-full border-[#94A3B8] bg-[#F4F7FA] border-2 flex gap-x-4 justify-center items-center relative">
      <button
        className={clsx('relative z-20', currentLang === 1 ? 'text-fff' : 'text-[#94A3B8]')}
        onClick={handleTWClick}
      >
        繁體
      </button>
      <button
        className={clsx('relative z-20', currentLang === 2 ? 'text-fff' : 'text-[#94A3B8]')}
        onClick={handleCNClick}
      >
        简体
      </button>
      <div
        className={clsx(
          'absolute duration-100 top-1/2 -translate-y-1/2 z-10 w-12 h-7 rounded-full bg-button',
          currentLang === 1 ? 'left-[2px] right-auto' : 'left-auto right-[2px]'
        )}
      />
    </div>
  )
}

export default memo(LangButton)
