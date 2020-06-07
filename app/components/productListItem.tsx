import React from 'react'
import Tile from './tile'
import { findExchangeRate, findProductByID, users } from '../helpers/index'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'

interface ProductListItemProps {
  id: number
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
  popupStack:usePopupStateReturnInterface
  user:users
  showDetailsButton?:boolean
  showEditButton?:boolean
}

function ProductListItem ({
  id,
  allProducts,
  exchangeRates,
  popupStack,
  user='user',
  showDetailsButton=true,
  showEditButton=(user==='admin')
}:ProductListItemProps) {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, price} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base, exchangeRates.selectedKey, exchangeRates);
  const {openProductDetails, openProductEdit} = popupStack;

  return (
    <li className="w-full">
      <Tile>
        <h3 className="font-bold text-red-600">{name}</h3>
        <ul>
          <li>
            price: {!exRate ? 'LOADING' :  `${(price.amount * exRate).toFixed(2)} (${selectedCurrency})`}
          </li>
          {
            showDetailsButton
            ? <li><button onClick={()=>openProductDetails(allProducts,id)}>See Details</button></li>
            : (undefined)
          }
          {
            showEditButton
            ? <li><button onClick={()=>openProductEdit(allProducts,id, user)}>Edit Details</button></li>
            : (undefined)
          }
        </ul>
      </Tile>
    </li>
  )
}

export default ProductListItem;