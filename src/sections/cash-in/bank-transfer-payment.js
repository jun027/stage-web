'use client'

import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { memo, useCallback } from 'react'
import { useTranslations } from 'next-intl'

function BankTransferPayment() {
  const t = useTranslations('Dashboard.CashIn')
  const tPlaceholder = useTranslations('Dashboard.CashIn.Placeholder')
  const tButton = useTranslations('Button')

  const defaultMoneyValueList = [
    { label: `$200`, value: 200 },
    { label: `$1000`, value: 1000 },
    { label: `$2000`, value: 2000 },
    { label: `$5000`, value: 5000 },
    { label: `$10000`, value: 10000 },
  ]

  const schema = z.object({
    money: z.preprocess(
      (val) => Number(val),
      z
        .number({
          message: t('ErrorTips.EnterCorrectFormat'),
        })
        .min(188, { message: t('ErrorTips.ValueGreaterThan188') })
        .max(200000, { message: t('ErrorTips.ValueLessThan200000') })
    ),
  })

  const defaultValues = {
    money: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { reset, handleSubmit, setValue } = methods

  const onSubmitButtonClick = useCallback(
    (data) => {
      console.log('[onSubmitButtonClick] data: ', data)
      reset()
    },
    [reset]
  )

  const handleMoneyValueClick = useCallback(
    (e) => {
      const moneyValue = e.currentTarget.getAttribute('data-value')
      setValue('money', Number(moneyValue))
    },
    [setValue]
  )

  return (
    <div className="flex flex-col gap-y-6">
      <div className="shadow-card px-6 py-4 bg-white rounded-lg">
        <p className="text-sm text-[#ff3b30]">{t('TransferInstructions')}</p>
      </div>
      <FormProvider
        className="relative"
        methods={methods}
        onSubmit={handleSubmit(onSubmitButtonClick)}
      >
        <div className="shadow-card px-6 py-4 bg-white rounded-lg flex flex-col gap-y-6 items-start">
          <h5 className=" text-212529">{t('DepositAmount')}</h5>
          <div className="flex gap-x-4">
            {defaultMoneyValueList.map((item) => (
              <button
                key={item.value}
                type="button"
                className="text-sm text-212529 leading-relaxed py-2 px-7 rounded-md bg-[#F2F2F7] hover:bg-[#e6e6e6] duration-200"
                data-value={item.value}
                onClick={handleMoneyValueClick}
              >
                {item.label}
              </button>
            ))}
          </div>
          <RHFTextField
            name="money"
            placeholder={tPlaceholder('DepositAmountPlaceholder')}
            type="text"
            size="small"
            sx={{ width: '300px' }}
          />
          <button type="submit" className="input-submit-button w-[300px]">
            {tButton('DepositNow')}
          </button>
          <a href="tel:555-555-5555" className="text-sm leading-relaxed text-blue-600 inline-block">
            {tButton('ContactCustomerService')}
          </a>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(BankTransferPayment)
