import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

interface FormTextFieldProps {
  // TODO check how to use generic types
  label: string
  name: string
  control: Control<any, any>
  errors?: any
  defaultValue?: string
}

const FormTextField = ({
  label,
  name,
  control,
  errors = {},
  defaultValue = '',
}: FormTextFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={Boolean(errors[name])}
          helperText={errors[name] ? errors[name].message : ''}
        />
      )}
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: { value: true, message: 'Invalid input' } }}
    />
  )
}

export default FormTextField
