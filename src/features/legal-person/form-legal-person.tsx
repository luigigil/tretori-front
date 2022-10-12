/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SubtitleDialog from 'ui/data-display/title/subtitle-dialog'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import Loading from 'ui/feedback/loading'
import FormTextField from 'ui/inputs/text-field/text-field'
import TransferList from 'ui/inputs/transfer-list/transfer-list'
import { SERVER_ERROR } from 'utils/messages'
import { CustomerType, LegalPersonType, ListItemType } from 'utils/types'
import { legalPersonSchema } from './legal-person.joi.schema'
import { LegalPersonMessages } from './legal-person.messages'

interface FormLegalPersonProps {
  customer: CustomerType
  legalPerson?: LegalPersonType
  shouldCreateNew: boolean
}

const FormLegalPerson = ({ customer, legalPerson, shouldCreateNew }: FormLegalPersonProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LegalPersonType>({ resolver: joiResolver(legalPersonSchema) })
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedContracts, setSelectedContracts] = useState<ListItemType[]>([])
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

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
        url: `/legal-person/${legalPerson?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(LegalPersonMessages.deleteSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push('/legal-person')
    }
  }

  // ! fix this any
  const handleEdit = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `legal-person/${legalPerson?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: { ...data, customer },
      })
      enqueueSnackbar(LegalPersonMessages.editSuccess, { variant: 'success' })
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
        url: 'legal-person',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data: { ...data, customer },
      })
      enqueueSnackbar(LegalPersonMessages.newSuccess, { variant: 'success' })
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
    if (shouldCreateNew) {
      return <TitlePage title={LegalPersonMessages.newTitle} onSave={handleSubmit(handleSave)} />
    }

    return (
      <TitlePage
        title={isEditing ? LegalPersonMessages.editTitle : LegalPersonMessages.detailTitle}
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
            label={'CNPJ'}
            name='cnpj'
            control={control}
            errors={errors}
            defaultValue={legalPerson?.cnpj}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Nome Fantasia'}
            name='fantasy_name'
            control={control}
            errors={errors}
            defaultValue={legalPerson?.fantasy_name}
            disabled={!isEditing && !shouldCreateNew}
          />
        </Box>

        <Box display='flex'>
          <FormTextField
            label={'Razão Social'}
            name='social_reason'
            control={control}
            errors={errors}
            defaultValue={legalPerson?.social_reason}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={legalPerson?.type}
            disabled={!isEditing && !shouldCreateNew}
          />
          <FormTextField
            label={'Tamanho'}
            name='size'
            control={control}
            errors={errors}
            defaultValue={legalPerson?.size}
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
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title={LegalPersonMessages.deleteTitle}
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message={LegalPersonMessages.deleteMessage}
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormLegalPerson
