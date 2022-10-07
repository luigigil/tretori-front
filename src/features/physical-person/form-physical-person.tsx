import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Button, Divider } from '@mui/material'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import BirthDatePicker from '../../ui/date/birth-date-picker'
import FormTextField from '../../ui/form/inputs/text-field'
import Loading from '../../ui/loading'
import SubtitleDialog from '../../ui/title/subtitle-dialog'
import TransferList from '../../ui/transfer-list/transfer-list'
import { REQUIRED_FIELD } from '../../utils/messages'
import { ListItemType, PhysicalPersonType } from '../../utils/types'

/* eslint-disable camelcase */
const schema = Joi.object({
  id: Joi.number().allow(null),
  code: Joi.any(),
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.any(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().max(20).required(),
  rg_emissor: Joi.string().max(20).required(),
  rg_emissor_uf: Joi.string().max(20).required(),
  phone: Joi.string().max(25).required(),
  email: Joi.string()
    .max(250)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone_secondary: Joi.string().max(25).allow(null, ''),
  cep: Joi.string().max(20).allow(null, ''),
  address: Joi.string().max(250).allow(null, ''),
  city: Joi.string().max(100).allow(null, ''),
  neighborhood: Joi.string().max(250).allow(null, ''),
  uf: Joi.string().max(20).allow(null, ''),
  contracts: Joi.array().items(Joi.string()),
})

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
  } = useForm<PhysicalPersonType>({ resolver: joiResolver(schema) })
  const [birthdate, setBirthdate] = useState<string | undefined>(DateTime.now().toISO())
  const [selectedContracts, setSelectedContracts] = useState<ListItemType[]>([])

  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: '/contract',
  })

  if (error) {
    return <p>erro</p>
  }

  const onSubmit = (data: PhysicalPersonType) => {
    console.log(data)
  }

  const onChangeSelectedContractsHandler = (selected: ListItemType[]): void => {
    setSelectedContracts(selected)
  }

  return (
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
        />
        <FormTextField
          label={'CPF'}
          name='cpf'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.cpf}
        />
      </Box>

      <Box display='flex'>
        <FormTextField
          label={'RG'}
          name='rg'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.rg}
        />
        <FormTextField
          label={'Órgão Emissor'}
          name='rg_emissor'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.rg_emissor}
        />
        <FormTextField
          label={'Órgão Emissor UF'}
          name='rg_emissor_uf'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.rg_emissor_uf}
        />

        <BirthDatePicker
          required
          helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
          value={birthdate}
          onChange={(newValue: DateTime | null) => {
            setBirthdate(newValue?.toISODate())
          }}
        ></BirthDatePicker>
      </Box>
      <Box display='flex'>
        <FormTextField
          label={'Telefone'}
          name='phone'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.phone}
        />
        <FormTextField
          label={'Telefone Secundário'}
          name='phone_secondary'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.phone_secondary}
        />
        <FormTextField
          label={'Email'}
          name='email'
          control={control}
          errors={errors}
          defaultValue={physicalPerson?.email}
        />
      </Box>
      <Box display='flex'>
        <FormTextField
          defaultValue={physicalPerson?.cep}
          label={'CEP'}
          name='cep'
          control={control}
          errors={errors}
        />
        <FormTextField
          defaultValue={physicalPerson?.address}
          label={'Endereço'}
          name='address'
          control={control}
          errors={errors}
        />
        <FormTextField
          defaultValue={physicalPerson?.city}
          label={'Cidade'}
          name='city'
          control={control}
          errors={errors}
        />
        <FormTextField
          defaultValue={physicalPerson?.neighborhood}
          label={'Bairro'}
          name='neighborhood'
          control={control}
          errors={errors}
        />
        <FormTextField
          defaultValue={physicalPerson?.uf}
          label={'UF'}
          name='uf'
          control={control}
          errors={errors}
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
      <Divider style={{ marginTop: 32 }} />
    </Box>
  )
}

export default FormPhysicalPerson
