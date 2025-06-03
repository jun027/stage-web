import { memo } from 'react'
import EmptyContent from '@/components/empty-content'
import { Box } from '@mui/material'
import { useTranslations } from 'next-intl'

function DataTableNoContent({ rowCount = 0, sx = {} }) {
  const t = useTranslations('Common')

  if (rowCount > 0) return null

  return (
    <Box p={3}>
      <EmptyContent
        filled
        title={t('NoData')}
        description={t('NoDataDescription')}
        sx={{
          py: 10,
          height: '100%',
          ...sx,
        }}
      />
    </Box>
  )
}

export default memo(DataTableNoContent)
