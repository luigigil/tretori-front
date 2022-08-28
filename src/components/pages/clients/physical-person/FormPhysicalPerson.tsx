import { Box, Button, TextField } from '@mui/material'
import Joi from 'joi'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  PHYSICAL_PERSON_NEW_CANCEL_MESSAGE,
  PHYSICAL_PERSON_TITLE,
} from '../../../shared/messages/physical-person'
import { REQUIRED_FIELD } from '../../../shared/messages/system'
import { PhysicalPersonType } from '../../../shared/types/physical-person'
import BirthDatePicker from '../../../shared/UI/date/BirthDatePicker'
import DialogConfirm from '../../../shared/UI/dialog/DialogConfirm'
import { joiResolver } from '@hookform/resolvers/joi'

interface FormPhysicalPersonType {
  onClose: any
  onConfirm: any
  physicalPerson?: PhysicalPersonType
  labelButtonCancel?: string
  labelButtonConfirm?: string
}

const defaultValues = {
  phone: '',
  phone_secondary: '',
  address: '',
  cep: '',
  city: '',
  neighborhood: '',
  uf: '',
  email: '',
  name: '',
  birthdate: '',
  cpf: '',
  rg: '',
  rg_emissor: '',
  rg_emissor_uf: '',
  contracts: [],
}

const schema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.required(),
  cpf: Joi.string().required(),
  rg: Joi.string().required(),
  rg_emissor: Joi.string().required(),
  rg_emissor_uf: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  phone_secondary: Joi.string() || null,
  cep: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  neighborhood: Joi.string(),
  uf: Joi.string(),
})

const FormPhysicalPerson = ({
  physicalPerson = defaultValues,
  ...props
}: FormPhysicalPersonType) => {
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false)
  const [birthdate, setBirthdate] = useState<DateTime | null>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhysicalPersonType>({ defaultValues, resolver: joiResolver(schema) })

  const onSubmit = (data: any) => {
    console.log(data)
    props.onConfirm(data)
  }

  const onCancelHandler = () => {
    setOpenCancelConfirm(true)
  }

  const onCloseHandler = () => {
    setOpenCancelConfirm(false)
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          label='Nome'
          required
          error={!!errors.name}
          helperText={errors.name?.type === 'required' && REQUIRED_FIELD}
          {...register('name')}
          defaultValue={physicalPerson?.name}
        />
        <BirthDatePicker
          required
          helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
          value={birthdate}
          onChange={(newValue: DateTime | null) => {
            setBirthdate(newValue)
          }}
        ></BirthDatePicker>
        <TextField
          label='CPF'
          required
          error={!!errors.cpf}
          helperText={errors.cpf?.type === 'required' && REQUIRED_FIELD}
          {...register('cpf')}
          defaultValue={physicalPerson?.cpf}
        />
        <TextField
          label='RG'
          required
          error={!!errors.rg}
          helperText={errors.rg?.type === 'required' && REQUIRED_FIELD}
          {...register('rg')}
          defaultValue={physicalPerson?.rg}
        />
        <TextField
          label='Órgão Emissor'
          required
          error={!!errors.rg_emissor}
          helperText={errors.rg_emissor?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor')}
          defaultValue={physicalPerson?.rg_emissor}
        />
        <TextField
          label='Órgão Emissor UF'
          required
          error={!!errors.rg_emissor_uf}
          helperText={errors.rg_emissor_uf?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor_uf')}
          defaultValue={physicalPerson?.rg_emissor_uf}
        />
        <TextField
          label='Telefone'
          required
          error={!!errors.phone}
          helperText={errors.phone?.type === 'required' && REQUIRED_FIELD}
          {...register('phone')}
          defaultValue={physicalPerson?.phone}
        />
        <TextField
          label='Telefone Secundário'
          {...register('phone_secondary')}
          defaultValue={physicalPerson?.phone_secondary}
        />
        <TextField
          label='Email'
          required
          error={!!errors.email}
          helperText={errors.email?.type === 'required' && REQUIRED_FIELD}
          {...register('email')}
          defaultValue={physicalPerson?.email}
        />
        <TextField label='CEP' {...register('cep')} defaultValue={physicalPerson?.cep} />
        <TextField
          label='Endereço'
          {...register('address')}
          defaultValue={physicalPerson?.address}
        />
        <TextField label='Cidade' {...register('city')} defaultValue={physicalPerson?.city} />
        <TextField
          label='Bairro'
          {...register('neighborhood')}
          defaultValue={physicalPerson?.neighborhood}
        />
        <TextField label='UF' {...register('uf')} defaultValue={physicalPerson?.uf} />
        {/* Contratos (Vinculação) */}
      </Box>
      <Box sx={{ float: 'right' }}>
        <Button onClick={onCancelHandler}>{props.labelButtonCancel || 'Cancelar'}</Button>
        <Button onClick={handleSubmit(onSubmit)}>{props.labelButtonConfirm || 'Salvar'}</Button>
      </Box>
      <DialogConfirm
        open={openCancelConfirm}
        onClose={onCloseHandler}
        onConfirm={() => {
          onCloseHandler()
          props.onClose()
        }}
        title={`Cancelar ${PHYSICAL_PERSON_TITLE}`}
        message={PHYSICAL_PERSON_NEW_CANCEL_MESSAGE}
      ></DialogConfirm>
    </>
  )
}

export default FormPhysicalPerson
