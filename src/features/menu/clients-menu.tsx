import {
  Business,
  BusinessCenter,
  ExpandLess,
  ExpandMore,
  Group,
  PersonSearch,
} from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ClientesMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonSearch />
        </ListItemIcon>
        <ListItemText primary='Clientes' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary='Pessoa Física' onClick={() => router.push('/physical-person')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary='Empresas' onClick={() => router.push('/legal-person')} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/customers')}>
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText primary='Clientes' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default ClientesMenu
