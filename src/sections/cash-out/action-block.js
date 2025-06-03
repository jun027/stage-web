'use client'

import { memo, useCallback } from 'react'
import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { InputAdornment, MenuItem, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'
import withdrawAPI from '@/services/wallet/withdraw'
import toast from 'react-hot-toast'
import { U_PAY_TYPE } from '../cash-in/config/u-paytype-config'
import { RHFSelect } from '@/components/hook-form/rhf-select'
import CashOutLimitBlock from './cash-out-limit-block'

function ActionBlock({ children }) {
  const t = useTranslations('Dashboard.CashOut')
  const tErrorTips = useTranslations('Dashboard.CashOut.ErrorTips')
  const tPlaceholder = useTranslations('Dashboard.CashOut.Placeholder')
  const tButton = useTranslations('Button')

  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const schema = z.object({
    account: z
      .string()
      .min(1, { message: '請輸入區塊鏈錢包地址' })
      .regex(/^[a-zA-Z0-9]+$/, { message: '只允許輸入英文和數字' }),
    payType: z.string().min(1, { message: '請選擇付款類別' }),
    amount: z.preprocess(
      (val) => Number(val),
      z
        .number({
          message: tErrorTips('EnterCorrectFormat'),
        })
        .min(10, { message: tErrorTips('MinimumSalesAmount') })
    ),
  })

  const defaultValues = {
    account: '',
    payType: U_PAY_TYPE[0].value,
    amount: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { reset, handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        acc_no: data.account,
        withdraw_type: data.payType,
        amount: data.amount,
      }

      try {
        setApiIsLoadingTrue()
        const { message } = await withdrawAPI(payload)()
        toast(message)
        reset()
      } catch (error) {
        console.log('[error] ', error)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [reset, setApiIsLoadingFalse, setApiIsLoadingTrue]
  )

  const handleGetAll = useCallback(() => {
    console.log('[handleGetAll]')
  }, [])

  return (
    <div className="card flex flex-col gap-y-4">
      {/* 標題 */}
      <div>
        <h3 className="text-xl text-212529">{t('CashOut')}</h3>
        <p className="text-sm text-gray-400">{t('CashOutAmountDescription')}</p>
      </div>

      {/* 託售次數訊息 */}
      {children}

      {/* 託售流水限制 */}
      <CashOutLimitBlock />

      {/* 表單 */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
        <div className="flex flex-col gap-y-4">
          {/* 區塊鏈錢包地址 */}
          <div className="flex flex-row gap-x-4">
            <RHFTextField
              disabled={apiIsLoading}
              name="account"
              placeholder={t('Placeholder.CashOutWalletAddressPlaceholder')}
              type="text"
              size="small"
              sx={{ width: '300px' }}
            />
          </div>

          {/* 付款類別 */}
          <div>
            <RHFSelect
              disabled={apiIsLoading}
              sx={{ width: '300px' }}
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

          {/* 託售金額 */}
          <div className="flex flex-row gap-x-4">
            <RHFTextField
              disabled={apiIsLoading}
              name="amount"
              placeholder={tPlaceholder('CashOutAmountPlaceholder')}
              type="text"
              size="small"
              sx={{ width: '300px' }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        sx={{ cursor: apiIsLoading ? 'not-allowed' : 'pointer' }}
                        align="right"
                        color={apiIsLoading ? '#e4e4e4' : '#5396FD'}
                        onClick={handleGetAll}
                      >
                        {tButton('All')}
                      </Typography>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          {/* 提示文字 */}
          <p className="text-[#FF3B2F]">{`(${t('ButtonTips')})`}</p>

          {/* 按鈕 */}
          <LoadingButton
            loading={apiIsLoading}
            sx={{ color: '#fff' }}
            type="submit"
            className="bg-button w-[300px] text-white rounded-lg py-2"
          >
            {tButton('WithdrawNow')}
          </LoadingButton>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(ActionBlock)
