import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface DialogFormTypes {
  open: boolean
  title: string
  children: React.ReactNode
  message?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const DialogForm = ({ open, title, children, message, maxWidth }: DialogFormTypes) => {
  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth={maxWidth || 'md'}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogForm
