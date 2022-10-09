/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSnackBar } from 'context/snackbar-context'
// import useSnackBars from 'hooks/useSnackbar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import FormTextField from 'ui/inputs/form/inputs/text-field'
import { ProductMessages } from './product.messages'
import { companySchema } from './products.joi.schema'

type ProductType = any

interface FormProductProps {
  product?: ProductType
  shouldCreateNewProduct: boolean
}

const FormProduct = ({ product, shouldCreateNewProduct }: FormProductProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductType>({ resolver: joiResolver(companySchema) })
  // const navigate = useNavigate()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { showSnackBar } = useSnackBar()

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/product/${product?.id}`,
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
      })
      setShouldOpenDeleteDialog(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      // navigate('/products')
    }
  }

  // ! fix this any
  const handleEditProduct = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `product/${product?.id}`,
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
        data,
      })
      showSnackBar('Pessoa física editada com sucesso', 'success')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      // setIsLoadingRequest(false)
      // setIsEditing(false)
    }
  }

  // ! fix this any
  const handleSaveProduct = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: 'product',
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_AXIOS_BASE_URL,
        data,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ! show error message snackbar
      } else {
        // ! show error message snackbar
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      // navigate('/products')
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewProduct) {
      return <TitlePage title={ProductMessages.title} onSave={handleSubmit(handleSaveProduct)} />
    }

    return (
      <TitlePage
        title={isEditing ? ProductMessages.editTitle : ProductMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditProduct)}
      />
    )
  }

  return (
    <>
      {titlePageComponent()}
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete='off'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex'>
          <FormTextField
            label={'Nome'}
            name='name'
            control={control}
            errors={errors}
            defaultValue={product?.name}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={product?.type}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
        </Box>

        <Box display='flex'>
          <FormTextField
            label={'Plano'}
            name='plan'
            control={control}
            errors={errors}
            defaultValue={product?.plan}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
          <FormTextField
            label={'Tamanho'}
            name='size'
            control={control}
            errors={errors}
            defaultValue={product?.size}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
        </Box>
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title='Deletar Produto'
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message='Você tem certeza que deseja deletar?'
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormProduct
