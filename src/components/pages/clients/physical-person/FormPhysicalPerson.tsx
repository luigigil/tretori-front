import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Button, Divider, TextField } from '@mui/material'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import contractsService from '../../../../api/contractsService'
import physicalPersonService from '../../../../api/physicalPersonService'
import { NotificationEnum } from '../../../shared/enums/notification'
import {
  PHYSICAL_PERSON_NEW_CANCEL_MESSAGE,
  PHYSICAL_PERSON_TITLE,
} from '../../../shared/messages/physical-person'
import { REQUIRED_FIELD } from '../../../shared/messages/system'
import { ContractsType } from '../../../shared/types/contracts'
import { ListItemType } from '../../../shared/types/list'
import { Severity } from '../../../shared/types/notification'
import { PhysicalPersonType } from '../../../shared/types/physical-person'
import BirthDatePicker from '../../../shared/UI/date/BirthDatePicker'
import DialogConfirm from '../../../shared/UI/dialog/DialogConfirm'
import BackdropLoading from '../../../shared/UI/loading/BackdropLoading'
import Notification from '../../../shared/UI/notification/Notification'
import SubtitleDialog from '../../../shared/UI/title/SubtitleDialog'
import TransferList from '../../../shared/UI/transfer-list/TransferList'

const schema = Joi.object({
  id: Joi.number().allow(null),
  code: Joi.any(),
  name: Joi.string().min(2).max(200).required(),
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

const parseContracts = (list: ContractsType[]): ListItemType[] => {
  return list.map((item) => ({ id: item.id, label: `Contrato ${item.id} ` }))
}

interface FormPhysicalPersonProps {
  onClose: () => void
  onConfirm: (data: PhysicalPersonType) => void
  physicalPersonId?: number
  labelButtonCancel?: string
  labelButtonConfirm?: string
}

const FormPhysicalPerson = ({
  onClose,
  onConfirm,
  physicalPersonId,
  labelButtonCancel,
  labelButtonConfirm,
}: FormPhysicalPersonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhysicalPersonType>({ resolver: joiResolver(schema) })
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false)
  const [birthdate, setBirthdate] = useState<DateTime | null>(DateTime.now())
  const [contracts, setContracts] = useState<ListItemType[]>([])
  const [selectedContracts, setSelectedContracts] = useState<ListItemType[]>([])
  const [loading, setLoading] = useState(false)
  const [editPhysicalPerson, setEditPhysicalPerson] = useState<PhysicalPersonType>()
  const [notifyMessage, setNotifyMessage] = useState('')
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [notifySeverity, setNotifySeverity] = useState<Severity['types']>('info')

  useEffect((): void => {
    const initContracts = async (): Promise<void> => {
      await getContracts()
    }
    initContracts()
  }, [])

  useEffect((): void => {
    const initPhysicalPerson = async (): Promise<void> => {
      await getPhysicalPerson()
    }
    initPhysicalPerson()
  }, [])

  useEffect(() => {
    reset(editPhysicalPerson)
  }, [editPhysicalPerson])

  const getContracts = async () => {
    setLoading(true)
    try {
      const contracts = (await contractsService.findAll()).data
      const contractsList = parseContracts(contracts)
      setContracts(contractsList.length > 0 ? contractsList : [])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        notifyError(error.message)
      }
    }
  }

  const getPhysicalPerson = async () => {
    setLoading(true)
    try {
      if (!physicalPersonId) return
      const person = (await physicalPersonService.findById(physicalPersonId)).data
      setEditPhysicalPerson(person)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        notifyError(error.message)
      }
    }
  }

  const onSubmit = (data: PhysicalPersonType) => {
    if (!birthdate) return
    data.code = ''
    data.birthdate = birthdate
    data.contracts = selectedContracts.map((contract) => `${contract.id}`)
    onConfirm(data)
  }

  const onChangeSelectedContractsHandler = (selected: ListItemType[]): void => {
    setSelectedContracts(selected)
  }

  const onCancelHandler = () => {
    setOpenCancelConfirm(true)
  }

  const onCloseHandler = () => {
    setOpenCancelConfirm(false)
  }

  const notifyError = (message: string): void => {
    setNotifyOpen(true)
    setNotifySeverity(NotificationEnum.ERROR)
    setNotifyMessage(message)
  }

  const onCloseNotifyHandler = (): void => {
    setNotifyOpen(false)
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
          defaultValue={editPhysicalPerson?.name}
          {...register('name')}
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
        />
        <TextField
          label='RG'
          required
          error={!!errors.rg}
          helperText={errors.rg?.type === 'required' && REQUIRED_FIELD}
          {...register('rg')}
        />
        <TextField
          label='Órgão Emissor'
          required
          error={!!errors.rg_emissor}
          helperText={errors.rg_emissor?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor')}
        />
        <TextField
          label='Órgão Emissor UF'
          required
          error={!!errors.rg_emissor_uf}
          helperText={errors.rg_emissor_uf?.type === 'required' && REQUIRED_FIELD}
          {...register('rg_emissor_uf')}
        />
        <TextField
          label='Telefone'
          required
          error={!!errors.phone}
          helperText={errors.phone?.type === 'required' && REQUIRED_FIELD}
          {...register('phone')}
        />
        <TextField label='Telefone Secundário' {...register('phone_secondary')} />
        <TextField
          label='Email'
          required
          error={!!errors.email}
          helperText={errors.email?.type === 'required' && REQUIRED_FIELD}
          {...register('email')}
        />
        <TextField label='CEP' {...register('cep')} />
        <TextField label='Endereço' {...register('address')} />
        <TextField label='Cidade' {...register('city')} />
        <TextField label='Bairro' {...register('neighborhood')} />
        <TextField label='UF' {...register('uf')} />
        {contracts.length > 0 && (
          <>
            <Divider></Divider>
            <SubtitleDialog subtitle='Contratos' />
            <TransferList
              list={contracts}
              listSelected={[]}
              onChange={onChangeSelectedContractsHandler}
            ></TransferList>
          </>
        )}
        <Divider></Divider>
      </Box>
      <Box sx={{ float: 'right' }}>
        <Button onClick={onCancelHandler}>{labelButtonCancel || 'Cancelar'}</Button>
        <Button onClick={handleSubmit(onSubmit)}>{labelButtonConfirm || 'Salvar'}</Button>
      </Box>

      <DialogConfirm
        open={openCancelConfirm}
        onClose={onCloseHandler}
        onConfirm={() => {
          onCloseHandler()
          onClose()
        }}
        title={`Cancelar ${PHYSICAL_PERSON_TITLE}`}
        message={PHYSICAL_PERSON_NEW_CANCEL_MESSAGE}
      ></DialogConfirm>
      <BackdropLoading open={loading}></BackdropLoading>
      <Notification
        message={notifyMessage}
        severity={notifySeverity}
        open={notifyOpen}
        onClose={onCloseNotifyHandler}
      ></Notification>
    </>
  )
}

export default FormPhysicalPerson
