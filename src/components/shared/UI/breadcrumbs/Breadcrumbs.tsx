import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { JsxElement } from 'typescript'

const Breadcrumb = (props: { breadcrumbs: JSX.Element[] }) => {
  return (
    <Breadcrumbs separator='›' aria-label='breadcrumb'>
      {props.breadcrumbs}
    </Breadcrumbs>
  )
}

export default Breadcrumb
