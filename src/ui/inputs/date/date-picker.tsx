import { TextField } from '@mui/material'
import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTime } from 'luxon'
import { Control, Controller } from 'react-hook-form'

interface DatePickerProps {
  required?: boolean
  helperText?: boolean | string
  defaultValue?: Date
  label?: string
  disabled?: boolean
  name: string
  control: Control<any, any>
  maxDate?: Date
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ADPATER_LOCALE}>
          <MuiDatePicker
            value={value}
            disabled={disabled}
            inputFormat='DD/MM/YYYY'
            openTo='year'
            views={['year', 'month', 'day']}
            label={label}
            onChange={(newValue: Date | null) => {
              if (newValue) {
                onChange(DateTime.fromJSDate(newValue).toFormat('yyyy-LL-dd'))
              }
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                helperText={helperText}
                required={required}
                id={`datepicker-${name}`}
              />
            )}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      )}
    />
  )
}
export default DatePicker
