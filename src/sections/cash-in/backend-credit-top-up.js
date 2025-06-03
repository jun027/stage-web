import { memo, useCallback } from 'react'
import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { useTranslations } from 'next-intl'
import adminPaymentAPI from '@/services/wallet/adminPayment'
import toast from 'react-hot-toast'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'

function BackendCreditTopUp() {
  const t = useTranslations('Dashboard.CashIn')
  const tButton = useTranslations('Button')
  const tErrorTips = useTranslations('Dashboard.CashIn.ErrorTips')
  const tPlaceholder = useTranslations('Dashboard.CashIn.Placeholder')
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const schema = z.object({
    username: z.string().min(1, { message: tErrorTips('EnterCorrectMemberAccount') }),
    amount: z.preprocess(
      (val) => Number(val),
      z
        .number({
          message: tErrorTips('EnterCorrectFormat'),
        })
        .min(1, { message: tErrorTips('EnterCorrectTopUpAmount') })
    ),
  })

  const defaultValues = {
    username: '',
    amount: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { reset, handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      try {
        setApiIsLoadingTrue()
        const response = await adminPaymentAPI(data)()
        reset()
        toast.success(response.message)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [reset, setApiIsLoadingFalse, setApiIsLoadingTrue]
  )

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-card min-h-[430px]">
      <FormProvider
        className="relative"
        methods={methods}
        onSubmit={handleSubmit(onSubmitButtonClick)}
      >
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="member-account" className="text-212529">
                {t('MemberAccount')}
              </label>
              <RHFTextField
                disabled={apiIsLoading}
                name="username"
                placeholder={tPlaceholder('MemberAccountPlaceholder')}
                type="text"
                size="small"
                sx={{ width: '300px' }}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="member-money" className="text-212529">
                {t('TopUpAmount')}
              </label>
              <RHFTextField
                disabled={apiIsLoading}
                name="amount"
                placeholder={tPlaceholder('TopUpAmountPlaceholder')}
                type="text"
                size="small"
                sx={{ width: '300px' }}
              />
            </div>
          </div>
          <LoadingButton
            loading={apiIsLoading}
            sx={{ color: '#fff' }}
            type="submit"
            className="input-submit-button w-[300px]"
          >
            {tButton('Confirm')}
          </LoadingButton>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(BackendCreditTopUp)
