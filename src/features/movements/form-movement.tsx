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
import { MovementType } from 'utils/types'
import { movementSchema } from './movement.joi.schema'
import { MovementMessages } from './movement.messages'

interface FormMovementProps {
  movement?: MovementType
  shouldCreateNewMovement: boolean
}

const FormMovement = ({ movement, shouldCreateNewMovement }: FormMovementProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovementType>({ resolver: joiResolver(movementSchema) })
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
        url: `/move/${movement?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
      router.push('/movements')
    }
  }

  // ! fix this any
  const handleEditMovement = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `/move/${movement?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
  const handleSaveMovement = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/move',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
      router.push('/movements')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewMovement) {
      return (
        <TitlePage title={MovementMessages.newTitle} onSave={handleSubmit(handleSaveMovement)} />
      )
    }

    return (
      <TitlePage
        title={isEditing ? MovementMessages.editTitle : MovementMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditMovement)}
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
            defaultValue={movement?.contract}
            label={'Contrato'}
            name='contract'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewMovement}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            defaultValue={movement?.details}
            label={'Detalhes'}
            name='details'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewMovement}
          />
          <FormTextField
            defaultValue={movement?.description}
            label={'Descrição'}
            name='description'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewMovement}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Número de Vidas'}
            name='number_of_lives'
            control={control}
            errors={errors}
            defaultValue={movement?.number_of_lives}
            disabled={!isEditing && !shouldCreateNewMovement}
          />
          <FormTextField
            label={'Ação'}
            name='action'
            defaultValue={movement?.action}
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewMovement}
          />
          <DatePicker
            required
            helperText={errors.move_date?.type === 'required' && REQUIRED_FIELD}
            defaultValue={movement ? movement.move_date : undefined}
            label='Data da Movimentação'
            disabled={!isEditing && !shouldCreateNewMovement}
            name='move_date'
            control={control}
          ></DatePicker>
        </Box>

        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Movimentação'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormMovement
