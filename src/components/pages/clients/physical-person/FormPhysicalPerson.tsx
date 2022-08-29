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
  id: null,
  name: '',
  birthdate: '',
  cpf: '',
  rg: '',
  rg_emissor: '',
  rg_emissor_uf: '',
  phone: '',
  email: '',
  phone_secondary: '',
  cep: '',
  address: '',
  city: '',
  neighborhood: '',
  uf: '',
  // contracts: [],
}

const schema = Joi.object({
  id: Joi.number().allow(null),
  name: Joi.string().min(2).max(200).required(),
  birthdate: Joi.required(),
  cpf: Joi.string().required(),
  rg: Joi.string().required(),
  rg_emissor: Joi.string().required(),
  rg_emissor_uf: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  phone_secondary: Joi.string().allow(null, ''),
  cep: Joi.string().allow(null, ''),
  address: Joi.string().allow(null, ''),
  city: Joi.string().allow(null, ''),
  neighborhood: Joi.string().allow(null, ''),
  uf: Joi.string().allow(null, ''),
  // contracts: Joi.array().allow(null, [])
})

const FormPhysicalPerson = (props: FormPhysicalPersonType) => {
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false)
  const [birthdate, setBirthdate] = useState<DateTime | null>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhysicalPersonType>({ defaultValues: defaultValues, resolver: joiResolver(schema) })

  const onSubmit = (data: any) => {
    console.log('vamo poura')
    console.log(data)
    // props.onConfirm(data)
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
          defaultValue={props.physicalPerson?.name}
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
          defaultValue={props.physicalPerson?.cpf}
        />
        <TextField
          label='RG'
          required
          error={!!errors.rg}
          helperText={errors.rg?.type === 'required' && REQUIRED_FIELD}
          {...register('rg')}
          defaultValue={props.physicalPerson?.rg}
        />
        <TextField
          label='Órgão Emissor'
          required
          error={!!errors.rg_emissor}
          helperText={errors.rg_emissor?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor')}
          defaultValue={props.physicalPerson?.rg_emissor}
        />
        <TextField
          label='Órgão Emissor UF'
          required
          error={!!errors.rg_emissor_uf}
          helperText={errors.rg_emissor_uf?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor_uf')}
          defaultValue={props.physicalPerson?.rg_emissor_uf}
        />
        <TextField
          label='Telefone'
          required
          error={!!errors.phone}
          helperText={errors.phone?.type === 'required' && REQUIRED_FIELD}
          {...register('phone')}
          defaultValue={props.physicalPerson?.phone}
        />
        <TextField
          label='Telefone Secundário'
          helperText={`${errors.phone_secondary?.type}`}
          {...register('phone_secondary')}
          defaultValue={props.physicalPerson?.phone_secondary}
        />
        <TextField
          label='Email'
          required
          error={!!errors.email}
          helperText={errors.email?.type === 'required' && REQUIRED_FIELD}
          {...register('email')}
          defaultValue={props.physicalPerson?.email}
        />
        <TextField label='CEP' {...register('cep')} defaultValue={props.physicalPerson?.cep} />
        <TextField
          label='Endereço'
          {...register('address')}
          defaultValue={props.physicalPerson?.address}
        />
        <TextField label='Cidade' {...register('city')} defaultValue={props.physicalPerson?.city} />
        <TextField
          label='Bairro'
          {...register('neighborhood')}
          defaultValue={props.physicalPerson?.neighborhood}
        />
        <TextField label='UF' {...register('uf')} defaultValue={props.physicalPerson?.uf} />
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
