import { HistoryEdu } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'

const ContratosMenu = () => {
  const router = useRouter()

  return (
    <ListItemButton>
      <ListItemIcon>
        <HistoryEdu />
      </ListItemIcon>
      <ListItemText primary='Contratos' onClick={() => router.push('/contracts')} />
    </ListItemButton>
  )
}

export default ContratosMenu
