'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import PromoFourAdBlock from '../components/PromoFour-ad-block'

export default function Freeten() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="space-y-3">
      <div onClick={toggleVisibility} className="cursor-pointer">
        {!isVisible ? (
          <Image
            className="w-full aspect-[841/263] relative z-10"
            src="/images/promotions/activity-04.png"
            alt="Promotion Image"
            width={1682}
            height={526}
          />
        ) : (
          <PromoFourAdBlock imageUrl="/images/promotions/activity-04.png" />
        )}
      </div>
    </div>
  )
}
