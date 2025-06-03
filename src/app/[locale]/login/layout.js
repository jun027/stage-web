import AuthLayout from '@/layouts/auth'

export const metadata = {
  title: 'Ur 娛樂城',
}

export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>
}
