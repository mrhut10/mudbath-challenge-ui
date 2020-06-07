import React, { useState } from 'react';
import { findExchangeRate, findProductByID } from '../helpers'
import ProductList from './productList'
import ProductListItem from './productListItem'

const ProductEdit = ({id, popupStack, user, allProducts, exchangeRates}) => {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = selectedCurrency ? findExchangeRate(price.base, selectedCurrency, exchangeRates) : undefined;
  const localCurrency = exRate ? exRate * price.amount : undefined

  // state during editing
  const [] = useState();
    
  return <form className="flex flex-wrap" onChange={(e)=>{console.log(JSON.stringify(e))}}>
      <label className="w-1/4 font-bold my-2" for="id">id:</label>
      <input className="w-3/4 bg-gray-400 my-2" id="id" name="id" type="text" defaultValue={id}/>

      <label className="w-1/4 font-bold my-2" for="name">name:</label>
      <input className="w-3/4 bg-gray-400 my-2" id="name" name="name" type="text" defaultValue={name}/>

      <label className="w-1/4 font-bold my-2" for="description">description:</label>
      <input className="w-3/4 bg-gray-400 my-2" id="description" name="description" type="text" defaultValue={description}/>

      <label className="w-1/4 font-bold my-2" for="price">price (in {selectedCurrency}):</label>
      <input className="w-1/4 bg-gray-400 my-2" id="price" name="price" type="text" defaultValue={price.amount}/>

      <span className="w-1/4 text-center my-2"> in </span>

      <select 
        name="currency"
        id="currency"
        defaultValue={price.base}
        className="w-1/4 bg-gray-400 my-2"
      >
        {
          (exchangeRates.status !== 'downloaded' ? [] : exchangeRates.data).map(
            currency => <option key={currency.base} value={currency.base}>{currency.base}</option>
          )
        }
      </select>
      
      <span className="w-full text-right">Calculates to {localCurrency} in {selectedCurrency}</span>

      <label className="w-full text-center font-bold my-2" for="related">Related Products</label>
  </form>
}

export default ProductEdit;