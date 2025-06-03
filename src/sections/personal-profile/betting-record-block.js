import React from 'react'
import MoreBtn from '../../components/components/more-btn'
import { useTranslations } from 'next-intl'

function BettingRecordBlock({ title, validBet, winLossRatio }) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-lg font-bold text-212529">{title}</p>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-row justify-between">
          <p className="text-212529">{`有效投注 ${validBet}`}</p>
          <p className="text-212529">{`輸/贏 ${winLossRatio}`}</p>
        </div>
      </div>
    </div>
  )
}

function BettingRecordSection({ title, list, onClick = () => {} }) {
  const tButton = useTranslations('Button')

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{title}</p>
        <MoreBtn title={tButton('More')} onClick={onClick} />
      </div>
      <div className="flex flex-col gap-y-4">
        {Object.keys(list).map((type, index) => (
          <React.Fragment key={type}>
            <BettingRecordBlock
              title={type}
              validBet={list[type].totalEffectBet}
              winLossRatio={list[type].totalWinLose}
            />
            {index !== Object.keys(list).length - 1 && (
              <div className="h-[1px] w-full bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default BettingRecordSection
