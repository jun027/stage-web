/** @type {import('next').NextConfig} */

// eslint-disable-next-line import/default
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  output: 'standalone',
}

export default withNextIntl(nextConfig)
