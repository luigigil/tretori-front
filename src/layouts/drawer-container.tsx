import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import ClientesMenu from 'features/menu/clients-menu'
import ContratosMenu from 'features/menu/contracts-menu'
import SeguradorasMenu from 'features/menu/insurance-menu'
import GestaoMenu from 'features/menu/management-menu'
import { useSession } from 'next-auth/react'
import Drawer from './drawer'

interface DrawerContainerProps {
  open: boolean
  handleDrawerOpen: () => void
}

const DrawerContainer = ({ open, handleDrawerOpen }: DrawerContainerProps) => {
  const { data: session } = useSession()

  const isAdmin = session?.role === 'admin'

  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={handleDrawerOpen}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component='nav'>
        <ContratosMenu />
        {isAdmin && <GestaoMenu />}
        <ClientesMenu />
        <SeguradorasMenu />
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  )
}

export default DrawerContainer
