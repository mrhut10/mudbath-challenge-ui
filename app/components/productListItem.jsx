import React from 'react';
import Tile from './tile';
import { findExchangeRate, findProductByID } from '../helpers'

function ProductListItem ({key: id, exchangeRates, allProducts, updateProductByKey}) {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base ,exchangeRates.selectedKey, exchangeRates);

  return (
    <li className="w-full sm:w-1/2 md:w-1/3 p-2">
      <Tile>
        <h3 className="font-bold text-red-600">{name}</h3>
        <ul>
          <li>
            price: {!exRate ? 'LOADING' :  `${(price.amount * exRate).toFixed(2)} (${selectedCurrency})`}
          </li>
        <li>ID: {id}</li>
        <li>{description}</li>
        <li>price: {price.toFixed(2)} (in {selectedCurrency})</li>
      </ul>
    </ul>
        </ul>
      </Tile>
    </li>
  )
}

export default ProductListItem;