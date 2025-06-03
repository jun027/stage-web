import React from 'react'
import MoreBtn from '../../components/components/more-btn'
import { useTranslations } from 'next-intl'

function DepositRecordBlock({ title, value, type, date }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-lg text-212529 font-bold">{title}</h3>
        <p className="text-lg text-gray-400">{value}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg text-gray-400">{type}</p>
        <p className="text-lg text-gray-400">{date}</p>
      </div>
    </div>
  )
}

function DepositRecordSection({ title, list }) {
  const tButton = useTranslations('Button')

  return (
    <div className="card flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-212529">{title}</p>
        <MoreBtn title={tButton('More')} />
      </div>
      <div className="flex flex-col gap-y-4">
        {list.map(
          (item, index) => (
            <React.Fragment key={item.id}>
              <DepositRecordBlock
                title={item.title}
                value={item.value}
                type={item.type}
                date={item.date}
              />
              {index !== list.length - 1 && <div className="w-full h-[1px] bg-gray-400" />}
            </React.Fragment>
          ),
          []
        )}
      </div>
    </div>
  )
}

export default DepositRecordSection
