import { AssignmentInd, ExpandLess, ExpandMore, Login, ManageAccounts } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const GestaoMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ManageAccounts />
        </ListItemIcon>
        <ListItemText primary='Gestao' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('users')}>
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary='Usuários' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('login')}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default GestaoMenu
