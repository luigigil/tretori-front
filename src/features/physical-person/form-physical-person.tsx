/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSnackBar } from 'context/snackbar-context'
import useStandardFetcher from 'hooks/useStandardFetcher'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SubtitleDialog from 'ui/data-display/title/subtitle-dialog'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import Loading from 'ui/feedback/loading'
import DatePicker from 'ui/inputs/date/date-picker'
import FormTextField from 'ui/inputs/form/inputs/text-field'
import TransferList from 'ui/inputs/transfer-list/transfer-list'
import { REQUIRED_FIELD } from 'utils/messages'
import { ListItemType, PhysicalPersonType } from 'utils/types'
import { physicalPersonSchema } from './physical-person.joi.schema'
import { PhysicalPersonMessages } from './physical-person.messages'

interface FormPhysicalPersonProps {
  physicalPerson?: PhysicalPersonType
  shouldCreateNewPhysicalPerson: boolean
}

const FormPhysicalPerson = ({
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
  const [selectedContracts, setSelectedContracts] = useState<ListItemType[]>([])
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // const { addAlert } = useSnackBars()
  const { showSnackBar } = useSnackBar()

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
      const response = await axios.request({
        method: 'DELETE',
        url: `/physical-person/${physicalPerson?.id}`,
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
      router.push('/physical-person')
    }
  }

  // ! fix this any
  const handleEditPhysicalPerson = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      const response = await axios.request({
        method: 'PUT',
        url: `physical-person/${physicalPerson?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
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
      const response = await axios.request({
        method: 'POST',
        url: 'physical-person',
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
      router.push('/physical-person')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewPhysicalPerson) {
      return (
        <TitlePage
          title={PhysicalPersonMessages.newTitle}
          onSave={handleSubmit(handleSavePhysicalPerson)}
        />
      )
    }

    return (
      <TitlePage
        title={isEditing ? PhysicalPersonMessages.editTitle : PhysicalPersonMessages.detailTitle}
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
            required
            helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
            defaultValue={physicalPerson ? physicalPerson.birthdate : undefined}
            label='Data de Nascimento'
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
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
            defaultValue={physicalPerson?.phone}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            label={'Telefone Secundário'}
            name='phone_secondary'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.phone_secondary}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            label={'Email'}
            name='email'
            control={control}
            errors={errors}
            defaultValue={physicalPerson?.email}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
        </Box>
        <Box display='flex'>
          <FormTextField
            defaultValue={physicalPerson?.cep}
            label={'CEP'}
            name='cep'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            defaultValue={physicalPerson?.address}
            label={'Endereço'}
            name='address'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            defaultValue={physicalPerson?.city}
            label={'Cidade'}
            name='city'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            defaultValue={physicalPerson?.neighborhood}
            label={'Bairro'}
            name='neighborhood'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
          />
          <FormTextField
            defaultValue={physicalPerson?.uf}
            label={'UF'}
            name='uf'
            control={control}
            errors={errors}
            disabled={!isEditing && !shouldCreateNewPhysicalPerson}
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
        title='Deletar Pessoa Física'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormPhysicalPerson
