import { Link, Typography } from '@mui/material'

export interface BreadcrumbItemProps {
  name: string
  link?: boolean
  href?: string
  color?: string
}

export default function BreadcrumbItem({ name, link, href, color }: BreadcrumbItemProps) {
  return (
    <>
      {link ? (
        <Link underline='hover' color={color || 'inherit'} href={href}>
          {name}
        </Link>
      ) : (
        <Typography color={color || 'inherit'}>{name}</Typography>
      )}
    </>
  )
}
