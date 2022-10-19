import {
  ExpandLess,
  ExpandMore,
  HealthAndSafety,
  LocalOffer,
  MedicalInformation,
  Work,
} from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SeguradorasMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <MedicalInformation />
        </ListItemIcon>
        <ListItemText primary='Seguradoras' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/insurances')}>
            <ListItemIcon>
              <HealthAndSafety />
            </ListItemIcon>
            <ListItemText primary='Empresas' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/products')}>
            <ListItemIcon>
              <LocalOffer />
            </ListItemIcon>
            <ListItemText primary='Produtos' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/representatives')}>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary=' Representantes' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default SeguradorasMenu
