'use client'

import { Link } from '@/navigation'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
import { useHeaderNavData } from './config-navigation-header'
import { paths } from '@/routes/paths'

export default function Navbar() {
  const { navData } = useHeaderNavData()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    console.log('isMenuOpen', isMenuOpen)
  }

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

  return (
    <div className="flex flex-row items-center gap-4">
      {/* Logo */}
      <Link href={paths.home}>
        <div className="w-[200px]">
          <Image
            priority
            className="aspect-[200/60] w-full h-full"
            src={'/images/nav-logo-01.png'}
            alt="logo"
            width={404}
            height={121}
          />
        </div>
      </Link>

      {/* Mobile */}
      {isMobile ? (
        <button
          className="block lg:hidden text-white focus:outline-none ml-0 mr-auto"
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </button>
      ) : (
        <nav aria-label="Global">
          <ul className="relative">
            {navData.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative inline-block group"
              >
                <Link href={item.href} className="px-4 py-2 text-white">
                  {item.label}
                </Link>

                {hoveredNav === item.id && item.previewImages && (
                  <div className="absolute mt-2 p-4 bg-white shadow-lg rounded-lg z-50">
                    <div className="flex flex-row justify-center space-x-4">
                      {item.previewImages &&
                        Array.isArray(item.previewImages) &&
                        item.previewImages.length > 0 &&
                        item.previewImages.map((imgSrc, index) => (
                          <div key={index} className="flex flex-col items-center w-[160px]">
                            <Image
                              src={imgSrc}
                              alt={`${item.label} ${index + 1}`}
                              width={240}
                              height={270}
                              className="object-cover"
                            />
                            <p className="text-gray-700 text-lg font-semibold mt-2">
                              {item.games[index]}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
      {isMenuOpen && (
        <nav
          className={`lg:flex ${
            isMobile ? 'block' : 'hidden'
          } lg:block absolute lg:relative top-full left-0 right-0 bg-blue-500 lg:bg-transparent z-50 lg:static`}
          aria-label="Global"
        >
          <ul className="lg:flex flex-col lg:flex-row">
            {navData.map((item) => (
              <li key={item.id} className="px-4 py-2 text-white">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
