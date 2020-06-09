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

const PopupManager = ({popupStack, user, allProducts, exchangeRates, updateProductById}:PopupManagerProps) => {
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
      <div>
        <div className="flex items-start">
          <div className="w-full">
            <h3>Navigation</h3>
            <h3 className="flex-grow flex flex-wrap">{
              wholeStack.map((menu, i, list) => (
                <div key={i} className="w-42 p-2">
                  <Card>
                    <div
                      className="hover:text-blue-400"
                      onClick={()=>{
                        closePopups(list.length - i - 1);
                      }}
                    >
                      / {menu.type} id: {menu.id}
                    </div>
                  </Card>
                </div>
              ))
            }</h3>
          </div>
          <button
            className="flex-grow-0 text-right text-red-500 border-solid border-2 border-red-500 rounded p-1"
            onClick={()=>closePopups(1)}>{wholeStack.length > 1 ? 'Back' : 'Exit'}
          </button>
        </div>
        {
          /*Product Details Section*/
          currentValue && currentValue.type === 'productDetail'
          ? (
            <ProductDetails
              id={currentValue.id}
              allProducts={allProducts}
              exchangeRates={exchangeRates}
              popupStack={popupStack}
              user={user}
            />
          ) : (undefined)
        }
        {
          /*Product Edit Section*/
          currentValue && currentValue.type === 'productEdit'
          ? (
            <ProductEdit
              id={currentValue.id}
              allProducts={allProducts}
              exchangeRates={exchangeRates}
              popupStack={popupStack}
              user={user}
              updateProductById={updateProductById}
            />
          )
          : (undefined)
        }
      </div>
    </Popup>
  )
}

export default PopupManager;