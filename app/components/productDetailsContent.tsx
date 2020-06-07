import React from 'react';
import { findExchangeRate, findProductByID, users } from '../helpers/index'
import ProductList from './productList'
import ProductListItem from './productListItem'

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
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base, selectedCurrency, exchangeRates);
  const priceInLocal = exRate ? (exRate * price.amount).toFixed(2) : undefined;

  return (
    <>
      <h3 className="font-bold">Product Details</h3>
      <ul>
        {!name ? undefined : (
          <>
            <li>ID: {id}</li>
            <li>Name: {name}</li>
            <li>Description: {description}</li>
            <li>
              Price: {price.amount.toFixed(2)} ({price.base})
              <span className="italic">{
                priceInLocal ? ` or ${priceInLocal} in (${exchangeRates.selectedKey})` : ''}</span></li>
            <li>
              <h4>Related Products</h4>
              <ProductList>
                {
                  allProducts.filter(item => !!relatedProducts.includes(item.id))
                  .map(item => (
                    <ProductListItem
                      key={item.id}
                      id={item.id}
                      allProducts={allProducts}
                      exchangeRates={exchangeRates}
                      popupStack={popupStack}
                      showDetailsButton={true}
                      showEditButton={user === 'admin' ? true : false}
                      user={user}
                    />
                  ))
                }
              </ProductList>
            </li>
          </>
        )} 
      </ul>
    </>
  )
}

export default ProductDetails;