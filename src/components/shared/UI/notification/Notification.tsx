import { Alert, Snackbar } from '@mui/material'
import { Severity } from '../../types/notification'

interface NotificationProps {
  message: string
  severity: Severity['types']
  duration?: number
  open: boolean
  onClose: () => void
}

const Notification = ({ message, severity, duration, open, onClose }: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
