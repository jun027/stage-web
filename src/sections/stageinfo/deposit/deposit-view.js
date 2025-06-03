'use client'

import React from 'react'

export default function DepositView() {
  return (
    <div className="p-6 rounded-lg ring-2 ring-gray-200 shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-[#265FFD]">充值/托售</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-xl ">•托售问题</p>
          <ul className="pl-5">
            <li>1. 我们提供24小时全天候提款服务，财务部门审核完毕后一般约两分钟内快速到账。</li>
            <br />
            <li>2. 托售必须完成充值的一倍流水量后方可提出申请（充值流水量为1:1，例如：充值1000点，流水量即为1000点），活动及优惠的流水量请参照客服专员或平台公布为准。</li>
          </ul>
          <br />
          <p className="font-semibold text-xl ">•充值问题</p>
          <ul className="pl-5">
            <li>您好，您可以在首页点击充值，选择您要使用的方式，如：超商代码缴费 / 虚拟ATM转账 / 或是银行账号充值。充值5000点以上请使用银行账号，最高可充值49万点哦。</li>
            <br />
          </ul>
        </div>
        <p className="font-semibold text-xl ">•金流部公告通知</p>
        <ul className="pl-5">
          <li>1. 托售金额最低为500点</li>
          <br />
          <li>2. 会员单日托售限额最高为49万点</li>
          <br />
          <li>3. VIP会员当日最高托售196万点</li>
          <br />
        </ul>
        <p className="font-semibold text-xl ">•取款规则说明</p>
        <ul className="pl-5">
          <li>1. 会员账户当日提款次数为2次，当日最高49万点，且不收取提款手续费。</li>
          <br />
          <li>2. 点数提款单一绑定账户最高申请额度为49万点。</li>
          <br />
          <li>3. 点数大额提款50万点（含）以上至196万点（含）上限，请绑定四个以上银行账户，并将金额点平均分配至各账户分别提出，（例：托售196万点，四个账户各49万点）。</li>
          <br />
          <li>4. USDT每日托售限提一次，且USDT托售因应币安官方更新，每次交易收取流动手续费，本平台建议以银行卡方式进行托售，若您选择USDT托售，手续费需自行承担。</li>
          <br />
        </ul>
        <p className="font-semibold text-xl ">•代理问题</p>
        <ul className="pl-5">
          <li>请问我的代理是谁？怎么联系？</li>
          <br />
          <li>您好，请您向『 <a href="https://t.me/ublive_staffbot" class="text-blue-500 hover:underline">客服咨询</a> 』，亲切的客服会为您联系的哦。</li>
          <br />
        </ul>
        <p className="font-semibold text-xl ">•请问我是否能转线呢？</p>
        <ul className="pl-5">
          <li>您好，平台转线规则如下：</li>
          <br />
          <li>1. 25日内未充值及游戏</li>
          <br />
          <li>2. 达成以上条件即可联系您预定的新代理帮您申请哦！</li>
        </ul>
      </div>
    </div>
  )
}
