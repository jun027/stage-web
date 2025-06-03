import MainLayout from '@/layouts/main'
import { useSideBarData } from './config/sidebar-config'
import SideBar from './components/side-bar'

export const metadata = {
  title: 'Ur 娛樂城 - 優惠活動',
}

export default function Layout({ children }) {
  const { data } = useSideBarData()

  return (
    <MainLayout>
      <div
        className="aspect-[1920/650] w-full"
        style={{
          backgroundImage: `url('/images/bg-bonus-01.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="pb-56">
        <div className="max-w-full mx-auto px-4 lg:px-10">
          <div className="p-6 lg:p-10 rounded-[32px] shadow-card flex flex-col lg:flex-row gap-6 lg:gap-20 min-h-[600px] lg:min-h-[920px]">
            <SideBar data={data} />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
