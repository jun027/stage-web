'use client'

import React from 'react'

export default function ContactUsView() {
  return (
    <div className="p-6 rounded-lg ring-2 ring-gray-200 shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-[#265FFD]">联系我们</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-xl ">•Telegram</p>
          <ul className="pl-5">
            <li><a href="https://t.me/ublive_staffbot" class="text-blue-500 hover:underline">请点击我</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
