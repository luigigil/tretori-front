import { Alert, Snackbar } from '@mui/material'
import { Severity } from '../../types/notification'

const Notification = (props: {
  message: string
  severity: Severity['types']
  duration?: number
  open: boolean
  onClose: any
}) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.duration || 6000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={props.severity} sx={{ width: '100%' }} onClose={props.onClose}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
