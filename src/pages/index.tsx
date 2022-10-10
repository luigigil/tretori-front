import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'

export default function App() {
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = () => {
    enqueueSnackbar('I love hooks', { variant: 'success' })
  }

  return <Button onClick={handleClick}>Index Page</Button>
}
