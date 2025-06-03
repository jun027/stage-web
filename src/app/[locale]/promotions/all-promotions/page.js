'use client'
import FirstDeposit from '../components/first-deposit'
import Rebate from '../components/rebate'
import Comeback from '../components/comeback'
import Freeten from '../components/freeten'
export default function AllPromotions() {
  return (
    <div className="space-y-3">
      <FirstDeposit />
      <Freeten />
      <Comeback />
      <Rebate />
    </div>
  )
}
