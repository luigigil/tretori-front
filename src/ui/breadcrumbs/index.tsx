import { Breadcrumbs } from '@mui/material'
import BreadcrumbItem, { BreadcrumbItemProps } from './breadcrumb-item'

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItemProps[]
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
  return (
    <Breadcrumbs separator='›' aria-label='breadcrumb'>
      {breadcrumbs.map((props, index) => {
        return <BreadcrumbItem key={index} {...props} />
      })}
    </Breadcrumbs>
  )
}

export default Breadcrumb
