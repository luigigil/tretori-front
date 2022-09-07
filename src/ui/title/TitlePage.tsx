import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface TitlePageProps {
  title: string
  onNew: () => void
}

const TitlePage = ({ title, onNew }: TitlePageProps) => {
  return (
    <Box my={4}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2 }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h4' color='text.primary'>
            {title}
          </Typography>
        </Grid>
        <Grid>
          <Button variant='contained' onClick={onNew}>
            Novo
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default TitlePage
