import React, { useState } from 'react'
import { connect } from 'react-redux'
import DialogMenu from './dialogMenu'
import ProductForm from './productForm'
import { productEdit, productDialogClose } from '../redux/actions'
import { findExchangeRate, findProductByID } from '../helpers/index'
import { userNames } from '../redux/reducers/user'
import { productInterface } from '../redux/reducers/products'
import { currenciesState } from '../redux/reducers/currencies'

interface ProductEditProps {
  id: productInterface['id']
  user: userNames
  productEdit: (productID: number, product: productInterface) => void
  productDialogClose: (count: number) => void
}

const DialogProductEdit = ({
  id,
  user,
  productEdit,
  productDialogClose,
}: ProductEditProps) => {
  // should not be here if your not logged in as admin therefore
  // if (user !== 'admin') productDialogClose(1)

  const handleProductSave = (
    id: productInterface['id'],
    product: productInterface,
  ) => {
    // update navigational stack for change in product id's
    productEdit(id, product)
  }

  return (
    <>
      <div className="relative">
        <DialogMenu
          id={id}
          showEdit={user === 'admin'}
          heading="Edit Product"
        />
        <h3></h3>
      </div>
      <ProductForm id={id} />
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.users,
  allProducts: state.products.allProducts,
})

export default connect(mapStateToProps, {
  productDialogClose,
  productEdit,
})(DialogProductEdit)
