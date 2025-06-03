'use client'

import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RHFSelect } from '@/components/hook-form/rhf-select'
import { Button, MenuItem, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { startOfToday, endOfToday, startOfYesterday, endOfYesterday, subDays } from 'date-fns'
import betRecordsAPI from '@/services/member/betRecords'
import { NearDateButtons } from '@/components/nearDateButtons'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'

function SearchBlock({ onDataChange }) {
  const mockBetTypeOptions = useMemo(
    () => [
      {
        value: 'live',
        label: '真人',
      },
      {
        value: 'sport',
        label: '體育',
      },
      {
        value: 'lottery',
        label: '彩票',
      },
      {
        value: 'elect',
        label: '電子',
      },
    ],
    []
  )

  const [startDate, setStartDate] = useState(startOfToday())
  const [endDate, setEndDate] = useState(endOfToday())
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const handleStartDateChange = useCallback((newValue) => {
    setStartDate(newValue)
  }, [])
  const handleEndDateChange = useCallback((newValue) => {
    setEndDate(newValue)
  }, [])

  const schema = z.object({
    betType: z.string({
      message: '請選擇投注類型',
    }),
  })

  const defaultValues = {
    betType: mockBetTypeOptions[0].value,
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { reset, handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        game_type: data.betType,
        start_date: startDate,
        end_date: endDate,
      }

      try {
        setApiIsLoadingTrue()
        const response = await betRecordsAPI(payload)()
        onDataChange(response)
      } catch (error) {
        console.error(error)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [endDate, onDataChange, setApiIsLoadingFalse, setApiIsLoadingTrue, startDate]
  )

  const handleResetButtonClick = useCallback(() => {
    reset()
    setStartDate(startOfToday())
    setEndDate(endOfToday())
  }, [reset])

  const handleOnTodayClick = useCallback(() => {
    setStartDate(startOfToday())
    setEndDate(endOfToday())
  }, [])

  const handleOnYesterdayClick = useCallback(() => {
    setStartDate(startOfYesterday())
    setEndDate(endOfYesterday())
  }, [])

  const handleOnLast7DaysClick = useCallback(() => {
    setStartDate(subDays(startOfToday(), 7))
    setEndDate(endOfToday())
  }, [])

  const handleOnLast30DaysClick = useCallback(() => {
    setStartDate(subDays(startOfToday(), 30))
    setEndDate(endOfToday())
  }, [])

  return (
    <div className="card">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
        <div className="flex flex-col gap-y-4">
          <div>
            <h3 className="text-xl text-212529">投注記錄</h3>
            <p className="text-gray-400">當前系統支持查詢最近30日的交易紀錄</p>
          </div>

          {/* 查詢條件 */}
          <div className="flex flex-col gap-y-4">
            {/* 日期 */}
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-14">日期：</div>
              <div className="flex-1 flex flex-row items-center gap-x-3 max-w-[472px]">
                <DesktopDatePicker
                  disabled={apiIsLoading}
                  inputFormat="yyyy/MM/dd"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ flex: 1 }} size="small" {...params} />
                  )}
                />
                {' - '}
                <DesktopDatePicker
                  disabled={apiIsLoading}
                  inputFormat="yyyy/MM/dd"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ flex: 1 }} size="small" {...params} />
                  )}
                />
              </div>
            </div>

            {/* 日期選擇 */}
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-14" />
              <NearDateButtons
                disabled={apiIsLoading}
                onTodayClick={handleOnTodayClick}
                onYesterdayClick={handleOnYesterdayClick}
                onLast7DaysClick={handleOnLast7DaysClick}
                onLast30DaysClick={handleOnLast30DaysClick}
              />
            </div>

            {/* 投注類型 */}
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-14">類型：</div>
              <div className="flex-1 flex flex-row items-center gap-x-3 max-w-[472px]">
                <RHFSelect
                  disabled={apiIsLoading}
                  sx={{ flex: 1, maxWidth: '472px' }}
                  size="small"
                  name="betType"
                  InputLabelProps={{ shrink: true }}
                  PaperPropsSx={{ textTransform: 'capitalize' }}
                >
                  {mockBetTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
            </div>
          </div>

          {/* 查詢按鈕 */}
          <div className="flex flex-row gap-x-3">
            <LoadingButton
              loading={apiIsLoading}
              type="submit"
              variant="contained"
              sx={{
                px: '1.5rem',
                borderRadius: 999,
                background:
                  'linear-gradient(180deg, rgba(166,209,255,1) 0%, rgba(0,123,255,1) 100%)',
              }}
            >
              查詢
            </LoadingButton>
            <Button
              disabled={apiIsLoading}
              variant="outlined"
              sx={{
                px: '1.5rem',
                borderRadius: 999,
              }}
              onClick={handleResetButtonClick}
            >
              重置
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(SearchBlock)
