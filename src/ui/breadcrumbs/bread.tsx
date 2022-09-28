import { Link, Typography } from '@mui/material'

interface BreadProps {
  name: string
  link?: boolean
  href?: string
  color?: string
}

const Bread = ({ name, link, href, color }: BreadProps) => {
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

export default Bread
