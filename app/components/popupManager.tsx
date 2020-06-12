import React from 'react'
// import Dialog from '@reach/dialog'
import { DialogOverlay, DialogContent } from '@reach/dialog';

import ProductDetails from './ContentProductDetails';
import ProductEdit from './productEditContent';
import { usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'

import '@reach/dialog/styles.css'

interface PopupManagerProps {
  popupStack: usePopupStateReturnInterface
  user: users
  allProducts: productInterface[],
  exchangeRates: currencyStateInterface,
  updateProductById?: (user: users, id: productInterface["id"], updatedFields: Partial<productInterface>) => void
}

const PopupManager = ({user, allProducts, exchangeRates, popupStack, updateProductById}:PopupManagerProps) => {
  const {
    currentValue,
    openProductDetails,
    openProductEdit,
    closePopups,
    danerousProductIDChange,
    wholeStack,
  } = popupStack;
  
    return (
    <DialogOverlay
      isOpen={!!popupStack.currentValue}
    >
      <div className="h-full bg-mainbg box-border mt-32 xsm:mt-20 m-10 z-50">
        {
          !currentValue
          ? (undefined)
          : (
            currentValue.type === 'productDetail'
            ? <ProductDetails id={currentValue.id} user={user} allProducts={allProducts} exchangeRates={exchangeRates} popupStack={popupStack} />
            : <ProductEdit id={currentValue.id} user={user} allProducts={allProducts} exchangeRates={exchangeRates} popupStack={popupStack} />
          )
        }
      </div>
    </DialogOverlay>
  )
}

export default PopupManager;