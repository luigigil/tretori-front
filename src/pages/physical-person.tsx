import React, { useEffect, useState } from 'react'
import physicalPersonService from '../api/physicalPersonService'
import TablePage from '../layouts/table-page'
import Bread from '../ui/breadcrumbs/bread'
import { PhysicalPersonRow } from '../utils/types/physical-person'
import { Column } from '../utils/types/table'

const breadcrumbs = [
  <Bread key='1' name='Dashboard' link={true} href='/dashboard' />,
  <Bread key='2' name='Pessoa' />,
  <Bread key='3' name='Consulta' color='text.primary' />,
]

const columns: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'rg', label: 'RG', minWidth: 100 },
]

const PhysicalPerson = () => {
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
      breadcrumbs={breadcrumbs}
      columns={columns}
      rows={rows}
      isLoading={isLoading}
    ></TablePage>
  )
}

export default PhysicalPerson
