'use client'

import React, { useState } from 'react'
import { useRouter } from '@/navigation'
import Image from 'next/image'

export default function SideMenu() {
  const [activeMenu, setActiveMenu] = useState(null)
  const router = useRouter()

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }

  const navigateTo = (path) => {
    router.push(path)
  }

  return (
    <div className="max-h-[700px] p-3 rounded-lg border border-gray-200 shadow-lg text-xl flex flex-col items-center space-y-4">
      <ul>
        <li className="mb-4">
          <button
            onClick={() => toggleMenu('faq')}
            className="flex items-center w-full p-3 hover:text-blue-500"
          >
            <Image src="/images/icon/icon-faq.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>常见问题
            <Image
              src="/images/icon/icon-arrow.png"
              alt="Icon"
              width={15}
              height={15}
              className="ml-4"
            />
          </button>
          {activeMenu === 'faq' && (
            <ul className="ml-4">
              <li
                className=" cursor-pointer mb-2 hover:text-blue-500 text-center ml-5 "
                onClick={() => navigateTo('FAQ')}
              >
                注册/登录
              </li>
              <li
                className=" cursor-pointer mb-2 hover:text-blue-500 text-center ml-5 "
                onClick={() => navigateTo('Deposit')}
              >
                充值/托售
              </li>
              <li
                className=" cursor-pointer mb-2 hover:text-blue-500 text-center ml-5"
                onClick={() => navigateTo('Promotions')}
              >
                优惠/其他
              </li>
            </ul>
          )}
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigateTo('PrivacyPolicy')}
            className="flex items-center w-full  p-3 hover:text-blue-500"
          >
            <Image src="/images/icon/icon-privacypolicy.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>隐私条款
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigateTo('TermsOfService')}
            className="flex items-center w-full  p-3 hover:text-blue-500"
          >
            <Image src="/images/icon/icon-termsofservice.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>服务条款
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigateTo('Disclaimer')}
            className="flex items-center w-full  p-3  hover:text-blue-500"
          >
            <Image src="/images/icon/icon-disclaimer.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>免责声明
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigateTo('AboutUs')}
            className="flex items-center w-full  p-3  hover:text-blue-500"
          >
            <Image src="/images/icon/icon-aboutus.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>关于我们
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => navigateTo('ContactUs')}
            className="flex items-center w-full  p-3  hover:text-blue-500"
          >
            <Image src="/images/icon/icon-contactus.png" alt="Icon" width={60} height={60} />
            <span className="mr-2"></span>联系我们
          </button>
        </li>
      </ul>
    </div>
  )
}
