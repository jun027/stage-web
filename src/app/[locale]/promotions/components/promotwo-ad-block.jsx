'use client'

import { memo } from 'react'
import Image from 'next/image'
import { useAuthContext } from '@/auth/hooks'

function PromoTwoAdBlock({ imageUrl, children }) {
  const { user } = useAuthContext()

  return (
    <div className="bg-white border border-dark-400 rounded-2xl overflow-hidden">
      <Image
        className="w-full aspect-[841/263] relative z-10"
        src={imageUrl}
        alt="activity-02"
        width={1682}
        height={526}
      />
      <div
        className={`transition-all duration-700 ease-in-out transform 'max-h-[800px] opacity-100' overflow-hidden`}
      >
        <div className="bg-white p-6 rounded ">
          <h3 className="text-[#FF3B30] text-xl font-bold">•全馆返水最高1%</h3>
          <div className="pl-6 text-dark-900">
            <br />
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动期限：</h4>
              <ul className="list-disc pl-5">
                <li>即日起至2025/12/31</li>
              </ul>
              <br />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动内容：</h4>
              <ul className="list-disc pl-5">
                <li>UR会员享有每日返水无上限</li>
                <br />
                <li>
                在UR返水福利只需投注一倍流水！ ！ ！
                </li>
                <br />
                <li>
                会员等级依照您三个月内的全馆投注量决定，您在UR近三个月的投注量将决定后续三个月的等级福利。
                </li>
                <br />
                <li>派发时间：每日(UTC+0)0:00-1:00前系统自动派发前日有效投注量之返水</li>
                <br />
              </ul>
              <div className="space-y-2">
              <h4 className="font-bold text-xl">参加方式：</h4>
              <ul className="list-disc pl-5">
                <li>
                加入我们的官方Telegram频道，并向客服人员提交申请资料，即可获得注册豪礼！
                </li>
                <br />
                <li>
                  <a
                    href="https://t.me/ublive_staffbot"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    官方ＴＧ
                  </a>
                </li>
              </ul>
              <br />
              <div className="space-y-2">
                <h4 className="font-bold text-xl">活动规则：</h4>
                <ul className="list-disc pl-5">
                  <li>本优惠仅限每位会员每日参加一次，禁止同一会员使用多帐户或团体进行申请。</li>
                  <br />
                  <li>
                    若发现任何团体或个人利用不当手段或无风险投注（如对冲投注、假性投注）等方式获取保险返还，本平台有权取消其申请资格。
                  </li>
                  <br />
                  <li>
                    本平台所有优惠活动专为个别会员而设，若有发现任何团体或个人以不诚实方式套取红利，或其他违反规范的行为，本平台保留冻结、取消该团体或个人帐户及帐户结余的权利。
                  </li>
                  <br />
                  <li>
                    本平台有权终止违规会员的登录权限，暂停使用网站服务并没收奖金及盈利，无须另行通知。
                  </li>
                  <br />
                  <li>
                    如有违反上述条款之情形，本平台保有活动最终解释权，并有权立即采取相关行动。
                  </li>
                  <br />
                  <li>
                    本活动优惠不可与其他优惠活动同时使用，若需进行活动申请变更，请联系官方客服。
                  </li>
                  <br />
                  <li>
                    若会员帐户出现异常行为（如：非正常频率的投资操作），本平台将进行风控审查，期间将暂停会员的活动资格，并保留最终决定权。
                  </li>
                </ul>
                <br />
                <div className="space-y-2">
                  <h4 className="font-bold text-xl">重要提醒：</h4>
                  <ul className="list-disc pl-5">
                    <li>
                    全馆仅« 彩票游戏 »不计算每日全馆投注返水之范围
                    </li>
                    <br />
                    <li>游戏返水需1倍码量即可托售。</li>
                    <br />
                    <li>若有团体或个人使用不当手段或任何无风险投注遭确认为异常投注，该区间之注单将不列入计算。</li>
                    <br />
                    <li>此优惠活动只适用于同一位会员，若有团体或个人使用不当手段或任何无风险投注，本平台将取消领取资格。</li>
                    <br />
                    <li>本平台所有优惠活动专为会员所设，若发现任何团体或个人,以不诚实方式套取红利，或任何威胁,滥用公司优惠等行为，本平台保留冻结,取消该团体或个人帐户及帐户结余权利。</li>
                    <br />
                    <li>若有以上违反条款之会员，本平台有权终止会员的登录，暂停会员使用网站和没收奖金及盈利的权利，无须特别通知，本平台保有对活动的最终解释权。</li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
            <div className="pt-6">
              <Image
                className="max-w-xs w-full h-auto"
                src="/images/promotions/rebate-01.png"
                alt="VIP"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PromoTwoAdBlock)
