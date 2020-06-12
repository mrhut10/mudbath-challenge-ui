import React, { ReactElement } from 'react';
import { findExchangeRate, findProductByID, users } from '../helpers/index'
import ProductListItem from './productListItem'
import Overlay from './overlay'
import DialogMenu from './dialogMenu'
import ProductDetails from './productDetails'

import {usePopupStateReturnInterface} from '../hooks/usePopupState'
import {productInterface} from '../hooks/getAllProducts'
import {currencyStateInterface} from '../hooks/getAllCurrencies'


interface ContentProductDetailsProps {
  id: productInterface["id"]
  popupStack: usePopupStateReturnInterface
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
}

const ContentProductDetails = ({id, popupStack, user, allProducts, exchangeRates}:ContentProductDetailsProps) => {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts, photo} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base, selectedCurrency, exchangeRates);
  const priceInLocal = exRate ? (exRate * price.amount).toFixed(2) : undefined;

  return (
    <>
      <Overlay
        className="h-40"
        BgElement={
          <div
            className="w-full h-40 overflow-hidden bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage:
                `linear-gradient(to bottom, rgba(255,255,255,1) 33%,rgba(255,255,255,0) 100%), url('${photo}')`
            }}>
          </div>
        }
      >
        <DialogMenu id={id} user={user} allProducts={allProducts} popupState={popupStack} />
      </Overlay>
      <ProductDetails id={id} user={user} allProducts={allProducts} currencies={exchangeRates} popupState={popupStack}/>
    </>
  )
}

export default ContentProductDetails;