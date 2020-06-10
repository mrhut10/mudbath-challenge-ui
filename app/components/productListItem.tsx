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
  const {name, price, photo} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base, exchangeRates.selectedKey, exchangeRates);
  const {openProductDetails, openProductEdit} = popupStack;

  return (
    <li className="w-full p-5">
      <Card>
          <div className="flex flex-wrap xsm:flex-no-wrap overflow-hidden w-full">
            <img className="flex-grow xsm:flex-grow-0 flex-shrink-0" src={photo} width="200" height="200"/>
            <div className="flex-shrink p-8 flex flex-wrap justify-between w-full">
              {/*Title Price and Buttons */}
              <div className="titleandprice space-x-2 mr-12">
                <h3 className="font-bold text-dark">{name}</h3>
                  {
                    !exRate
                    ? ("LOADING")
                    : (
                      <div className="space-x-4">
                        <span className="text-lg">${(price.amount * exRate).toFixed(2)}</span>
                        <span className="text-sm">{selectedCurrency}</span>
                      </div>
                    )
                  }
              </div>
              <div className="flex justify-evenly flex-wrap h-10 p-2 ">
                {
                  showDetailsButton
                  ? (<Button className="box-border mb-2 mx-2" onClick={()=>openProductDetails(allProducts,id)}>Details</Button>)
                  : undefined
                }
                {
                  showEditButton
                  ? (<Button className="box-border mb-2 mx-2" disabled={user !== 'admin'} onClick={()=>openProductEdit(allProducts,id, user)}>Edit</Button>)
                  : undefined
                }
              </div>
            </div>
          </div>
      </Card>
    </li>
  )
}

export default ProductListItem;