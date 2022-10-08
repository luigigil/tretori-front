import { Button } from '@mui/material'
import { useState } from 'react'

interface CrudButtonsProps {
  onNew?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export default function CrudButtons({
  onNew,
  onEdit,
  onDelete,
  onCancel,
  onSave,
}: CrudButtonsProps) {
  const [isEditing, setIsEditing] = useState(false)

  const newButton = () => {
    if (onNew) {
      return (
        <Button style={{ margin: 8 }} variant='contained' onClick={onNew}>
          Novo
        </Button>
      )
    }
  }

  const deleteButton = () => {
    if (!isEditing) {
      if (onDelete) {
        return (
          <Button style={{ margin: 8 }} variant='contained' onClick={onDelete}>
            Deletar
          </Button>
        )
      }
    }
  }
  const editButton = () => {
    if (onEdit && onCancel) {
      return (
        <Button
          style={{ margin: 8 }}
          variant='contained'
          onClick={() => {
            if (!isEditing) {
              setIsEditing(true)
              onEdit()
              return
            }
            setIsEditing(false)
            onCancel()
          }}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      )
    }
  }

  const saveButton = () => {
    const button = (
      <Button style={{ margin: 8 }} variant='contained' onClick={onSave}>
        Salvar
      </Button>
    )
    if (onSave) {
      if (onEdit && isEditing) {
        return button
      } else if (!onEdit) {
        return button
      }
    }
  }
  return (
    <>
      {newButton()}
      {deleteButton()}
      {editButton()}
      {saveButton()}
    </>
  )
}
