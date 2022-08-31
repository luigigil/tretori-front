import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime } from 'luxon'

interface BirthDatePickerProps {
  value: DateTime | string | null | undefined
  required?: boolean
  helperText?: boolean | string
  onChange: (dateTime: DateTime | null) => void
}

const BirthDatePicker = ({ value, required, helperText, onChange }: BirthDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={'pt-br'}>
      <DatePicker
        openTo='year'
        views={['year', 'month', 'day']}
        label='Data de Nascimento'
        value={value}
        onChange={(newValue: DateTime | null) => {
          onChange(newValue)
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={helperText} required={required} />
        )}
        maxDate={DateTime.now()}
      />
    </LocalizationProvider>
  )
}
export default BirthDatePicker
