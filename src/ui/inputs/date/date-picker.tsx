import { TextField } from '@mui/material'
import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime } from 'luxon'
import { Control, Controller } from 'react-hook-form'

interface DatePickerProps {
  required?: boolean
  helperText?: boolean | string
  defaultValue?: string
  label?: string
  disabled?: boolean
  name: string
  control: Control<any, any>
  maxDate?: DateTime
}

const ADPATER_LOCALE = process.env.NEXT_PUBLIC_APP_LOCALE
const DatePicker = ({
  required,
  helperText,
  defaultValue,
  label,
  disabled,
  name,
  control,
  maxDate,
}: DatePickerProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={ADPATER_LOCALE}>
          <MuiDatePicker
            value={value}
            disabled={disabled}
            inputFormat='dd/LL/yyyy'
            openTo='year'
            views={['year', 'month', 'day']}
            label={label}
            onChange={(newValue: DateTime | null) => {
              onChange(newValue?.toFormat('yyyy-MM-dd'))
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} helperText={helperText} required={required} />
            )}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      )}
    />
  )
}
export default DatePicker
