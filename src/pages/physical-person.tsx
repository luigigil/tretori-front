import React, { useEffect, useState } from 'react'
import physicalPersonService from '../api/physicalPersonService'
import {
  PHYSICAL_PERSON_BREADCRUMBS,
  PHYSICAL_PERSON_TABLE_FIELDS,
} from '../features/physical-person/info'
import TablePage from '../layouts/table-page'
import { PHYSICAL_PERSON_TITLE } from '../utils/messages/physical-person'
import { PhysicalPersonRow } from '../utils/types'

export default function PhysicalPerson() {
  const [rows, setRows] = useState<PhysicalPersonRow[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  useEffect((): void => {
    const getPhysicalPerson = async (): Promise<void> => {
      try {
        const list = (await physicalPersonService.findAll()).data
        setRows(list)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        if (error instanceof Error) {
          // notifyError(error.message)
        }
      }
    }
    getPhysicalPerson()
  }, [])

  return (
    <TablePage
      title={PHYSICAL_PERSON_TITLE}
      breadcrumbs={PHYSICAL_PERSON_BREADCRUMBS}
      columns={PHYSICAL_PERSON_TABLE_FIELDS}
      rows={rows}
      isLoading={isLoading}
    ></TablePage>
  )
}
