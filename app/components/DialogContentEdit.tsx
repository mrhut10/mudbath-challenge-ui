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
  updateProductById?: (user: users, id: productInterface["id"], updatedFields: Partial<productInterface>) => void
}

const ProductEdit = ({id, popupStack, user, allProducts, exchangeRates}:ProductEditProps) => {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = selectedCurrency ? findExchangeRate(price.base, selectedCurrency, exchangeRates) : undefined;
  const localCurrency = exRate ? exRate * price.amount : undefined

  // should not be here if your not logged in as admin therefore
  if (user !== 'admin') popupStack.closePopups(1)

  // tracked fields in UI
  const [trackedFields, setTrackedFields] = useState({
    id,
    relatedProducts,
    price,
  }) as [Partial<productInterface>, (a:Partial<productInterface>) => any]

  const toogleRelatedProduct = (key: productInterface["id"]) =>{
    setTrackedFields({
      ...trackedFields,
      relatedProducts:
      trackedFields.relatedProducts.includes(key)
        ? trackedFields.relatedProducts.filter(item => item !== key)
        : [...trackedFields.relatedProducts, key]
    })
  }

  const handlefieldChange = (fieldName: keyof productInterface | 'base' ) => e => {
    const value = e.target.value

    switch (fieldName) {
      case 'id':
        setTrackedFields({...trackedFields, id: Number(value)})
        break;
      case 'price':
        setTrackedFields({...trackedFields, price: {...trackedFields.price, amount:Number(value)}})
        break;
      case 'base':
        setTrackedFields({...trackedFields, price: {...trackedFields.price, base: value}})
        break;
    }
    console.log(trackedFields);
  }

    
  return (
    <>
      <DialogMenu id={id} user={user} allProducts={allProducts} popupState={popupStack} showEdit={false}/>
      <ProductForm id={id} allProducts={allProducts} currencies={exchangeRates} saveProductByKey={console.log}/>
    </>
  )
}

export default ProductEdit;