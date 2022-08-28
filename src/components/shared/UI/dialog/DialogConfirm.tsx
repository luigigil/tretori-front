import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const DialogConfirm = (props: {
  open: boolean
  onClose: any
  onConfirm: any
  title: string
  message: string
  cancelMessage?: string
  confirmMessage?: string
}) => {
  return (
    <Dialog
      open={props.open}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
    >
      <DialogTitle id='confirm-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-dialog-description'>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>{props.cancelMessage || 'Cancelar'}</Button>
        <Button onClick={props.onConfirm} autoFocus>
          {props.confirmMessage || 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirm
