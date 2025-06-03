import React from 'react';
import MainLayout from '@/layouts/main'
import SideMenu from '@/layouts/main/sidemenu';

export default function Layout({ children }) {
  return (
    <MainLayout>
      <div className="pb-56">
        <div className="max-w-full mx-auto px-4 lg:px-10">
          <div className="p-6 lg:p-10 rounded-[32px] flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-[600px] lg:min-h-[720px]">
          <SideMenu></SideMenu>
          <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
