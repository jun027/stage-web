'use client'

import { memo } from 'react'
import Image from 'next/image'
import { useAuthContext } from '@/auth/hooks'

function PromoFourAdBlock({ imageUrl, children }) {
  const { user } = useAuthContext()

  return (
    <div className="bg-white border border-dark-400 rounded-2xl overflow-hidden">
      <Image
        className="w-full aspect-[841/263] relative z-10"
        src={imageUrl}
        alt="activity-04"
        width={1682}
        height={526}
      />
      <div
        className={`transition-all duration-700 ease-in-out transform 'max-h-[800px] opacity-100' overflow-hidden`}
      >
        <div className="bg-white p-6 rounded ">
          <h3 className="text-[#FF3B30] text-xl font-bold">•注册豪礼 - 免费10U等你拿！</h3>
          <div className="pl-6 text-dark-900">
            <br />
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动期限：</h4>
              <ul className="list-disc pl-5">
                <li>即日起至2025/12/31</li>
              </ul>
            </div>
            <br />
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动内容：</h4>
              <ul className="list-disc pl-5">
                <li>
                新会员专属福利！注册即送10U红利，让你轻松体验更多游戏乐趣。完成注册后，只需联系我们的客服人员申请，即可获得此奖励！红利金可用于游戏投注，满足最低投注流水即可进行提现。快来加入，享受专属的新人礼遇！
                </li>
              </ul>
              <br />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl">参加方式：</h4>
              <ul className="list-disc pl-5">
                <li>加入我们的官方Telegram频道，并向客服人员提交申请资料，即可获得注册豪礼！</li>
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
                  <li>本优惠仅限每位会员参加一次，禁止同一会员使用多帐户或团体进行重复申请。</li>
                  <br />
                  <li>
                  若发现任何团体或个人利用不当手段或无风险投注（如对冲投注、假性投注）等方式获取红利，本平台有权取消其申请资格。
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
                      为保障活动公平性，请勿使用任何试图绕过规则、以非正常手段获取保险金的方式。
                    </li>
                    <br />
                    <li>本平台将严格审查所有活动申请，并保留随时修改或取消活动资格的权利。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PromoFourAdBlock)
