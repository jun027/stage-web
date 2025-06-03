import ActionBlock from '../action-block'
import ActionInfoBlock from '../action-info-block'
import BaseInfoBlock from '../base-info-block'
import CashOutRecord from '../cash-out-record'
import TransactionRecordBlock from '../transaction-record-block'

export default function CashOutView() {
  return (
    <div className="flex flex-row gap-x-4">
      <div className="flex-1 flex flex-col gap-y-4">
        <BaseInfoBlock />
        <ActionBlock>
          <ActionInfoBlock />
        </ActionBlock>
      </div>
      <div className="w-[296px] flex flex-col gap-y-4">
        <TransactionRecordBlock />
      </div>
    </div>
  )
}
