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

const SeguradorasMenu = () => {
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
        <ListItemText primary="Seguradoras" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Seguradoras" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Representantes" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default SeguradorasMenu
