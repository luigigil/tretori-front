import { PersonSearch } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'

const ClientesMenu = () => {
  const router = useRouter()

  return (
    <ListItemButton>
      <ListItemIcon>
        <PersonSearch />
      </ListItemIcon>
      <ListItemText primary='Clientes' onClick={() => router.push('/customers')} />
    </ListItemButton>
  )
}

export default ClientesMenu
