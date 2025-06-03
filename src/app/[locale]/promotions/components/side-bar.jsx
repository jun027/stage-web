'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/navigation'
import Button from './button'
import clsx from 'clsx'

function SideBar({ data }) {
  const t = useTranslations('Category.Promotions')
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef(null)

  // 判斷是否為手機裝置
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let isScrolling // 用於檢測滾動狀態
  let scrollThreshold = 100 // 設置一個阈值，當接近邊界時才處理

  return (
    <aside className={clsx(isMobile ? 'w-full' : 'w-[200px] flex flex-col items-stretch gap-y-12')}>
      <h3 className="text-484D66 text-4xl font-bold text-center">{t('Title')}</h3>

      {/* 手機模式：水平滾動 */}
      {isMobile ? (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar whitespace-nowrap py-2"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {data.map((item, index) => (
            <Button
              key={`${item.id}-${index}`}
              className={clsx(
                'inline-block shadow-sidebar rounded-full text-343A40 hover:bg-[#489ffb] hover:text-fff hover:font-bold duration-200 px-2 py-1 mx-1 text-xs',
                item.link === pathname && 'bg-[#489ffb] text-fff font-bold'
              )}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      ) : (
        // 桌面模式：垂直排列
        <div className="flex flex-col gap-y-6">
          {data.map((item, index) => (
            <Button
              key={`${item.id}-${index}`}
              className={clsx(
                'w-full shadow-sidebar rounded-full text-343A40 hover:bg-[#489ffb] hover:text-fff hover:font-bold duration-200',
                item.link === pathname && 'bg-[#489ffb] text-fff font-bold'
              )}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      )}
    </aside>
  )
}

export default memo(SideBar)
