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

const DialogForm = (props: DialogFormTypes) => {
  return (
    <>
      <Dialog open={props.open} fullWidth={true} maxWidth={props.maxWidth || 'md'}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
          {props.children}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogForm
