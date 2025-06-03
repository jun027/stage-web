'use client'

import { Link, usePathname } from '@/navigation'
import clsx from 'clsx'
import Image from 'next/image'
import { memo } from 'react'

function NavButton({
  enableHover = false,
  enableFocus = false,
  link,
  buttonImgUrl,
  title,
  buttonHoverImgUrl,
}) {
  const pathname = usePathname()

  return (
    <li
      className={clsx('py-1 px-6 relative group duration-100', {
        'bg-[#E3EEFE]': enableFocus && pathname === link,
        'hover:bg-[#E3EEFE]': enableHover,
      })}
    >
      <div
        className={clsx('w-1 h-full bg-blue-400 absolute top-0 left-0 z-10 opacity-0', {
          'opacity-100': enableFocus && pathname === link,
          'group-hover:opacity-100': enableHover,
        })}
      />
      <Link className="flex flex-row items-center gap-x-5 group" href={link}>
        <div className="relative w-12 drop-shadow-md">
          <Image
            className="aspect-square w-full h-full"
            src={buttonImgUrl}
            alt={title}
            width={96}
            height={96}
          />
          <Image
            className={clsx(
              'aspect-square w-full h-full absolute top-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )}
            src={buttonHoverImgUrl}
            alt={title}
            width={96}
            height={96}
          />
        </div>
        <p
          className={clsx(
            'text-sm font-bold opacity-70 transition-colors duration-100 text-212529',
            {
              'text-blue-500': enableFocus && pathname === link,
              'group-hover:text-blue-500': enableHover,
            }
          )}
        >
          {title}
        </p>
      </Link>
    </li>
  )
}

export default memo(NavButton)
