import MainLayout from '@/layouts/main'
import { CarouselView } from '../carousel-view'
import { ContextView } from '../context-view'

export default function HomeView() {
  return (
    <MainLayout>
      <CarouselView />
      <ContextView />
    </MainLayout>
  )
}
