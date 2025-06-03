import Image from 'next/image'

export default function AuthLayout({ children }) {
  return (
    <div
      className="flex items-center justify-center h-dvh min-h-[1000px]"
      style={{
        backgroundImage: `url('/images/bg-auth-01.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        {/* logo */}
        <div className="w-[199px] mx-auto mb-9">
          <Image
            className="aspect-[404/121] w-full h-full"
            src="/images/nav-logo-01.png"
            alt="logo"
            width={404}
            height={121}
          />
        </div>

        {/* 表單 Context */}
        {children}
      </div>
    </div>
  )
}
