/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider, Typography } from '@mui/material'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DatePicker from 'ui/inputs/date/date-picker'
import FormTextField from 'ui/inputs/text-field/text-field'
import { SERVER_ERROR } from 'utils/messages'
import { RenewalType } from 'utils/types'
import { renewalSchema } from './renewal.joi.schema'
import { RenewalMessages } from './renewal.messages'

interface FormRenewalProps {
  contractId?: string
  renewal?: RenewalType
}

const FormRenewal = ({ contractId, renewal }: FormRenewalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RenewalType>({ resolver: joiResolver(renewalSchema) })
  const { data: session } = useSession()
  const router = useRouter()
  const [, setIsLoadingRequest] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  // ! fix this any
  const handleSave = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: `/contracts/${contractId}/renew`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(RenewalMessages.newSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      router.push(`/contracts/${contractId}`)
    }
  }

  const titlePageComponent = () => {
    return <TitlePage title={RenewalMessages.newTitle} onSave={handleSubmit(handleSave)} />
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
          <Typography>
            <b>{contractId}</b>
          </Typography>
        </Box>
        <Box display='flex'>
          <DatePicker
            defaultValue={renewal?.proposed_date}
            label={'Data Proposta'}
            name='proposed_date'
            control={control}
          />
          <FormTextField
            defaultValue={renewal?.proposed_adjustment}
            label={'Ajuste Proposto'}
            name='proposed_adjustment'
            control={control}
            errors={errors}
          />
        </Box>
        <Box display='flex'>
          <DatePicker
            label={'Data de Fechamento'}
            name='closed_date'
            control={control}
            defaultValue={renewal?.closed_date}
          />
          <FormTextField
            label={'Valor de Fechamento'}
            name='closed_value'
            defaultValue={renewal?.closed_value}
            control={control}
            errors={errors}
          />
        </Box>
        <FormTextField
          label='Detalhes'
          name='details'
          control={control}
          defaultValue={renewal?.details}
          errors={errors}
        ></FormTextField>

        <Divider style={{ margin: 32 }} />
      </Box>
    </>
  )
}

export default FormRenewal
