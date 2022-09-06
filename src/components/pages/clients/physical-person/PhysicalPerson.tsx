import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import physicalPersonService from '../../../../api/physicalPersonService'
import { NotificationEnum } from '../../../shared/enums/notification'
import {
  PHYSICAL_PERSON_DELETE_MESSAGE,
  PHYSICAL_PERSON_DELETE_SUCCESS,
  PHYSICAL_PERSON_DELETE_TITLE,
  PHYSICAL_PERSON_NEW_SUCCESS,
  PHYSICAL_PERSON_NEW_TITLE,
  PHYSICAL_PERSON_TITLE,
} from '../../../shared/messages/physical-person'
import { Severity } from '../../../shared/types/notification'
import { PhysicalPersonRow, PhysicalPersonType } from '../../../shared/types/physical-person'
import { Column } from '../../../shared/types/table'
import Bread from '../../../shared/UI/breadcrumbs/Bread'
import Breadcrumb from '../../../shared/UI/breadcrumbs/Breadcrumbs'
import DialogConfirm from '../../../shared/UI/dialog/DialogConfirm'
import DialogForm from '../../../shared/UI/dialog/DialogForm'
import BackdropLoading from '../../../shared/UI/loading/BackdropLoading'
import Notification from '../../../shared/UI/notification/Notification'
import TableMain from '../../../shared/UI/table/TableMain'
import TitlePage from '../../../shared/UI/title/TitlePage'
import FormPhysicalPerson from './FormPhysicalPerson'

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
  const [selectedId, setSelectedId] = React.useState(0)
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [rows, setRows] = useState<PhysicalPersonRow[]>([])
  const [notifyMessage, setNotifyMessage] = React.useState('')
  const [notifyOpen, setNotifyOpen] = React.useState(false)
  const [notifySeverity, setNotifySeverity] = React.useState<Severity['types']>('info')
  const [dialogConfirmOpen, setDialogConfirmOpen] = React.useState(false)
  const [dialogConfirmTitle, setDialogConfirmTitle] = React.useState('')
  const [dialogConfirmMessage, setDialogConfirmMessage] = React.useState('')
  const [dialogFormOpen, setDialogFormOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  useEffect((): void => {
    setLoading(true)
    const getPhysicalPerson = async (): Promise<void> => {
      try {
        const list = await physicalPersonService.findAll()
        setRows(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (error instanceof Error) {
          notifyError(error.message)
        }
      }
    }
    getPhysicalPerson()
  }, [refreshKey])

  const onNewHandler = (): void => {
    setDialogFormOpen(true)
  }

  const onDeleteHandler = (id: number): void => {
    openDialogDeleteConfirm()
    setSelectedId(id)
  }

  const onSaveHandler = async (physicalPerson: PhysicalPersonType): Promise<void> => {
    onDialogFormCloseHandler()
    setLoading(true)
    try {
      await physicalPersonService.save(physicalPerson)
      setLoading(false)
      notifySuccess(PHYSICAL_PERSON_NEW_SUCCESS)
      updateRows()
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        notifyError(error.message)
      }
    }
  }

  const onDeleteConfirmHandler = async (): Promise<void> => {
    setDialogConfirmOpen(false)
    setLoading(true)
    try {
      await physicalPersonService.deleteOneById(selectedId)
      notifySuccess(PHYSICAL_PERSON_DELETE_SUCCESS)
      setLoading(false)
      updateRows()
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        notifyError(error.message)
      }
    }
  }

  const updateRows = () => {
    setRefreshKey((oldKey) => oldKey + 1)
  }
  const onDialogFormCloseHandler = (): void => {
    setSelectedId(0)
    setDialogFormOpen(false)
  }

  const onDialogCloseHandler = (): void => {
    setDialogConfirmOpen(false)
  }

  const onCloseNotifyHandler = (): void => {
    setNotifyOpen(false)
  }

  const openDialogDeleteConfirm = (): void => {
    setDialogConfirmOpen(true)
    setDialogConfirmTitle(PHYSICAL_PERSON_DELETE_TITLE)
    setDialogConfirmMessage(PHYSICAL_PERSON_DELETE_MESSAGE)
  }

  const notifySuccess = (message: string): void => {
    setNotifyOpen(true)
    setNotifySeverity(NotificationEnum.SUCCESS)
    setNotifyMessage(message)
  }

  const notifyError = (message: string): void => {
    setNotifyOpen(true)
    setNotifySeverity(NotificationEnum.ERROR)
    setNotifyMessage(message)
  }

  return (
    <section>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage title={PHYSICAL_PERSON_TITLE} onNew={onNewHandler}></TitlePage>
      {rows.length <= 0 && (
        <Typography align='center' marginBottom='1em'>
          Nada aqui para ser mostrado
        </Typography>
      )}
      <TableMain columns={columns} rows={rows} onDelete={onDeleteHandler}></TableMain>
      <DialogForm title={PHYSICAL_PERSON_NEW_TITLE} open={dialogFormOpen}>
        <FormPhysicalPerson
          physicalPersonId={selectedId}
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
      <BackdropLoading open={loading}></BackdropLoading>
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
