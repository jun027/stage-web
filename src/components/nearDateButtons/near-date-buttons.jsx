import { Button, ButtonGroup } from '@mui/material'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

function NearDateButtons({
  disabled,
  onTodayClick,
  onYesterdayClick,
  onLast7DaysClick,
  onLast30DaysClick,
}) {
  const tButton = useTranslations('Button')

  return (
    <ButtonGroup disableElevation variant="outlined" color="info">
      <Button disabled={disabled} onClick={onTodayClick}>
        {tButton('Today')}
      </Button>
      <Button disabled={disabled} onClick={onYesterdayClick}>
        {tButton('Yesterday')}
      </Button>
      <Button disabled={disabled} onClick={onLast7DaysClick}>
        {tButton('Last7Days')}
      </Button>
      <Button disabled={disabled} onClick={onLast30DaysClick}>
        {tButton('Last30Days')}
      </Button>
    </ButtonGroup>
  )
}

export default memo(NearDateButtons)
