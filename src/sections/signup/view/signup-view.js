'use client'

import { memo, useCallback, useState } from 'react'
import { Link, useRouter } from '@/navigation'
import { paths } from '@/routes/paths'
import { loginTextFieldStyle } from '@/style/login-textfield'
import {
  Button,
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
import { useTranslations } from 'next-intl'
import signupAPI from '@/services/auth/signup'
import validatorAPI from '@/services/auth/validator'
import toast from 'react-hot-toast'
import { useBoolean } from '@/hook/use-boolean'
import { LoadingButton } from '@mui/lab'

function SignupView() {
  const t = useTranslations('Auth.SignUp')
  const tErrorTips = useTranslations('Auth.SignUp.ErrorTips')
  const tButton = useTranslations('Button')
  const router = useRouter()
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const schema = z
    .object({
      username: z.string().min(1, { message: 'EnterUsername' }), // TODO: 修正語系（真實名稱）
      nickName: z.string().min(1, { message: 'EnterNickName' }), // TODO: 修正語系（暱稱）
      name: z.string().min(1, { message: 'EnterNickName' }), // TODO: 修正語系（名稱）
      email: z.string().email({ message: tErrorTips('EnterCorrectEmail') }),
      verificationCode: z.string().min(1, { message: tErrorTips('EnterVerificationCode') }),
      promoCode: z.string(), // TODO: 修正語系（推薦碼）
      password: z.string().min(1, { message: tErrorTips('EnterPassword') }),
      confirmPassword: z.string().min(1, { message: tErrorTips('EnterConfirmPassword') }),
      isAdult: z.boolean().refine((data) => data === true, {
        message: tErrorTips('CheckOver18'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tErrorTips('PasswordMismatch'),
      path: ['confirmPassword'],
    })

  const defaultValues = {
    username: '',
    nickName: '',
    name: '',
    email: '',
    verificationCode: '',
    promoCode: '',
    password: '',
    confirmPassword: '',
    isAdult: false,
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods

  const username = watch('username')
  const email = watch('email')

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        username: data.username.trim(),
        password: data.password.trim(),
        email: data.email.trim(),
        validate_code: data.verificationCode.trim(),
        nickname: data.nickName.trim(),
        name: data.name.trim(),
        promo_code: data.promoCode.trim() === '' ? null : data.promoCode.trim(),
        register_type: 'account',
        tg_id: null,
      }

      try {
        setApiIsLoadingTrue()
        const response = await signupAPI(payload)()
        if (response) {
          toast.success('注册成功')
          router.push(paths.auth.login)
          reset()
        }
      } catch (error) {
        console.log('[onSubmitButtonClick] error: ', error)
      } finally {
        setApiIsLoadingFalse()
      }
    },
    [reset, router, setApiIsLoadingFalse, setApiIsLoadingTrue]
  )

  const handleGetCode = useCallback(async () => {
    if (username === '' || email === '') {
      toast.error('获取验证码需要账号和邮箱')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('邮箱格式错误')
      return
    }

    // Username 只能包含大小寫英文及數字
    const usernameRegex = /^[a-zA-Z0-9]+$/
    if (!usernameRegex.test(username)) {
      toast.error('账号只能包含大小写英文字母和数字')
      return
    }

    try {
      const response = await validatorAPI({
        username,
        valid_type: 'email',
        valid_value: email,
      })()

      const { message } = response
      toast.success(message)
    } catch (error) {
      console.log('[handleGetCode] error: ', error)
    }
  }, [email, username])

  return (
    <div className="px-10 pt-10 pb-8 rounded-[40px] bg-[#181818] bg-auth-panel border-white border-[10px] border-opacity-20 w-[480px]">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
        <Stack direction={'column'} gap={2} mb={4}>
          <RHFTextField
            disabled={apiIsLoading}
            name="username"
            placeholder={'账号'} // TODO: 修正語系（帳號）
            type="text"
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="nickName"
            placeholder={'昵称'} // TODO: 修正語系（暱稱）
            type="text"
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="name"
            placeholder={'真实姓名'} // TODO: 修正語系（名稱）
            type="text"
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="email"
            placeholder={t('Email')}
            type="email"
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="verificationCode"
            placeholder={t('VerificationCode')}
            type="text"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button disabled={apiIsLoading} onClick={handleGetCode}>
                      <Typography sx={{ cursor: 'pointer' }} align="right" color={'#50C7FF'}>
                        {t('GetVerificationCode')}
                      </Typography>
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="promoCode"
            placeholder={'推薦碼'} // TODO: 修正語系（推薦碼）
            type="text"
            sx={{ ...loginTextFieldStyle }}
          />

          <RHFTextField
            disabled={apiIsLoading}
            name="password"
            placeholder={t('Password')}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={apiIsLoading}
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

          <RHFTextField
            disabled={apiIsLoading}
            name="confirmPassword"
            placeholder={t('ConfirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={apiIsLoading}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
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

          <Stack>
            <FormControlLabel
              disabled={apiIsLoading}
              control={<Checkbox {...register('isAdult')} />}
              label={
                <Typography sx={{ userSelect: 'none' }} color={'#ffffff5a'}>
                  {t('IAmOver18YearsOld')}
                </Typography>
              }
            />
            {errors.isAdult?.message && (
              <Typography mt={'3px'} mx={'12px'} variant="caption" style={{ color: '#d32f2f' }}>
                {errors.isAdult?.message}
              </Typography>
            )}
          </Stack>
          <LoadingButton
            loading={apiIsLoading}
            loadingPosition="start"
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: '1rem',
              py: 2,
              background:
                'linear-gradient(0deg, rgba(38,78,158,1) 0%, rgba(16,60,142,1) 28%, rgba(5,147,239,1) 100%);',
            }}
          >
            <Typography fontSize={'1.125rem'}>{tButton('SignUp')}</Typography>
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
        <Link className="text-[#50C7FF] px-8 py-4" href={paths.auth.login}>
          {`${t('AlreadyHaveAnAccount')}？`}
        </Link>
        <Link className="text-[#ffffff5a] px-8 py-4" href={paths.home}>
          {t('BrowseFirst')}
        </Link>
      </Stack>
    </div>
  )
}

export default memo(SignupView)
