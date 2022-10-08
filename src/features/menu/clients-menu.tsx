import { ExpandLess, ExpandMore, Person, StarBorder } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const ClientesMenu = () => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Clientes' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={RouterLink} to='/physical-person'>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary='Pessoa Física' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={RouterLink} to='/companies'>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Empresas' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={RouterLink} to='/customers'>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Clientes' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default ClientesMenu
