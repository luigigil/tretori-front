import { Link, Typography } from '@mui/material'
import React from 'react'

interface BreadInterface {
  name: string
  link?: boolean
  href?: string
  color?: string
}

const Bread = (props: BreadInterface) => {
  return (
    <React.Fragment>
      {props.link && (
        <Link underline='hover' color={props.color || 'inherit'} href={props.href}>
          {props.name}
        </Link>
      )}
      {!props.link && <Typography color={props.color || 'inherit'}>{props.name}</Typography>}
    </React.Fragment>
  )
}

export default Bread
