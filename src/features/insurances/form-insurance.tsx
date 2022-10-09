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
import FormTextField from 'ui/inputs/form/inputs/text-field'
import { InsuranceType } from 'utils/types'
import { insuranceSchema } from './insurance.joi.schema'
import { InsuranceMessages } from './insurance.messages'

interface FormInsuranceProps {
  insurance?: InsuranceType
  shouldCreateNewInsurance: boolean
}

const FormInsurance = ({ insurance, shouldCreateNewInsurance }: FormInsuranceProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InsuranceType>({ resolver: joiResolver(insuranceSchema) })
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
        url: `/insurance/${insurance?.id}`,
        baseURL: 'http://localhost:4200',
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
      router.push('/insurances')
    }
  }

  // ! fix this any
  const handleEditInsurance = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `/insurance/${insurance?.id}`,
        baseURL: 'http://localhost:4200',
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
  const handleSaveInsurance = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/insurance',
        baseURL: 'http://localhost:4200',
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
      router.push('/insurances')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewInsurance) {
      return (
        <TitlePage title={InsuranceMessages.newTitle} onSave={handleSubmit(handleSaveInsurance)} />
      )
    }

    return (
      <TitlePage
        title={isEditing ? InsuranceMessages.editTitle : InsuranceMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditInsurance)}
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
            label={'Nome Fantasia'}
            name='fantasy_name'
            control={control}
            errors={errors}
            defaultValue={insurance?.fantasy_name}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />

          <FormTextField
            label={'Razão Social'}
            name='social_reason'
            control={control}
            errors={errors}
            defaultValue={insurance?.social_reason}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'CNPJ'}
            name='cnpj'
            control={control}
            errors={errors}
            defaultValue={insurance?.cnpj}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            label={'Telefone'}
            name='phone'
            control={control}
            errors={errors}
            defaultValue={insurance?.phone}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            label={'Telefone Secundário'}
            name='phone_secondary'
            control={control}
            errors={errors}
            defaultValue={insurance?.phone_secondary}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            label={'Email'}
            name='email'
            control={control}
            errors={errors}
            defaultValue={insurance?.email}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            defaultValue={insurance?.cep}
            label={'CEP'}
            name='cep'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            defaultValue={insurance?.address}
            label={'Endereço'}
            name='address'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            defaultValue={insurance?.city}
            label={'Cidade'}
            name='city'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            defaultValue={insurance?.neighborhood}
            label={'Bairro'}
            name='neighborhood'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            defaultValue={insurance?.uf}
            label={'UF'}
            name='uf'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={insurance?.type}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            label={'Tamanho'}
            name='size'
            defaultValue={insurance?.size}
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
          <FormTextField
            label={'Representantes'}
            name='representatives'
            defaultValue={insurance?.representatives}
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewInsurance}
          />
        </Box>

        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Seguradora'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormInsurance
