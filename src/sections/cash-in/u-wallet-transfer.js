import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import initOrderAPI from '@/services/wallet/initOrder'

import { useTranslations } from 'next-intl'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'
import { RHFSelect } from '@/components/hook-form/rhf-select'
import { MenuItem } from '@mui/material'
import { U_PAY_TYPE } from './config/u-paytype-config'
import { paths } from '@/routes/paths'
import Link from 'next/link'

function UWalletTransfer() {
  const tButton = useTranslations('Button')
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const schema = z.object({
    amount: z.preprocess(
      (val) => Number(val),
      z
        .number({
          message: '請輸入正確格式',
        })
        .min(1, { message: '金額需大於 0' })
        .int({ message: '金額需為整數' })
    ),
    payType: z.string().min(1, { message: '請選擇付款方式' }),
  })

  const defaultValues = {
    amount: 0,
    payType: U_PAY_TYPE[0].value,
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        item_type: 'point',
        item_count: data.amount,
        amount: data.amount,
        pay_type: data.payType,
      }

      try {
        setApiIsLoadingTrue()

        const response = await initOrderAPI(payload)()
        if (response.url) {
          window.open(response.url, '_blank')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [setApiIsLoadingFalse, setApiIsLoadingTrue]
  )

  return (
    <div className="card">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
        <div className="flex flex-col items-stretch space-y-10 pb-10">
          <div className="space-y-2">
            {/* 付款金額 */}
            <div>
              <h5 className="text-212529 mb-[6px]">{`付款金額`}</h5>
              <RHFTextField
                disabled={apiIsLoading}
                fullWidth
                size="small"
                name="amount"
                InputLabelProps={{ shrink: true }}
              />
            </div>

            {/* 付款類別 */}
            <div>
              <h5 className="text-212529 mb-[6px]">{`付款類別`}</h5>
              <RHFSelect
                disabled={apiIsLoading}
                size="small"
                name="payType"
                InputLabelProps={{ shrink: true }}
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                {U_PAY_TYPE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </div>

          {/* 按鈕 */}
          <div className="flex flex-col items-center gap-y-6">
            <LoadingButton
              loading={apiIsLoading}
              type="submit"
              sx={{ color: '#fff' }}
              className="input-submit-button w-[300px]"
            >
              {tButton('DepositNow')}
            </LoadingButton>
            <Link
              target="_blank"
              href={paths.common.onlineCustomerService}
              className="text-sm leading-relaxed text-blue-600 inline-block"
            >
              {tButton('ContactCustomerService')}
            </Link>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(UWalletTransfer)
