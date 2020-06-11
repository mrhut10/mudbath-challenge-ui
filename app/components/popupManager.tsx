import React from 'react'
import Popup from 'reactjs-popup'
import {findProductByID, findExchangeRate} from '../helpers/index'
import ProductDetails from './productDetailsContent';
import ProductEdit from './productEditContent';
import Card from './card';
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
    <Popup
      modal
      open={!!popupStack.currentValue}
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <div className="max-h-screen">
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
    </Popup>
  )
}

export default PopupManager;