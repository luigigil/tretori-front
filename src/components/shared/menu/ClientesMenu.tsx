import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material"
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { useState } from "react"
import InboxIcon from "@mui/icons-material/MoveToInbox"

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
        <ListItemText primary="Clientes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Pessoa Física" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Empresas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default ClientesMenu
