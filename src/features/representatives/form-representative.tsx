/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSnackBar } from 'context/snackbar-context'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import DatePicker from 'ui/inputs/date/date-picker'
import FormTextField from 'ui/inputs/form/inputs/text-field'
import { REQUIRED_FIELD } from 'utils/messages'
import { RepresentativeType } from 'utils/types'
import { representativeSchema } from './representative.joi.schema'
import { RepresentativeMessages } from './representative.messages'

interface FormRepresentativeProps {
  representative?: RepresentativeType
  shouldCreateNewRepresentative: boolean
}

const FormRepresentative = ({
  representative,
  shouldCreateNewRepresentative,
}: FormRepresentativeProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RepresentativeType>({ resolver: joiResolver(representativeSchema) })
  const router = useRouter()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // const { addAlert } = useSnackBars()
  const { showSnackBar } = useSnackBar()

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/representative/${representative?.id}`,
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
      })
      setShouldOpenDeleteDialog(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      router.push('/representatives')
    }
  }

  // ! fix this any
  const handleEditPhysicalPerson = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PATCH',
        url: `/representative/${representative?.id}`,
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
        data,
      })
      showSnackBar('Pessoa física editada com sucesso', 'success')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      // setIsLoadingRequest(false)
      // setIsEditing(false)
    }
  }

  // ! fix this any
  const handleSavePhysicalPerson = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/representative',
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
        data,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      router.push('/representatives')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewRepresentative) {
      return (
        <TitlePage
          title={RepresentativeMessages.newTitle}
          onSave={handleSubmit(handleSavePhysicalPerson)}
        />
      )
    }

    return (
      <TitlePage
        title={isEditing ? RepresentativeMessages.editTitle : RepresentativeMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditPhysicalPerson)}
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
            defaultValue={representative?.name}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <FormTextField
            label={'Empresa'}
            name='company'
            control={control}
            errors={errors}
            defaultValue={representative?.company}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
        </Box>

        <Box display='flex'>
          <FormTextField
            label={'Descrição'}
            name='description'
            control={control}
            errors={errors}
            defaultValue={representative?.description}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <FormTextField
            label={'Email'}
            name='email'
            control={control}
            errors={errors}
            defaultValue={representative?.email}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <FormTextField
            label={'Seguradora'}
            name='insurance'
            control={control}
            errors={errors}
            defaultValue={representative?.insurance}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <DatePicker
            required
            helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
            defaultValue={representative ? representative.birthdate : undefined}
            label='Data de Nascimento'
            disabled={!isEditing && !shouldCreateNewRepresentative}
            name='birthdate'
            control={control}
          ></DatePicker>
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Telefone'}
            name='phone'
            control={control}
            errors={errors}
            defaultValue={representative?.phone}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <FormTextField
            label={'Cargo'}
            name='role'
            control={control}
            errors={errors}
            defaultValue={representative?.role}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={representative?.type}
            disabled={!isEditing && !shouldCreateNewRepresentative}
          />
        </Box>
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Representante'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormRepresentative
