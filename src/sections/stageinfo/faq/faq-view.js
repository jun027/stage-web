'use client'

import React from 'react'

export default function FaqView() {
  return (
    <div className="p-6 rounded-lg ring-2 ring-gray-200 shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-[#265FFD]">注册/登录</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-xl ">•如何注册</p>
          <ul className="pl-5">
            <li>
            您好，请点击右上角的注册按钮，然后在屏幕下方选择注册，输入您的手机号码。稍等片刻，系统会通过短信发送验证码给您，输入完成后即可成功注册！若未收到验证码，请联系在线客服，我们将立即为您处理。
            </li>
          </ul>
          <br />
          <p className="font-semibold text-xl ">•游戏卡顿</p>
          <ul className="pl-5">
            <li>
            您好，由于真人视讯游戏对网速要求较高，为避免影响您的游戏体验，请先访问
              <a href="https://fast.com/zh/tw/" target="_blank" className="text-blue-500">
                https://fast.com/zh/tw/
              </a>
              测试您的网络速度。如果网速低于2Mbps，建议等待网络信号和速度提升后再进入真人视讯游戏。
            </li>
          </ul>
        </div>
        <p className="font-semibold text-xl ">•登录问题</p>
        <ul className="pl-5">
          <li>
          您好，若您忘记密码，请进入登录页面，输入您的账号并点击「忘记密码」，按照提示进行验证并重置密码。提醒您，请妥善保管好您的密码。
          </li>
        </ul>
      </div>
    </div>
  )
}
