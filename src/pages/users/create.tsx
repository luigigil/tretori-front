import { Button } from '@mui/material'
import FormUsers from 'features/users/form-users'
import { useRouter } from 'next/router'

export default function CreateUser() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          router.push('/users')
        }}
      >
        Voltar
      </Button>
      <FormUsers shouldCreateNewUsers={true}></FormUsers>
    </>
  )
}
