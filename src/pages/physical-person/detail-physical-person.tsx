import { Button } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormPhysicalPerson from '../../features/physical-person/form-physical-person'
import { PHYSICAL_PERSON_DETAIL_TITLE } from '../../features/physical-person/physical-person.messages'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import DialogConfirm from '../../ui/dialog/dialog-confirm'
import TitlePage from '../../ui/title/title-page'

export default function DetailPhysicalPerson() {
  const navigate = useNavigate()
  const { physicalPersonId } = useParams()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [data, error, isLoading] = useAxiosFetch({
    method: 'GET',
    url: `/physical-person/${physicalPersonId}`,
  })

  // ! what to do with error?
  if (error) {
    return <p>erro</p>
  }

  const navigateToPhysicalPersonList = () => {
    navigate('/pessoa-fisica')
  }

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingDelete(true)
    try {
      const response = await axios.request({
        method: 'DELETE',
        url: `/physical-person/${physicalPersonId}`,
      })
      setShouldOpenDeleteDialog(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingDelete(false)
    } finally {
      setIsLoadingDelete(false)
      navigateToPhysicalPersonList()
    }
  }

  return (
    <>
      <Button onClick={navigateToPhysicalPersonList}>Voltar</Button>
      <TitlePage
        title={PHYSICAL_PERSON_DETAIL_TITLE}
        onDelete={() => {
          setShouldOpenDeleteDialog(true)
        }}
        onEdit={() => {
          console.log('edit')
        }}
      />
      {!isLoading && (
        <FormPhysicalPerson
          physicalPerson={data}
          shouldCreateNewPhysicalPerson={false}
        ></FormPhysicalPerson>
      )}
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Pessoa Física'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}
