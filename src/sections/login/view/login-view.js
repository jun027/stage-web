'use client'

import { memo, useCallback, useState } from 'react'
import { Link, useRouter } from '@/navigation'
import { paths } from '@/routes/paths'
import { loginTextFieldStyle } from '@/style/login-textfield'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'

import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'
import { useAuthContext } from '@/auth/hooks'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'

function LoginView() {
  const t = useTranslations('Auth.Login')
  const tErrorTips = useTranslations('Auth.Login.ErrorTips')
  const tButton = useTranslations('Button')
  const { login } = useAuthContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo')
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const schema = z.object({
    username: z.string().min(1, { message: tErrorTips('EnterAccount') }),
    password: z.string().min(1, { message: tErrorTips('EnterPassword') }),
  })

  const defaultValues = {
    username: '',
    password: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      try {
        setApiIsLoadingTrue()
        await login?.(data.username, data.password)
        router.push(returnTo || paths.home)
      } catch (error) {
        console.error('[onSubmitButtonClick] error: ', error)
        reset()
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [login, reset, returnTo, router, setApiIsLoadingFalse, setApiIsLoadingTrue]
  )

  return (
    <div className="px-[50px] pt-[100px] pb-8 rounded-[40px] bg-[#181818] bg-auth-panel border-white border-[10px] border-opacity-20 w-[480px]">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
        <Stack direction={'column'} gap={2}>
          <RHFTextField
            disabled={apiIsLoading}
            name="username"
            placeholder={t('EnterAccount')}
            type="text"
            sx={{ ...loginTextFieldStyle }}
          />
          <RHFTextField
            disabled={apiIsLoading}
            name="password"
            placeholder={t('EnterPassword')}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <MdVisibilityOff color="#50C7FF" />
                      ) : (
                        <MdOutlineVisibility color="#50C7FF" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ ...loginTextFieldStyle }}
          />
          <Stack
            width={'100%'}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            py={0.5}
          >
            <FormControlLabel
              disabled={apiIsLoading}
              control={<Checkbox />}
              label={
                <Typography sx={{ userSelect: 'none' }} color={'#ffffff5a'}>
                  {t('RememberPassword')}
                </Typography>
              }
            />
          </Stack>

          <LoadingButton
            type="submit"
            loadingPosition="start"
            loading={apiIsLoading}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: '1rem',
              py: 2,
              background:
                'linear-gradient(0deg, rgba(38,78,158,1) 0%, rgba(16,60,142,1) 28%, rgba(5,147,239,1) 100%);',
            }}
          >
            <Typography fontSize={'1.125rem'}>{tButton('Login')}</Typography>
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Stack width={'100%'} direction={'row'} justifyContent={'center'} my={'4.5rem'}>
        <Typography color={'#ffffff5a'}>{`${t('NoAccount')}？`}</Typography>
        <Link href={paths.auth.signup}>
          <Typography color={'#50C7FF'}>{t('RegisterNewAccount')}</Typography>
        </Link>
      </Stack>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
        <Link className="text-[#ffffff5a] px-8 py-4" href={paths.home}>
          {t('BrowseFirst')}
        </Link>
        <Link
          target="_blank"
          className="text-[#50C7FF] px-8 py-4"
          href={paths.common.onlineCustomerService}
        >
          {t('OnlineCustomerService')}
        </Link>
      </Stack>
    </div>
  )
}

export default memo(LoginView)
