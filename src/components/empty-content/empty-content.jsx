import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ----------------------------------------------------------------------

export default function EmptyContent({ title, imgUrl, action, filled, description, sx, ...other }) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        height: 1,
        ...(filled && {
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.08)}`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="empty content"
        src={imgUrl || '/images/empty-content-01.png'}
        sx={{ width: 1, maxWidth: 160 }}
      />

      {title && (
        <Typography
          variant="h6"
          component="span"
          sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}>
          {description}
        </Typography>
      )}

      {action && action}
    </Stack>
  )
}
