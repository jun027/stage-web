'use client'

import React, { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { paths } from '@/routes/paths'

function Footer() {
  const t = useTranslations('Layout.Footer')

  return (
    <footer className="py-16 bg-252525 text-fff flex flex-col justify-center items-center ">
      <div className="max-w-[787px] mx-auto px-8 ">
        <div className="flex justify-center flex-row gap-5 mb-10">
          <Link href={paths.footer.FAQ} className="text-sm text-white hover:text-gray-500">
            {t('FAQ')}
          </Link>
          <span className="text-sm text-white">|</span>

          <Link href={paths.footer.PrivacyPolicy} className="text-sm text-white hover:text-gray-500">
            {t('PrivacyPolicy')}
          </Link>
          <span className="text-sm text-white">|</span>

          <Link href={paths.footer.TermsOfService} className="text-sm text-white hover:text-gray-500">
            {t('TermsOfService')}
          </Link>
          <span className="text-sm text-white">|</span>

          <Link href={paths.footer.Disclaimer} className="text-sm text-white hover:text-gray-500">
            {t('Disclaimer')}
          </Link>
          <span className="text-sm text-white">|</span>

          <Link href={paths.footer.AboutUs} className="text-sm text-white hover:text-gray-500">
            {t('AboutUs')}
          </Link>
          <span className="text-sm text-white">|</span>

          <Link href={paths.footer.ContactUs} className="text-sm text-white hover:text-gray-500">
            {t('ContactUs')}
          </Link>
        </div>
        <p className="text-808080 text-center">{t('Copyright')}</p>
      </div>
    </footer>
  )
}

export default memo(Footer)
