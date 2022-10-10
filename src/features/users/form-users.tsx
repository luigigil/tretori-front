/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSnackBar } from 'context/snackbar-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import FormTextField from 'ui/inputs/form/inputs/text-field'
import { UsersType } from 'utils/types'
import { usersSchema } from './users.joi.schema'
import { UsersMessages } from './users.messages'

interface FormUsersProps {
  users?: UsersType
  shouldCreateNewUsers: boolean
}

const FormUsers = ({ users, shouldCreateNewUsers }: FormUsersProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UsersType>({ resolver: joiResolver(usersSchema) })
  const { data: session } = useSession()
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
        url: `/users/${users?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
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
      router.push('/users')
    }
  }

  // ! fix this any
  const handleEditUsers = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `/users/${users?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      showSnackBar('Usuário editado com sucesso', 'success')
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
  const handleSaveUsers = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/users',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
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
      router.push('/users')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewUsers) {
      return <TitlePage title={UsersMessages.newTitle} onSave={handleSubmit(handleSaveUsers)} />
    }

    return (
      <TitlePage
        title={isEditing ? UsersMessages.editTitle : UsersMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditUsers)}
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
            defaultValue={users?.username}
            label={'Username'}
            name='username'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewUsers}
          />
          <FormTextField
            type='password'
            defaultValue={users?.password}
            label={'Senha'}
            name='password'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewUsers}
          />
        </Box>
        {/* <Box display='flex' width='50%'>
          <FormTextField
            defaultValue={users?.roles}
            label={'Permissões'}
            name='roles'
            control={control}
            errors={errors}
            // disabled={!isEditing && !shouldCreateNewUsers}
            disabled
          />
        </Box> */}
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Usuário'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormUsers
