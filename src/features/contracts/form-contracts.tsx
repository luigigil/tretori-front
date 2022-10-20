/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Table from 'ui/data-display/table'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import FormCheckbox from 'ui/inputs/checkbox/checkbox'
import DatePicker from 'ui/inputs/date/date-picker'
import FormTextField from 'ui/inputs/text-field/text-field'
import { SERVER_ERROR } from 'utils/messages'
import { ContractType, CustomerType, ProductType } from 'utils/types'
import { contractSchema } from './contract.joi.schema'
import { ContractMessages } from './contract.messages'
import { CONTRACT_MOVEMENT_TABLE_FIELDS, CONTRACT_RENEWAL_TABLE_FIELDS } from './info'

interface FormContractProps {
  contract?: ContractType
  shouldCreateNew: boolean
}

const FormContract = ({ contract, shouldCreateNew }: FormContractProps) => {
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
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | undefined>(
    contract?.customer,
  )
  const [selectedProduct, setSelectedProduct] = useState<ProductType | undefined>(contract?.product)

  const [dataCustomers, errorCustomers, isLoadingCustomers] = useStandardFetcher({
    method: 'GET',
    url: '/customers',
  })

  const [dataProduct, errorProduct, isLoadingProduct] = useStandardFetcher({
    method: 'GET',
    url: '/products',
  })

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/contracts/${contract?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(ContractMessages.deleteSuccess, { variant: 'success' })
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
        url: `/contracts/${contract?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: {
          contract: {
            policy: data.policy,
            size: data.size,
            type: data.type,
            version: data.version,
            number_of_lives: data.number_of_lives,
            validity_start: data.validity_start,
            validity_end: data.validity_end,
            validity_time: data.validity_time,
            inclusion_period: data.inclusion_period,
            cutoff_date: data.cutoff_date,
            email_on_insurancy: data.email_on_insurancy,
            phone_on_insurancy: data.phone_on_insurancy,
            copay: data.copay,
            adhesion: data.adhesion,
            copay_perc: data.copay_perc,
            contributor_perc: data.contributor_perc,
            copay_details: data.copay_details,
            cost: data.cost,
            invoice_amount: data.invoice_amount,
            total_contract_value: data.total_contract_value,
            first_invoice_date: data.first_invoice_date,
            customer: selectedCustomer,
            product: selectedProduct,
          },
          access: {
            login_client: data.login_client,
            login_tret: data.login_tret,
            system: data.system,
            pass_client: data.pass_client,
            pass_tret: data.pass_tret,
          },
        },
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
  const handleSave = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/contracts',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: {
          policy: data.policy,
          size: data.size,
          type: data.type,
          version: data.version,
          number_of_lives: data.number_of_lives,
          validity_start: data.validity_start,
          validity_end: data.validity_end,
          validity_time: data.validity_time,
          inclusion_period: data.inclusion_period,
          cutoff_date: data.cutoff_date,
          email_on_insurancy: data.email_on_insurancy,
          phone_on_insurancy: data.phone_on_insurancy,
          copay: data.copay,
          adhesion: data.adhesion,
          copay_perc: data.copay_perc,
          contributor_perc: data.contributor_perc,
          copay_details: data.copay_details,
          cost: data.cost,
          invoice_amount: data.invoice_amount,
          total_contract_value: data.total_contract_value,
          first_invoice_date: data.first_invoice_date,
          customer: selectedCustomer,
          product: selectedProduct,
        },
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
    if (shouldCreateNew) {
      return <TitlePage title={ContractMessages.newTitle} onSave={handleSubmit(handleSave)} />
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
        <Typography>Contrato</Typography>
        <Box display='flex'>
          <FormTextField
            label={'Apólice'}
            name='policy'
            control={control}
            errors={errors}
            defaultValue={contract?.policy}
            disabled={!isEditing && !shouldCreateNew}
          />

          <FormTextField
            label={'Tamanho'}
            name='size'
            control={control}
            errors={errors}
            defaultValue={contract?.size}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={contract?.type}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Versão'}
            name='version'
            control={control}
            errors={errors}
            defaultValue={contract?.version.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />

          <FormTextField
            label={'Número de vidas'}
            name='number_of_lives'
            control={control}
            errors={errors}
            defaultValue={contract?.number_of_lives.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <DatePicker
            label={'Início de Vigência'}
            name='validity_start'
            control={control}
            defaultValue={contract?.validity_start}
            disabled={!isEditing && !shouldCreateNew}
          />
          <DatePicker
            label={'Fim de Vigência'}
            name='validity_end'
            control={control}
            defaultValue={contract?.validity_end}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Tempo de Vigência'}
            name='validity_time'
            control={control}
            errors={errors}
            defaultValue={contract?.validity_time.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Período de Inclusão'}
            name='inclusion_period'
            control={control}
            errors={errors}
            defaultValue={contract?.inclusion_period}
            disabled={!isEditing && !shouldCreateNew}
          />
          <DatePicker
            label={'Data de Corte'}
            name='cutoff_date'
            control={control}
            defaultValue={contract?.cutoff_date}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Email na Seguradora'}
            name='email_on_insurancy'
            control={control}
            errors={errors}
            defaultValue={contract?.email_on_insurancy}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Telefone na Seguradora'}
            name='phone_on_insurancy'
            control={control}
            errors={errors}
            defaultValue={contract?.phone_on_insurancy}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <FormCheckbox
            label={'Copay'}
            name='copay'
            control={control}
            errors={errors}
            defaultValue={contract?.copay}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormCheckbox
            label={'Adesão'}
            name='adhesion'
            control={control}
            errors={errors}
            defaultValue={contract?.adhesion}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Copay perc'}
            name='copay_perc'
            control={control}
            errors={errors}
            defaultValue={contract?.copay_perc.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Contributor perc'}
            name='contributor_perc'
            control={control}
            errors={errors}
            defaultValue={contract?.contributor_perc.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            label={'Copay detalhes'}
            name='copay_details'
            control={control}
            errors={errors}
            defaultValue={contract?.copay_details}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Custo'}
            name='cost'
            control={control}
            errors={errors}
            defaultValue={contract?.cost.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Valor da nota'}
            name='invoice_amount'
            control={control}
            errors={errors}
            defaultValue={contract?.invoice_amount.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Valor total do contrato'}
            name='total_contract_value'
            control={control}
            errors={errors}
            defaultValue={contract?.total_contract_value.toString()}
            disabled={!isEditing && !shouldCreateNew}
          />
          <DatePicker
            label={'Data da primeira nota'}
            name='first_invoice_date'
            control={control}
            defaultValue={contract?.first_invoice_date}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>
        {!shouldCreateNew && (
          <>
            {!isLoadingProduct && !isLoadingCustomers && (
              <>
                <Typography>Produto</Typography>
                <Autocomplete
                  disabled={!isEditing && !shouldCreateNew}
                  defaultValue={dataProduct?.find(
                    (item: ProductType) => item.id === contract?.product?.id,
                  )}
                  disablePortal
                  id='combo-box-product'
                  options={dataProduct}
                  getOptionLabel={(option: any) => option.name}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_, value) => {
                    setSelectedProduct(
                      dataProduct.find((item: ProductType) => item.id === value?.id),
                    )
                  }}
                />
                <Typography>Cliente</Typography>
                <Autocomplete
                  disabled={!isEditing && !shouldCreateNew}
                  defaultValue={dataCustomers?.find(
                    (item: CustomerType) => item.code === contract?.customer?.code,
                  )}
                  disablePortal
                  id='combo-box-cliente'
                  options={dataCustomers}
                  getOptionLabel={(option: any) => option.code}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_, value) => {
                    setSelectedCustomer(
                      dataCustomers.find((item: CustomerType) => item.code === value?.code),
                    )
                  }}
                />
              </>
            )}
            <Box>
              <Typography>Acesso</Typography>
              <FormTextField
                label={'Sistema'}
                name='system'
                control={control}
                errors={errors}
                defaultValue={contract?.access?.system}
                disabled={!isEditing && !shouldCreateNew}
              />
              <Box display='flex'>
                <FormTextField
                  label={'Login Cliente'}
                  name='login_client'
                  control={control}
                  errors={errors}
                  defaultValue={contract?.access?.login_client}
                  disabled={!isEditing && !shouldCreateNew}
                />
                <FormTextField
                  label={'Senha Cliente'}
                  name='pass_client'
                  control={control}
                  errors={errors}
                  defaultValue={contract?.access?.pass_client}
                  disabled={!isEditing && !shouldCreateNew}
                  type='password'
                />
              </Box>
              <Box display='flex'>
                <FormTextField
                  label={'Login Tretori'}
                  name='login_tret'
                  control={control}
                  errors={errors}
                  defaultValue={contract?.access?.login_tret}
                  disabled={!isEditing && !shouldCreateNew}
                />
                <FormTextField
                  label={'Senha Tretori'}
                  name='pass_tret'
                  control={control}
                  errors={errors}
                  defaultValue={contract?.access?.pass_tret}
                  disabled={!isEditing && !shouldCreateNew}
                  type='password'
                />
              </Box>
            </Box>
            <Box>
              <Typography>Renovações</Typography>
              <Button
                id='add-renewal-btn'
                onClick={() =>
                  router.push({
                    pathname: '/renewals/create',
                    query: { contractId: contract?.id },
                  })
                }
              >
                Nova Renovação
              </Button>
              <Table columns={CONTRACT_RENEWAL_TABLE_FIELDS} rows={contract?.renew || []}></Table>
            </Box>
            <Box>
              <Typography>Movimentações</Typography>
              <Button
                id='add-movement-btn'
                onClick={() =>
                  router.push({
                    pathname: '/movements/create',
                    query: { contractId: contract?.id },
                  })
                }
              >
                Nova Movimentação
              </Button>
              <Table columns={CONTRACT_MOVEMENT_TABLE_FIELDS} rows={contract?.move || []}></Table>
            </Box>
          </>
        )}
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
