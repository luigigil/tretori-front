import { Breadcrumbs } from '@mui/material'

const Breadcrumb = (props: { breadcrumbs: JSX.Element[] }) => {
  return (
    <Breadcrumbs separator='›' aria-label='breadcrumb'>
      {props.breadcrumbs}
    </Breadcrumbs>
  )
}

export default Breadcrumb
