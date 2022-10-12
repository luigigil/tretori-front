/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import axios from 'axios'
import FormPhysicalPerson from 'features/physical-person/form-physical-person'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import SubtitleDialog from 'ui/data-display/title/subtitle-dialog'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import Loading from 'ui/feedback/loading'
import FormTextField from 'ui/inputs/text-field/text-field'
import TransferList from 'ui/inputs/transfer-list/transfer-list'
import { SERVER_ERROR } from 'utils/messages'
import { CustomerType, ListItemType } from 'utils/types'
import { customerSchema } from './customers.joi.schema'
import { CustomerMessages } from './customers.messages'

interface FormCustomersProps {
  customer?: CustomerType
  shouldCreateNew: boolean
}

const FormCustomers = ({ customer, shouldCreateNew }: FormCustomersProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerType>({ resolver: joiResolver(customerSchema) })
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedContracts, setSelectedContracts] = useState<ListItemType[]>([])
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const customerTypeSelected = useWatch({
    control,
    name: 'customer_type',
  })

  const [data, error, isLoading] = useStandardFetcher({
    method: 'GET',
    url: '/contract',
  })

  if (error) {
    return <p>erro</p>
  }

  const onChangeSelectedContractsHandler = (selected: ListItemType[]): void => {
    setSelectedContracts(selected)
  }

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/customers/${customer?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(CustomerMessages.deleteSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push('/customers')
    }
  }

  // ! fix this any
  const handleEdit = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `customers/${customer?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(CustomerMessages.editSuccess, { variant: 'success' })
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
        url: 'customers',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(CustomerMessages.newSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      router.push('/customers')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNew) {
      return <TitlePage title={CustomerMessages.newTitle} onSave={handleSubmit(handleSave)} />
    }

    return (
      <TitlePage
        title={isEditing ? CustomerMessages.editTitle : CustomerMessages.detailTitle}
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
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Tipo de Cliente</FormLabel>
          <Controller
            defaultValue={customer?.customer_type || 'PHYSICAL_PERSON'}
            rules={{ required: true }}
            control={control}
            name='customer_type'
            render={({ field: { value, onChange } }) => {
              return (
                <RadioGroup value={value} onChange={onChange}>
                  <FormControlLabel
                    value='PHYSICAL_PERSON'
                    control={<Radio />}
                    label='Pessoa Física'
                  />
                  <FormControlLabel
                    value='LEGAL_PERSON'
                    control={<Radio />}
                    label='Pessoa Jurídica'
                  />
                </RadioGroup>
              )
            }}
          />
        </FormControl>
        <Box display='flex'>
          <FormTextField
            label={'Telefone'}
            name='phone'
            control={control}
            errors={errors}
            defaultValue={customer?.phone}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Telefone Secundário'}
            name='phone_secondary'
            control={control}
            errors={errors}
            defaultValue={customer?.phone_secondary}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Email'}
            name='email'
            control={control}
            errors={errors}
            defaultValue={customer?.email}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            defaultValue={customer?.cep}
            label={'CEP'}
            name='cep'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            defaultValue={customer?.address}
            label={'Endereço'}
            name='address'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            defaultValue={customer?.city}
            label={'Cidade'}
            name='city'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            defaultValue={customer?.neighborhood}
            label={'Bairro'}
            name='neighborhood'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            defaultValue={customer?.uf}
            label={'UF'}
            name='uf'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>

        {isLoading && <Loading />}

        {!isLoading && data.length > 0 && (
          <>
            <Divider style={{ marginTop: 32 }} />
            <SubtitleDialog subtitle='Contratos' />
            <TransferList
              list={data}
              listSelected={[]}
              onChange={onChangeSelectedContractsHandler}
            ></TransferList>
          </>
        )}
        <Divider style={{ margin: 32 }} />
      </Box>
      {shouldCreateNew && customerTypeSelected !== 'LEGAL_PERSON' && (
        <FormPhysicalPerson shouldCreateNewPhysicalPerson={shouldCreateNew} />
      )}
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title={CustomerMessages.deleteTitle}
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message={CustomerMessages.deleteMessage}
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormCustomers
