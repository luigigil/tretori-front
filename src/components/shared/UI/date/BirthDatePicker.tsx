import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime } from 'luxon'

interface BirthDatePickerInterface {
  value?: DateTime | string | null | undefined
  required?: boolean
  helperText?: boolean | string
  onChange?: any
}

const BirthDatePicker = (props: BirthDatePickerInterface) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={'pt-br'}>
      <DatePicker
        openTo='year'
        views={['year', 'month', 'day']}
        label='Data de Nascimento'
        value={props.value}
        onChange={(newValue: DateTime | null) => {
          props.onChange(newValue)
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={props.helperText} required={props.required} />
        )}
        maxDate={DateTime.now()}
      />
    </LocalizationProvider>
  )
}
export default BirthDatePicker
