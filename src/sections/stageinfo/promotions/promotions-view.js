'use client'

import React from 'react'

export default function PromotionsView() {
  return (
    <div className="p-6 rounded-lg ring-2 ring-gray-200 shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-[#265FFD]">优惠/其他</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-xl ">•优惠资讯</p>
          <ul className="pl-5">
            <li>详情请参上方阅优惠活动</li>
          </ul>
          <br />
          <p className="font-semibold text-xl ">•修改问题</p>
          <ul className="pl-5">
            <li>您好，您可以点击右下角的「我的」，进入您的会员中心自行修改密码哦。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
