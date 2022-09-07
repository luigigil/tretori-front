import { Breadcrumbs } from '@mui/material'

interface BreadcrumbsProps {
  breadcrumbs: JSX.Element[]
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumbs separator='›' aria-label='breadcrumb'>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default Breadcrumb
