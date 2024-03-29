/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import DatePicker from 'ui/inputs/date/date-picker'
import FormTextField from 'ui/inputs/text-field/text-field'
import { REQUIRED_FIELD, SERVER_ERROR } from 'utils/messages'
import { CustomerType, PhysicalPersonType } from 'utils/types'
import { physicalPersonSchema } from './physical-person.joi.schema'
import { PhysicalPersonMessages } from './physical-person.messages'

interface FormPhysicalPersonProps {
  customer?: CustomerType
  physicalPerson?: PhysicalPersonType
  shouldCreateNewPhysicalPerson: boolean
}

const FormPhysicalPerson = ({
  customer,
  physicalPerson,
  shouldCreateNewPhysicalPerson,
}: FormPhysicalPersonProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhysicalPersonType>({ resolver: joiResolver(physicalPersonSchema) })
  const { data: session } = useSession()
  const router = useRouter()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/physical-people/${physicalPerson?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(PhysicalPersonMessages.deleteSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push('/physical-person')
    }
  }

  // ! fix this any
  const handleEdit = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `physical-people/${physicalPerson?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: { ...data, customer },
      })
      enqueueSnackbar(PhysicalPersonMessages.editSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      setIsEditing(false)
    }
  }

  // ! fix this any
  const handleSave = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: 'physical-person',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: { ...data, customer },
      })
      enqueueSnackbar(PhysicalPersonMessages.newSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewPhysicalPerson) {
      return (
        <TitlePage
          id='physical-person-title'
          title={PhysicalPersonMessages.newTitle}
          onSave={handleSubmit(handleSave)}
        />
      )
    }

    return (
      <TitlePage
        id='physical-person-title'
        title={isEditing ? PhysicalPersonMessages.editTitle : PhysicalPersonMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEdit)}
      />
    )
  }

  return (
    <>
      {titlePageComponent()}
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete='off'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex'>
          <FormTextField
            label={'Nome'}
            name='name'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.name}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            label={'CPF'}
            name='cpf'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.cpf}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
        </Box>

        <Box display='flex'>
          <FormTextField
            label={'RG'}
            name='rg'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.rg}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            label={'Órgão Emissor'}
            name='rg_emissor'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.rg_emissor}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            label={'Órgão Emissor UF'}
            name='rg_emissor_uf'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.rg_emissor_uf}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <DatePicker
            maxDate={new Date()}
            required
            helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
            defaultValue={physicalPerson ? physicalPerson.birthdate : undefined}
            label='Data de Nascimento'
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
            name='birthdate'
            control={control}
          ></DatePicker>
        </Box>
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title={PhysicalPersonMessages.deleteTitle}
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message={PhysicalPersonMessages.deleteMessage}
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormPhysicalPerson
