import React from 'react'
import '@reach/dialog/styles.css'
import { DialogOverlay } from '@reach/dialog';
import ProductDetails from './dialogContentDetails';
import ProductEdit from './dialogContentEdit';
import { usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'

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
      <div className="h-full max-w-3xl mx-auto bg-cardbg box-border mt-32 xsm:mt-20 m-10 z-50">
        {
          !currentValue
          ? (undefined)
          : (
            currentValue.type === 'productEdit'
            ? <ProductEdit id={currentValue.id} user={user} allProducts={allProducts} exchangeRates={exchangeRates} popupStack={popupStack} />
            : <ProductDetails id={currentValue.id} user={user} allProducts={allProducts} exchangeRates={exchangeRates} popupStack={popupStack} />
          )
        }
      </div>
    </DialogOverlay>
  )
}

export default PopupManager;