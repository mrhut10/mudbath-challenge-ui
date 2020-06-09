import React from 'react'
import Card from './card'
import Button from './button'
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
      <Card>
        <h3 className="font-bold text-dark">{name}</h3>
        {
          !exRate
          ? <span>Loading...</span>
          : (
            <div className="w-full flex">
              <span className="text-lg">${(price.amount * exRate).toFixed(2)}</span>{" "}
              <span className="text-sm">{selectedCurrency}</span>
            </div>
          )
        }
        <div className="w-full flex items-center justify-around">
          {
            showDetailsButton
            ? (<Button onClick={()=>openProductDetails(allProducts,id)}>Details</Button>)
            : undefined
          }
          {
            showEditButton
            ? (<Button disabled={user !== 'admin'} onClick={()=>openProductEdit(allProducts,id, user)}>Edit</Button>)
            : undefined
          }
        </div>
      </Card>
    </li>
  )
}

export default ProductListItem;