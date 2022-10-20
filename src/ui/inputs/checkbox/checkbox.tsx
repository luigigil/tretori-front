import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { INVALID_INPUT } from 'utils/messages'

interface FormCheckboxProps {
  label: string
  name: string
  control: Control<any, any>
  errors?: any
  defaultValue?: boolean
  disabled?: boolean
  type?: string
}

const FormCheckbox = ({
  label,
  name,
  control,
  errors = {},
  defaultValue = false,
  disabled = false,
}: FormCheckboxProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        control={
          <Controller
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} disabled={disabled} />
            )}
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={{ required: { value: true, message: INVALID_INPUT } }}
          />
        }
      />
      {Boolean(errors[name]) && (
        <FormHelperText error={true}>{errors[name].message}</FormHelperText>
      )}
    </FormGroup>
  )
}

export default FormCheckbox
