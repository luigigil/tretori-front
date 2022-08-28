import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface TitlePageTypes {
  title: string
  onNew: any
}

const TitlePage = (props: TitlePageTypes) => {
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
            {props.title}
          </Typography>
        </Grid>
        <Grid>
          <Button variant='contained' onClick={props.onNew}>
            Novo
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default TitlePage
