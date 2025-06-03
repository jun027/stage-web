'use client'

import PropTypes from 'prop-types'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useLocale } from 'next-intl'
import { zhCN, zhTW } from 'date-fns/locale'

// ----------------------------------------------------------------------

export default function LocalizationProvider({ children }) {
  const locale = useLocale()

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={locale === 'zh-CN' ? zhCN : zhTW}
    >
      {children}
    </MuiLocalizationProvider>
  )
}

LocalizationProvider.propTypes = {
  children: PropTypes.node,
}
