import { Box, Stack, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function AccountSecurityBlock({ phone = null, email = null }) {
  const t = useTranslations('Dashboard.PersonalProfile')
  const tButton = useTranslations('Button')

  return (
    <div className="card">
      <h3 className="text-xl text-212529 font-bold">{t('AccountSecurity')}</h3>
      <p className="w-full h-[1px] bg-gray-200 my-3" />
      <div className="flex flex-col gap-y-6">
        {/* 手機號碼 */}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '84px' }}>
              <Typography>{`${t('PhoneNumber')}：`}</Typography>
            </Box>
            <Typography>{phone || '無資料'}</Typography>
          </Stack>
          <Box
            width={'76.86px'}
            height={'44.25px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography>{tButton('Bound')}</Typography>
          </Box>
        </Stack>

        {/* 電子信箱 */}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '84px' }}>
              <Typography>{`${t('Email')}：`}</Typography>
            </Box>
            <Typography>{email || '無資料'}</Typography>
          </Stack>
          <Box
            width={'76.86px'}
            height={'44.25px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography>{tButton('Bound')}</Typography>
          </Box>
        </Stack>
      </div>
    </div>
  )
}

export default memo(AccountSecurityBlock)
