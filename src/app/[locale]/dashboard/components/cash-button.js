'use client'

import { Link, usePathname } from '@/navigation'
import clsx from 'clsx'
import Image from 'next/image'
import { memo } from 'react'

function CashButton({
  enableHover = false,
  enableFocus = false,
  id,
  link,
  buttonImgUrl,
  title,
  buttonHoverImgUrl,
}) {
  const pathname = usePathname()

  return (
    <Link key={id} href={link} className="flex flex-col items-center gap-y-2 group">
      <div className="w-[52px] relative drop-shadow-md">
        <Image
          className="aspect-square w-full h-full"
          src={buttonImgUrl}
          alt={title}
          width={70}
          height={70}
        />
        <Image
          className={clsx(
            'aspect-square w-full h-full absolute top-0 left-0 z-10 opacity-0 transition-opacity duration-300',
            {
              'group-hover:opacity-100': enableHover,
              'opacity-100': enableFocus && pathname === link,
            }
          )}
          src={buttonHoverImgUrl}
          alt={title}
          width={70}
          height={70}
        />
      </div>
      <p className="text-sm font-bold text-black opacity-70">{title}</p>
    </Link>
  )
}

export default memo(CashButton)
