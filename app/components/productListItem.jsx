import React from 'react';
import Tile from './tile';
import { findExchangeRate, findProductByID } from '../helpers'

function ProductListItem ({id, exchangeRates, allProducts}) {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, price} = findProductByID(id, allProducts);
  const exRate = findExchangeRate(price.base, exchangeRates.selectedKey, exchangeRates);

  return (
    <li className="w-full sm:w-1/2 md:w-1/3 p-2">
      <Tile>
        <h3 className="font-bold text-red-600">{name}</h3>
        <ul>
          <li>
            price: {!exRate ? 'LOADING' :  `${(price.amount * exRate).toFixed(2)} (${selectedCurrency})`}
          </li>
        </ul>
      </Tile>
    </li>
  )
}

export default ProductListItem;