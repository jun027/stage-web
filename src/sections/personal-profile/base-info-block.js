'use client'

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { memo, useEffect, useMemo, useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { parseISO } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/auth/hooks'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'

function BaseInfoBlock({
  name: propName,
  nickName: propNickName,
  sex: propSex,
  birthday: propBirthday,
  registerDate = '1990-01-01 00:00:00',
  username = '尚無資料',
}) {
  const { updateUser } = useAuthContext()
  const t = useTranslations('Dashboard.PersonalProfile')
  const tPlaceholder = useTranslations('Dashboard.PersonalProfile.Placeholder')
  const tButton = useTranslations('Button')
  const locale = useLocale()
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const originData = useMemo(
    () => ({
      name: propName,
      nickName: propNickName,
      sex: propSex,
      birthday: propBirthday,
    }),
    [propBirthday, propName, propNickName, propSex]
  )

  const [name, setName] = useState(propName)
  const [nickName, setNickName] = useState(propNickName)
  const [sex, setSex] = useState(propSex)
  const [birthday, setBirthday] = useState(propBirthday || parseISO('1970-01-01'))

  const handleNameChange = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const handleNickNameChange = useCallback((e) => {
    setNickName(e.target.value)
  }, [])

  const handleSexChange = useCallback((e) => {
    setSex(e.target.value)
  }, [])

  const handleChange = useCallback((newValue) => {
    setBirthday(newValue)
  }, [])

  useEffect(() => {
    setName(propName)
  }, [propName])

  useEffect(() => {
    setNickName(propNickName)
  }, [propNickName])

  useEffect(() => {
    setSex(propSex)
  }, [propSex])

  useEffect(() => {
    setBirthday(propBirthday)
  }, [propBirthday])

  const handleUpdateButtonClick = useCallback(async () => {
    setApiIsLoadingTrue()
    await updateUser(name, nickName, sex, birthday)
    toast.success('更新成功')
    setApiIsLoadingFalse()
  }, [birthday, name, nickName, setApiIsLoadingFalse, setApiIsLoadingTrue, sex, updateUser])

  const handleCancelButtonClick = useCallback(() => {
    setName(originData.name)
    setNickName(originData.nickName)
    setSex(originData.sex)
    setBirthday(originData.birthday)
  }, [originData])

  return (
    <div className="card">
      <h3 className="text-xl text-212529 font-bold">{t('BasicInformation')}</h3>
      <p className="w-full h-[1px] bg-gray-200 my-3" />
      <div className="flex flex-col gap-y-6">
        {/* 帳號 */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <FormLabel htmlFor="base-info-account" sx={{ width: '84px', color: '#000' }}>
            {`${t('Account')}：`}
          </FormLabel>
          <TextField
            disabled
            id="base-info-account"
            fullWidth
            sx={{ maxWidth: '400px' }}
            type="text"
            size="small"
            value={username}
          />
        </FormControl>

        {/* 真實姓名 */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <FormLabel htmlFor="base-info-name" sx={{ width: '84px', color: '#000' }}>
            {`${t('RealName')}：`}
          </FormLabel>
          <TextField
            disabled={apiIsLoading}
            id="base-info-name"
            fullWidth
            sx={{ maxWidth: '400px' }}
            placeholder={tPlaceholder('NameBankAccountMatch')}
            type="text"
            size="small"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>

        {/* 暱稱 */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <FormLabel htmlFor="base-info-nick-name" sx={{ width: '84px', color: '#000' }}>
            {`暱稱：`}
          </FormLabel>
          <TextField
            disabled={apiIsLoading}
            id="base-info-nick-name"
            fullWidth
            sx={{ maxWidth: '400px' }}
            placeholder={'請輸入暱稱'}
            type="text"
            size="small"
            value={nickName}
            onChange={handleNickNameChange}
          />
        </FormControl>

        {/* 性別 */}
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <FormLabel sx={{ width: '84px', color: '#000' }}>{`${t('Sex')}：`}</FormLabel>
          <RadioGroup row value={sex} onChange={handleSexChange}>
            <FormControlLabel disabled={apiIsLoading} value="M" control={<Radio />} label="男" />
            <FormControlLabel disabled={apiIsLoading} value="F" control={<Radio />} label="女" />
          </RadioGroup>
        </FormControl>

        {/* 出生日期 */}
        <Stack direction="row" gap={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '84px' }}>
            <Typography>{`${t('DateOfBirth')}：`}</Typography>
          </Box>
          <DesktopDatePicker
            disabled={apiIsLoading}
            inputFormat="yyyy/MM/dd"
            value={birthday}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField fullWidth sx={{ maxWidth: '400px' }} size="small" {...params} />
            )}
          />
        </Stack>

        {/* 註冊日期 */}
        <Stack direction="row" gap={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '84px' }}>
            <Typography>{`${t('RegistrationDate')}：`}</Typography>
          </Box>
          <Typography>
            {new Date(registerDate).toLocaleString(locale, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </Typography>
        </Stack>
      </div>
      <p className="w-full h-[1px] bg-gray-200 my-3" />
      <div className="flex justify-end gap-x-3">
        <Button
          disabled={apiIsLoading}
          variant="outlined"
          size="large"
          sx={{
            py: 1.5,
            px: 4.75,
            borderRadius: '999px',
          }}
          onClick={handleCancelButtonClick}
        >
          {tButton('Cancel')}
        </Button>
        <LoadingButton
          loading={apiIsLoading}
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            px: 4.75,
            borderRadius: '999px',
            background: 'linear-gradient(180deg, rgba(166,209,255,1) 0%, rgba(0,123,255,1) 100%)',
          }}
          onClick={handleUpdateButtonClick}
        >
          {tButton('Update')}
        </LoadingButton>
      </div>
    </div>
  )
}

export default memo(BaseInfoBlock)
