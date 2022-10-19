import { ManageAccounts } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'

const GestaoMenu = () => {
  const router = useRouter()

  return (
    <ListItemButton>
      <ListItemIcon>
        <ManageAccounts />
      </ListItemIcon>
      <ListItemText primary='Usuários' onClick={() => router.push('users')} />
    </ListItemButton>
  )
}

export default GestaoMenu
