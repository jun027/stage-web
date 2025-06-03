import { Link } from '@/navigation'

export function MarqueeView({ title, link }) {
  return (
    <div className="h-12 rounded-3xl bg-fff relative shadow-xl flex items-center">
      <div className="px-9 h-12 flex items-center text-fff font-bold text-xl rounded-3xl bg-common01 shadow-common01">
        {title}
      </div>
      <div className="flex-1 px-2 overflow-hidden">
        <p className="font-bold text-343A40 whitespace-nowrap">{`[ 重要公告】 客服联系方式 【重要公告】 请会员认明正版官网网址 【重要公告】 客服联系方式 【重要公告】 请会员认明正版官网网址 【重要公告】 请会员认明正版官网网址`}</p>
      </div>
      <div className="pr-2">
        <Link href={link} className="px-4 h-8 bg-common01 flex items-center rounded-2xl text-fff">
          更多
        </Link>
      </div>
    </div>
  )
}
