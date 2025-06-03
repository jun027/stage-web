'use client'

import { memo, useCallback } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useAuthContext } from '@/auth/hooks'
import firstDepositAPI from '@/services/bonus/firstDeposit'

function PromoAdBlock({ imageUrl, children }) {
  const { user } = useAuthContext()

  const handleApplyButtonClick = useCallback(async () => {
    if (!user) {
      toast.error('請先登入')
      return
    }

    const { message } = await firstDepositAPI()()

    if (message) {
      toast.success(message)
    }
  }, [user])

  return (
    <div className="bg-white border border-dark-400 rounded-2xl overflow-hidden">
      <Image
        className="w-full aspect-[841/263] relative z-10"
        src={imageUrl}
        alt="activity-01"
        width={1682}
        height={526}
      />
      <div
        className={`transition-all duration-700 ease-in-out transform 'max-h-[800px] opacity-100' overflow-hidden`}
      >
        <div className="bg-white p-6 rounded ">
          <h3 className="text-[#FF3B30] text-xl font-bold">• 新户首存优惠赠 50%</h3>
          <div className="pl-6 text-dark-900">
            <br />
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动期限：</h4>
              <ul className="list-disc pl-5">
                <li>即日起至2099/12/31</li>
              </ul>
            </div>
            <br />
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动内容：</h4>
              <ul className="list-disc pl-5">
                <li>Ur新户首存优惠赠50%</li>
                <br />
                <li>新加入Ur会员享有首次存款赠送50%彩金</li>
                <br />
                <li>立即开启你的第一次加密货币娱乐体验</li>
                <br />
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl">参加方式：</h4>
              <ul className="list-disc pl-5">
                <li>赠送彩金上限200U赠100U</li>
                <br />
                <li>彩金流水计算方式：(本金+彩金)*22倍</li>
                <br />
                <li>
                  例如：存款200U赠送彩金100U，需投注(200+100)X22=等等算U以上方可申请托售(对冲投注不计有效投注额)
                </li>
                <br />
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl">活动规则：</h4>
              <ul className="list-disc pl-5">
                <li>
                  领取彩金需绑定钱包地址完成，并于第一次存款后24小时内且未下注前与Ur官方客服申请，投注后视同弃优惠。
                </li>
                <br />
                <li>
                  此优惠活动只适用于同一位会员，若有团体或个人使用不当手段或任何无风险投注，本平台将取消领取资格。
                </li>
                <br />
                <li>
                  每位会员、每一钱包地址、每一电话号码、相同支付地址及电脑环境、ip位址，仅限领取一次。{' '}
                </li>
                <br />
                <li>
                  若有以上违反条款之会员，本平台有权终止会员的登录，暂停会员使用网站和没收奖金及盈利的权利，无须特别通知，本平台保有对活动的最终解释权。{' '}
                </li>
                <br />
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl">重要提醒：</h4>
              <ul className="list-disc pl-5">
                <li>为保障活动公平性，请勿使用任何试图绕过规则、以非正常手段获取保险金的方式。</li>
                <br />
                <li>本平台将严格审查所有活动申请，并保留随时修改或取消活动资格的权利。</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-10 pt-0">
          <button
            className="px-6 py-2 text-fff rounded-lg bg-common01 hover:opacity-80 duration-200"
            onClick={handleApplyButtonClick}
          >
            优惠申请
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(PromoAdBlock)
