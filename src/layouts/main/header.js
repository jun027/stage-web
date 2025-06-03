import { memo } from 'react'
// import LangButton from '@/components/languageButton/lang-button'
import Navbar from './navbar'
import UserStatus from './user-status'

function Header() {
  return (
    <header className="bg-gradient-header relative">
      <div className="max-w-[1300px] mx-auto px-4 py-2 flex items-center justify-between">
        <Navbar />
        <div className="flex items-center gap-4">
          <UserStatus />
          {/* <LangButton /> */}
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
