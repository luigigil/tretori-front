import { Typography } from '@mui/material'

interface SubtitleDialogType {
  subtitle: string
}

const SubtitleDialog = ({ subtitle }: SubtitleDialogType) => {
  return (
    <Typography variant='subtitle1' color='text.primary' marginTop='1em'>
      {subtitle}
    </Typography>
  )
}
export default SubtitleDialog
