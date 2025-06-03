'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Carousel() {
  const images = [
    '/images/cover-banner-01.png',
    '/images/cover-banner-02.png',
    '/images/cover-banner-03.png',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex, images.length])

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-full aspect-[1920/600] relative">
      <Image
        src={images[currentIndex]}
        alt={`carousel-${currentIndex}`}
        fill
        className="object-cover"
      />

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/50 w-6 h-6 rounded-full shadow"
        onClick={handlePrevious}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/50 w-6 h-6 rounded-full shadow"
        onClick={handleNext}
      >
        &gt;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
