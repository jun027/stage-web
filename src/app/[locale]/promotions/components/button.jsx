import { Link } from '@/navigation'

export default function Button({ title = '', link = '/', ...other }) {
  return (
    <div {...other}>
      <Link href={link} className="flex justify-center items-center gap-x-2 py-4 px-11">
        <span className="text-lg  text-center">{title}</span>
      </Link>
    </div>
  )
}
