import { Link } from '@/navigation'
import { memo } from 'react'

function UserUnLogin({ list }) {
  return (
    <div>
      {list.map((item) => (
        <Link key={item.id} href={item.href} className="px-4 py-2 text-white">
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default memo(UserUnLogin)
