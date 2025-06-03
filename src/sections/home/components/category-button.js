import { Link } from '@/navigation'

export function CategoryButton({ title = '無', link = '/', bgColor = 'fff' }) {
  return (
    <Link
      style={{ backgroundColor: bgColor }}
      className="block rounded-3xl  text-fff shadow-common01 px-6 py-3"
      href={link}
    >
      {title}
    </Link>
  )
}
