import React from 'react'
import {findProductByID, findExchangeRate} from '../helpers/index'
import ProductListItem from './productListItem'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
import { users } from '../hooks/useUser'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'


interface ProductDetailsProps {
  id: number
  allProducts: productInterface[]
  currencies: currencyStateInterface
  user: users,
  popupState: usePopupStateReturnInterface
}
const ProductDetails = ({id, user, allProducts, currencies, popupState}:ProductDetailsProps) => {
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts)
  const exRate = findExchangeRate(price.base, currencies.selectedKey, currencies);
  const priceInLocal = exRate ? (price.amount * exRate).toFixed(2) : undefined

  return (
    <>
      <div className="p-2 flex w-full justify-between">
        <div className="font-bold">
          <span className="text-lg">${priceInLocal}</span>{' '}
          <span className="text-sm">{currencies.selectedKey}</span>{' '}
          <span className="text-sm text-deemphgrey">/ {price.amount.toFixed(2)} {price.base}</span>
        </div>
        <div className="p-2">
          <span className="text-deemphgrey">ID:</span>{' '}
          <span className="font-bold">{id}</span>
        </div>
      </div>
      <div className="p-4 text-center">
          {description}
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
              exchangeRates={currencies}
              popupStack={popupState}
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