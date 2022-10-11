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
import FormTextField from 'ui/inputs/form/inputs/text-field'
import { SERVER_ERROR } from 'utils/messages'
import { ContractType } from 'utils/types'
import { contractSchema } from './contract.joi.schema'
import { ContractMessages } from './contract.messages'

interface FormContractProps {
  contract?: ContractType
  shouldCreateNewContract: boolean
}

const FormContract = ({ contract, shouldCreateNewContract }: FormContractProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContractType>({ resolver: joiResolver(contractSchema) })
  const { enqueueSnackbar } = useSnackbar()
  const { data: session } = useSession()
  const router = useRouter()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/contract/${contract?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(ContractMessages.newSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push('/contracts')
    }
  }

  // ! fix this any
  const handleEditContract = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `/contract/${contract?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(ContractMessages.editSuccess, { variant: 'success' })
      setIsEditing(false)
      setIsLoadingRequest(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
      setIsLoadingRequest(false)
    }
  }

  // ! fix this any
  const handleSaveContract = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/contract',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(ContractMessages.newSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push('/contracts')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewContract) {
      return (
        <TitlePage title={ContractMessages.newTitle} onSave={handleSubmit(handleSaveContract)} />
      )
    }

    return (
      <TitlePage
        title={isEditing ? ContractMessages.editTitle : ContractMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditContract)}
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
            label={'Apólice'}
            name='policy'
            control={control}
            errors={errors}
            defaultValue={contract?.policy}
            disabled={!isEditing && !shouldCreateNewContract}
          />

          <FormTextField
            label={'Tamanho'}
            name='size'
            control={control}
            errors={errors}
            defaultValue={contract?.size}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={contract?.type}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Versão'}
            name='version'
            control={control}
            errors={errors}
            defaultValue={contract?.version.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />

          <FormTextField
            label={'Número de vidas'}
            name='number_of_lives'
            control={control}
            errors={errors}
            defaultValue={contract?.number_of_lives.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Número de vidas'}
            name='number_of_lives'
            control={control}
            errors={errors}
            defaultValue={contract?.number_of_lives.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Box display='flex'>
          <DatePicker
            label={'Início de Vigência'}
            name='validity_start'
            control={control}
            defaultValue={contract?.validity_start}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <DatePicker
            label={'Fim de Vigência'}
            name='validity_end'
            control={control}
            defaultValue={contract?.validity_end}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Tempo de Vigência'}
            name='validity_time'
            control={control}
            errors={errors}
            defaultValue={contract?.validity_time.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Período de Inclusão'}
            name='inclusion_period'
            control={control}
            errors={errors}
            defaultValue={contract?.inclusion_period}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Data de Corte'}
            name='cutoff_date'
            control={control}
            errors={errors}
            defaultValue={contract?.cutoff_date}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Email na Seguradora'}
            name='email_on_insurancy'
            control={control}
            errors={errors}
            defaultValue={contract?.email_on_insurancy}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Telefone na Seguradora'}
            name='phone_on_insurancy'
            control={control}
            errors={errors}
            defaultValue={contract?.phone_on_insurancy}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Copay'}
            name='copay'
            control={control}
            errors={errors}
            defaultValue={contract?.copay.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Adesão'}
            name='adhesion'
            control={control}
            errors={errors}
            defaultValue={contract?.adhesion.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Copay perc'}
            name='copay_perc'
            control={control}
            errors={errors}
            defaultValue={contract?.copay_perc.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Contributor perc'}
            name='contributor_perc'
            control={control}
            errors={errors}
            defaultValue={contract?.contributor_perc.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Copay detalhes'}
            name='copay_details'
            control={control}
            errors={errors}
            defaultValue={contract?.copay_details}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Custo'}
            name='cost'
            control={control}
            errors={errors}
            defaultValue={contract?.cost.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Valor da nota'}
            name='invoice_amount'
            control={control}
            errors={errors}
            defaultValue={contract?.invoice_amount.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <FormTextField
            label={'Valor total do contrato'}
            name='total_contract_value'
            control={control}
            errors={errors}
            defaultValue={contract?.total_contract_value.toString()}
            disabled={!isEditing && !shouldCreateNewContract}
          />
          <DatePicker
            label={'Data da primeira nota'}
            name='first_invoice_date'
            control={control}
            defaultValue={contract?.first_invoice_date}
            disabled={!isEditing && !shouldCreateNewContract}
          />
        </Box>
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title={ContractMessages.deleteTitle}
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message={ContractMessages.deleteMessage}
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormContract
