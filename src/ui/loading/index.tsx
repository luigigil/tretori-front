import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'

const StyledCircularProgress = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

export default function Loading() {
  return (
    <StyledCircularProgress>
      <CircularProgress />
    </StyledCircularProgress>
  )
}
