import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface DialogConfirmProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  cancelMessage?: string
  confirmMessage?: string
}

const DialogConfirm = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  cancelMessage,
  confirmMessage,
}: DialogConfirmProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
    >
      <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-dialog-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id='dialog-cancel-btn' onClick={onClose}>
          {cancelMessage || 'Cancelar'}
        </Button>
        <Button id='dialog-confirm-btn' onClick={onConfirm} autoFocus>
          {confirmMessage || 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirm
