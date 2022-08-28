import React, { useEffect, useState } from 'react'
import client from '../../../../api/axios'
import { NOTIFICATION } from '../../../shared/enums/notification'
import {
  PHYSICAL_PERSON_DELETE_MESSAGE,
  PHYSICAL_PERSON_DELETE_SUCCESS,
  PHYSICAL_PERSON_DELETE_TITLE,
  PHYSICAL_PERSON_NEW_TITLE,
  PHYSICAL_PERSON_NOT_IDENTIFIED,
  PHYSICAL_PERSON_TITLE,
} from '../../../shared/messages/physical-person'
import { Severity } from '../../../shared/types/notification'
import { PhysicalPersonRow, PhysicalPersonType } from '../../../shared/types/physical-person'
import { Column } from '../../../shared/types/table'
import Bread from '../../../shared/UI/breadcrumbs/Bread'
import Breadcrumb from '../../../shared/UI/breadcrumbs/Breadcrumbs'
import DialogConfirm from '../../../shared/UI/dialog/DialogConfirm'
import DialogForm from '../../../shared/UI/dialog/DialogForm'
import Notification from '../../../shared/UI/notification/Notification'
import TableMain from '../../../shared/UI/table/TableMain'
import TitlePage from '../../../shared/UI/title/TitlePage'
import FormPhysicalPerson from './FormPhysicalPerson'

const breadcrumbs = [
  <Bread name='Dashboard' link={true} href='/dashboard' key='1' />,
  <Bread name='Pessoa' key='2' />,
  <Bread name='Consulta' color='text.primary' key='3' />,
]

const columns: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'rg', label: 'RG', minWidth: 100 },
]

const PhysicalPerson = () => {
  const [selectedId, setSelectedId] = React.useState(0)
  const [rows, setRows] = useState<PhysicalPersonRow[]>([])
  const [notifyMessage, setNotifyMessage] = React.useState('')
  const [notifyOpen, setNotifyOpen] = React.useState(false)
  const [notifySeverity, setNotifySeverity] = React.useState<Severity['types']>('info')
  const [dialogConfirmOpen, setDialogConfirmOpen] = React.useState(false)
  const [dialogConfirmTitle, setDialogConfirmTitle] = React.useState('')
  const [dialogConfirmMessage, setDialogConfirmMessage] = React.useState('')
  const [dialogFormOpen, setDialogFormOpen] = React.useState(false)

  useEffect((): void => {
    const getPhysicalPerson = async (): Promise<void> => {
      const response = await client.get('/physical-person')
      setRows(response.data)
    }
    getPhysicalPerson()
    return
  }, [])

  const onNewHandler = (): void => {
    setDialogFormOpen(true)
  }

  const onEditHandler = async (id: number): Promise<void> => {
    notifySuccess('Pessoa editada com sucesso ' + id)
  }

  const onDeleteHandler = (id: number): void => {
    setDialogConfirmOpen(true)
    setDialogConfirmTitle(PHYSICAL_PERSON_DELETE_TITLE)
    setDialogConfirmMessage(PHYSICAL_PERSON_DELETE_MESSAGE)
    setSelectedId(id)
  }

  const onSaveHandler = async (physicalPerson: PhysicalPersonType): Promise<void> => {
    console.log('confirm save ', physicalPerson)
    // {
    //   "id": 0,
    //   "code": "string",
    //   "phone": "string",
    //   "phone_secondary": "string",
    //   "address": "string",
    //   "cep": "string",
    //   "city": "string",
    //   "neighborhood": "string",
    //   "uf": "string",
    //   "email": "string",
    //   "name": "string",
    //   "birthdate": "string",
    //   "cpf": "string",
    //   "rg": "string",
    //   "rg_emissor": "string",
    //   "rg_emissor_uf": "string",
    //   "contracts": [
    //     "string"
    //   ]
    // }
  }

  const onDeleteConfirmHandler = async (): Promise<void> => {
    setDialogConfirmOpen(false)
    if (selectedId === 0) {
      notifyError(PHYSICAL_PERSON_NOT_IDENTIFIED)
      return
    }
    try {
      await client.delete(`/physical-person/${selectedId}`)
      notifySuccess(PHYSICAL_PERSON_DELETE_SUCCESS)
    } catch (error) {
      notifyError(PHYSICAL_PERSON_DELETE_SUCCESS)
    }
  }

  const onDialogFormCloseHandler = (): void => {
    setDialogFormOpen(false)
  }

  const onDialogCloseHandler = (): void => {
    setDialogConfirmOpen(false)
  }

  const onCloseNotifyHandler = (): void => {
    setNotifyOpen(false)
  }

  const notifySuccess = (message: string): void => {
    setNotifyOpen(true)
    setNotifySeverity(NOTIFICATION.SUCCESS)
    setNotifyMessage(message)
  }

  const notifyError = (message: string): void => {
    setNotifyOpen(true)
    setNotifySeverity(NOTIFICATION.ERROR)
    setNotifyMessage(message)
  }

  return (
    <section>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage title={PHYSICAL_PERSON_TITLE} onNew={onNewHandler}></TitlePage>
      <TableMain
        columns={columns}
        rows={rows}
        onDelete={onDeleteHandler}
        onEdit={onEditHandler}
      ></TableMain>
      <DialogForm title={PHYSICAL_PERSON_NEW_TITLE} open={dialogFormOpen}>
        <FormPhysicalPerson
          onClose={onDialogFormCloseHandler}
          onConfirm={(physicalPerson: PhysicalPersonType) => onSaveHandler(physicalPerson)}
        ></FormPhysicalPerson>
      </DialogForm>
      <DialogConfirm
        open={dialogConfirmOpen}
        title={dialogConfirmTitle}
        message={dialogConfirmMessage}
        onClose={onDialogCloseHandler}
        onConfirm={onDeleteConfirmHandler}
      ></DialogConfirm>
      <Notification
        message={notifyMessage}
        severity={notifySeverity}
        open={notifyOpen}
        onClose={onCloseNotifyHandler}
      ></Notification>
    </section>
  )
}

export default PhysicalPerson
