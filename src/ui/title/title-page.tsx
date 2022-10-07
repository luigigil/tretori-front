import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface TitlePageProps {
  title: string
  onNew?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const TitlePage = ({ title, onNew, onEdit, onDelete }: TitlePageProps) => {
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
          {onNew && (
            <Button style={{ margin: 8 }} variant='contained' onClick={onNew}>
              Novo
            </Button>
          )}
          {onDelete && (
            <Button style={{ margin: 8 }} variant='contained' onClick={onDelete}>
              Deletar
            </Button>
          )}

          {onEdit && (
            <Button style={{ margin: 8 }} variant='contained' onClick={onEdit}>
              Editar
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default TitlePage
