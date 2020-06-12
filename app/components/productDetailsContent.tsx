import React, { ReactElement } from 'react';
import { findExchangeRate, findProductByID, users } from '../helpers/index'
import ProductListItem from './productListItem'
import Overlay from './overlay'
import DialogMenu from './dialogMenu'

import {usePopupStateReturnInterface} from '../hooks/usePopupState'
import {productInterface} from '../hooks/getAllProducts'
import {currencyStateInterface} from '../hooks/getAllCurrencies'


interface ProductDetailsProps {
  id: productInterface["id"]
  popupStack: usePopupStateReturnInterface
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
}

const ProductDetails = ({id, popupStack, user, allProducts, exchangeRates}:ProductDetailsProps) => {
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
            className="w-full h-40 overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                `linear-gradient(to bottom, rgba(255,255,255,1) 33%,rgba(255,255,255,0) 100%), url('${photo}')`
            }}>
          </div>
        }
      >
        <DialogMenu id={id} user={user} allProducts={allProducts} popupState={popupStack} />
      </Overlay>
      <div className="p-2 flex w-full justify-between">
        <div className="font-bold">
          <span className="text-lg">${priceInLocal}</span>{' '}
          <span className="text-sm">{selectedCurrency}</span>{' '}
          <span className="text-sm text-deemphgrey">/ {price.amount.toFixed(2)} {price.base}</span>
        </div>
        <div className="p-2">
          <span className="text-deemphgrey">ID:</span>{' '}
          <span className="font-bold">{id}</span>
        </div>
      </div>
      <hr className="h-2 p-1"/>
      <div className="bg-mainbg p-2">
        <h3 className="text-deemphgrey">Related</h3>
        <div className="py-8">
          {relatedProducts.map(product => (
            <ProductListItem
              id={product}
              key={product}
              user={user}
              allProducts={allProducts}
              exchangeRates={exchangeRates}
              popupStack={popupStack}
              showDetailsButton
              showEditButton={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductDetails;