import React from 'react'
import { DialogOverlay } from '@reach/dialog'
import '@reach/dialog/styles.css'
import ProductDetails from './DialogContentDetails'
import ProductEdit from './DialogContentEdit'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'

interface PopupManagerProps {
  popupStack: usePopupStateReturnInterface
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
  updateProductById?: (
    user: users,
    id: productInterface['id'],
    updatedFields: productInterface,
  ) => void
}

const PopupManager = ({
  user,
  allProducts,
  exchangeRates,
  popupStack,
  updateProductById,
}: PopupManagerProps) => {
  const { currentValue } = popupStack

  return (
    <DialogOverlay isOpen={!!popupStack.currentValue}>
      <div className="max-w-3xl mx-auto bg-cardbg box-border mt-32 xsm:mt-20 m-10 z-50">
        {!currentValue ? undefined : currentValue.type === 'productEdit' ? (
          <ProductEdit
            id={currentValue.id}
            user={user}
            allProducts={allProducts}
            exchangeRates={exchangeRates}
            popupStack={popupStack}
            updateProductById={updateProductById}
          />
        ) : (
          <ProductDetails
            id={currentValue.id}
            user={user}
            allProducts={allProducts}
            exchangeRates={exchangeRates}
            popupStack={popupStack}
          />
        )}
      </div>
    </DialogOverlay>
  )
}

export default PopupManager
