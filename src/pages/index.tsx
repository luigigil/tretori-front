import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function App() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <img src={'/tretori-home.png'} alt='Tretori home' loading='lazy' />

      <Typography display='flex' variant='h4' style={{ color: '#182340' }}>
        TRETORI - CADASTRO DE CLIENTES
      </Typography>

      <Box
        display='flex'
        flexDirection='column'
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography display='flex' style={{ color: '#d5af55' }}>
          Desenvolvido por: Luigi Gil, Arthur Pieri e Douglas Yokoyama
        </Typography>
        <Typography display='flex' style={{ color: '#d5af55' }}>
          2022
        </Typography>
      </Box>
    </Box>
  )
}
