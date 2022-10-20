import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { INVALID_INPUT } from 'utils/messages'

interface FormTextFieldProps {
  // TODO check how to use generic types
  id?: string
  label: string
  name: string
  control: Control<any, any>
  errors?: any
  defaultValue?: string
  disabled?: boolean
  type?: string
}

const FormTextField = ({
  id,
  label,
  name,
  control,
  errors = {},
  defaultValue = '',
  disabled = false,
  type = 'text',
}: FormTextFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          id={id}
          type={type}
          fullWidth
          {...field}
          label={label}
          error={Boolean(errors[name])}
          helperText={errors[name] ? errors[name].message : ''}
          disabled={disabled}
        />
      )}
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: { value: true, message: INVALID_INPUT } }}
    />
  )
}

export default FormTextField
