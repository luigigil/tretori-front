import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import ClientesMenu from '../features/menu/ClientsMenu'
import ContratosMenu from '../features/menu/ContractsMenu'
import SeguradorasMenu from '../features/menu/InsuranceMenu'
import GestaoMenu from '../features/menu/ManagementMenu'
import Drawer from './Drawer'

interface DrawerContainerProps {
  open: boolean
  handleDrawerOpen: () => void
}

const DrawerContainer = ({ open, handleDrawerOpen }: DrawerContainerProps) => {
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
        <GestaoMenu />
        <ClientesMenu />
        <SeguradorasMenu />
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  )
}

export default DrawerContainer
