import React, { useState } from 'react';
import DialogMenu from './dialogMenu'
import ProductForm from './productForm'

import { findExchangeRate, findProductByID } from '../helpers/index'
import {usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'

interface ProductEditProps {
  id: productInterface["id"]
  popupStack: usePopupStateReturnInterface,
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
  updateProductById: (user: users, id: productInterface["id"], updatedFields: productInterface) => void
}

const ProductEdit = ({id, popupStack, user, allProducts, exchangeRates, updateProductById}:ProductEditProps) => {
  
  // should not be here if your not logged in as admin therefore
  if (user !== 'admin') popupStack.closePopups(1)

  const handleProductSave = (id: productInterface["id"], product:productInterface) => {
    // save product
    updateProductById(user, id, product)
    
    // update navigational stack for change in product id's
    if (id !== product.id){
      popupStack.danerousProductIDChange(user, id, product.id)
    }
    
    // close edit window
    popupStack.closePopups(1)
  }
    
  return (
    <>
    <div className="relative">
      <DialogMenu id={id} user={user} allProducts={allProducts} popupState={popupStack} showEdit={false} heading="Edit Product"/>
      <h3></h3>
    </div>
      <ProductForm id={id} allProducts={allProducts} currencies={exchangeRates} saveProductByKey={handleProductSave}/>
    </>
  )
}

export default ProductEdit;