import { Logout } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { signOut, useSession } from 'next-auth/react'
import AppBar from './app-bar'

interface AppBarContainerProps {
  open: boolean
  handleDrawerOpen: () => void
}

const AppBarContainer = ({ open, handleDrawerOpen }: AppBarContainerProps) => {
  const { data: session } = useSession()

  const handleSignout = () => {
    signOut()
  }

  return (
    <AppBar position='absolute' open={open} style={{ background: '#182340' }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Tretori
        </Typography>
        {session && (
          <IconButton color='inherit' onClick={handleSignout}>
            <Logout />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarContainer
