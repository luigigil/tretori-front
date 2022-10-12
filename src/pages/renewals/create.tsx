import { Button } from '@mui/material'
import FormRenewal from 'features/renewals/renewal.form'
import { useRouter } from 'next/router'

export default function CreateRenewal() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          const link = router.query.contractId
            ? `/contracts/${router.query.contractId}`
            : '/renewals'
          router.push(link)
        }}
      >
        Voltar
      </Button>
      <FormRenewal contractId={router.query.contractId?.toString() || undefined}></FormRenewal>
    </>
  )
}
