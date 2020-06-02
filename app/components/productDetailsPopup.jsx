import React from 'react';
import Popup from 'reactjs-popup';
import { findExchangeRate, findProductByID } from '../helpers'
import ProductListItem from './productListItem'

const ProductDetails = ({id, exchangeRates, allProducts, updateProductByKey}) => {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base ,exchangeRates.selectedKey, exchangeRates);

  return (
    <Popup
      trigger={<div>See Details</div>}
      modal
      closeOnEscape
      closeOnDocumentClick={false}
    >
      <div>
        <h3 className="font-bold text-red-600">{name}</h3>
        <ul>
          <li>ID: {id}</li>
          <li>{description}</li>
          <li>price (in {price.base}): {(price.amount).toFixed(2)}</li>
          <li>
            price (in {selectedCurrency}): {!exRate ? 'LOADING' : `${(price.amount * exRate).toFixed(2)}`}
          </li>
          <li>
            <h4 className="font-bold mt-4">Related Products</h4>
            <ul className="flex flex-wrap">
             {relatedProducts.map(relPro => {
               const productDefinition = findProductByID(relPro, allProducts);
               return (
                 <ProductListItem
                   id={productDefinition.id}
                   allProducts={allProducts}
                   exchangeRates={exchangeRates}
                   updateProductByKey
                 />
               )
             })}
            </ul>
          </li>
        </ul>
      </div>
    </Popup>)
}

export default ProductDetails;