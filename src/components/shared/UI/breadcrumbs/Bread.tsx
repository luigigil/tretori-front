import { Link, Typography } from '@mui/material'
import React from 'react'

interface BreadProps {
  name: string
  link?: boolean
  href?: string
  color?: string
}

const Bread = ({ name, link, href, color }: BreadProps) => {
  return (
    <React.Fragment>
      {link && (
        <Link underline='hover' color={color || 'inherit'} href={href}>
          {name}
        </Link>
      )}
      {!link && <Typography color={color || 'inherit'}>{name}</Typography>}
    </React.Fragment>
  )
}

export default Bread
