import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import LocalizationProvider from '@/locales/localization-provider'
import { AuthProvider } from '@/auth/context/jwt'

export const metadata = {
  title: 'Ur 娛樂城',
  description:
    'Ur娛樂城是全球領先的USDT加密貨幣娛樂平台，擁有超過1000種賭場遊戲，包括百家樂、體育博彩、SLOT等。平台提供虛擬貨幣質押服務，保障合法性、安全性與快速性。',
  keywords: 'Ur 娛樂城, 加密貨幣娛樂平台, USDT, 百家樂, 體育博彩, SLOT',
}

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages()

  return (
    <html lang={locale} className="font-noto-sans-tc">
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <LocalizationProvider>{children}</LocalizationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: 'top-right',
          }}
        />
      </body>
    </html>
  )
}
