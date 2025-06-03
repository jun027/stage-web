import { redirect } from '@/navigation'
import { paths } from '@/routes/paths'
import { PromotionsView } from '@/sections/promotions/view'

export default function PromotionsPage() {
  redirect(paths.promotions.allPromotions)

  return <PromotionsView />
}
