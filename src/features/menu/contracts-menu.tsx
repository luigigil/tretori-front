import {
  CurrencyExchange,
  Description,
  ExpandLess,
  ExpandMore,
  HistoryEdu,
  Lock,
} from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ContratosMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <HistoryEdu />
        </ListItemIcon>
        <ListItemText primary='Contratos' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/contracts')}>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary='Contrato' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/movements')}>
            <ListItemIcon>
              <HistoryEdu />
            </ListItemIcon>
            <ListItemText primary='Movimentação' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/accesses')}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary='Acessos' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/renewals')}>
            <ListItemIcon>
              <CurrencyExchange />
            </ListItemIcon>
            <ListItemText primary='Renovação' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default ContratosMenu
