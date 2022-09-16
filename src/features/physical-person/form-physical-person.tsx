import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Button, Divider } from '@mui/material'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import contractsService from '../../api/contractsService'
import physicalPersonService from '../../api/physicalPersonService'
import BirthDatePicker from '../../ui/date/birth-date-picker'
import DialogConfirm from '../../ui/dialog/dialog-confirm'
import FormTextField from '../../ui/form/inputs/text-field'
import BackdropLoading from '../../ui/loading/backdrop-loading'
import Notification from '../../ui/notification/notification'
import SubtitleDialog from '../../ui/title/subtitle-dialog'
import TransferList from '../../ui/transfer-list/transfer-list'
import { NotificationEnum } from '../../utils/enums/notification'
import { MS_CANCEL } from '../../utils/messages/common'
import { MS_PHYSICAL_PERSON } from '../../utils/messages/physical-person'
import { REQUIRED_FIELD } from '../../utils/messages/system'
import { ContractsType } from '../../utils/types/contracts'
import { ListItemType } from '../../utils/types/list'
import { Severity } from '../../utils/types/notification'
import { PhysicalPersonType } from '../../utils/types/physical-person'

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
/* eslint-enable camelcase */

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
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PhysicalPersonType>({ resolver: joiResolver(schema) })
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false)
  const [birthdate, setBirthdate] = useState<string | undefined>(DateTime.now().toISO())
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
    if (!editPhysicalPerson) return
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
      physicalPersonId ? initEditPhysicalPerson(physicalPersonId) : initNewPhysicalPerson()
      return
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        notifyError(error.message)
      }
    }
  }

  const initNewPhysicalPerson = () => {
    reset({})
  }

  const initEditPhysicalPerson = async (id: number) => {
    const person = (await physicalPersonService.findById(id)).data
    setBirthdate(person.birthdate)
    setEditPhysicalPerson(person)
    setLoading(false)
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
        <FormTextField label={'Nome'} name='name' control={control} errors={errors} />
        <BirthDatePicker
          required
          helperText={errors.birthdate?.type === 'required' && REQUIRED_FIELD}
          value={birthdate}
          onChange={(newValue: DateTime | null) => {
            setBirthdate(newValue?.toISODate())
          }}
        ></BirthDatePicker>
        <FormTextField label={'CPF'} name='cpf' control={control} errors={errors} />
        <FormTextField label={'RG'} name='rg' control={control} errors={errors} />
        <FormTextField
          label={'Órgão Emissor'}
          name='rg_emissor'
          control={control}
          errors={errors}
        />
        <FormTextField
          label={'Órgão Emissor UF'}
          name='rg_emissor_uf'
          control={control}
          errors={errors}
        />
        <FormTextField label={'Telefone'} name='phone' control={control} errors={errors} />
        <FormTextField
          label={'Telefone Secundário'}
          name='phone_secondary'
          control={control}
          errors={errors}
        />
        <FormTextField label={'Email'} name='email' control={control} errors={errors} />
        <FormTextField label={'CEP'} name='cep' control={control} errors={errors} />
        <FormTextField label={'Endereço'} name='address' control={control} errors={errors} />
        <FormTextField label={'Cidade'} name='city' control={control} errors={errors} />
        <FormTextField label={'Bairro'} name='neighborhood' control={control} errors={errors} />
        <FormTextField label={'UF'} name='uf' control={control} errors={errors} />

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
        title={`Cancelar ${physicalPersonId ? 'Edição' : 'Cadastro'} de ${MS_PHYSICAL_PERSON}`}
        message={MS_CANCEL}
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
