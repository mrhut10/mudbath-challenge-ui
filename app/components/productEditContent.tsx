import React, { useState } from 'react';
import { findExchangeRate, findProductByID } from '../helpers'
import ProductList from './productList'
import ProductListItem from './productListItem'
import {usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'

interface ProductEditProps {
  id: productInterface["id"]
  popupStack: usePopupStateReturnInterface,
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
  updateProductById?: (user: users, id: productInterface["id"], updatedFields: Partial<productInterface>) => void
}

const ProductEdit = ({id, popupStack, user, allProducts, exchangeRates}:ProductEditProps) => {
  const selectedCurrency = exchangeRates.selectedKey;
  const {name, description, price, relatedProducts} = findProductByID(id, allProducts);
  const exRate = selectedCurrency ? findExchangeRate(price.base, selectedCurrency, exchangeRates) : undefined;
  const localCurrency = exRate ? exRate * price.amount : undefined

  // tracked fields in UI
  const [trackedFields, setTrackedFields] = useState({
    id,
    relatedProducts,
    price,
  }) as [Partial<productInterface>, (a:Partial<productInterface>) => any]

  const toogleRelatedProduct = (key: productInterface["id"]) =>{
    setTrackedFields({
      ...trackedFields,
      relatedProducts:
      trackedFields.relatedProducts.includes(key)
        ? trackedFields.relatedProducts.filter(item => item !== key)
        : [...trackedFields.relatedProducts, key]
    })
  }

  const handlefieldChange = (fieldName: keyof productInterface | 'base' ) => e => {
    const value = e.target.value

    switch (fieldName) {
      case 'id':
        setTrackedFields({...trackedFields, id: Number(value)})
        break;
      case 'price':
        setTrackedFields({...trackedFields, price: {...trackedFields.price, amount:Number(value)}})
        break;
      case 'base':
        setTrackedFields({...trackedFields, price: {...trackedFields.price, base: value}})
        break;
    }
    console.log(trackedFields);
  }

  const invalidID = trackedFields.id === id ? false : !!allProducts.find(item => item.id === trackedFields.id)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    console.log({data});
  }
    
  return <form className="flex flex-wrap" onSubmit={handleSubmit}>
      <label className="w-1/4 font-bold my-2" htmlFor="id">id:</label>
      <input 
        className={`w-3/4 bg-gray-400 my-2 ${invalidID ? 'bg-red-400':''}`}
        id="id"
        name="id"
        type="number"
        step="1"
        required
        min="1"
        defaultValue={id}
        onChange={(e)=>handlefieldChange('id')(e)}
      />
      {invalidID ? <span className="w-full text-red-400 text-right">ID already Used</span> : undefined}

      <label className="w-1/4 font-bold my-2" htmlFor="name">name:</label>
      <input className="w-3/4 bg-gray-400 my-2" id="name" name="name" type="text" required defaultValue={name}/>

      <label className="w-1/4 font-bold my-2" htmlFor="description">description:</label>
      <input className="w-3/4 bg-gray-400 my-2" id="description" name="description" type="text" required defaultValue={description}/>
      
      <label className="w-1/4 font-bold my-2" htmlFor="price">price (in {selectedCurrency}):</label>
      <input className="w-1/4 bg-gray-400 my-2" id="price" name="price" type="number" step="0.01" required min="0.01" defaultValue={price.amount}/>

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

      <label className="w-full text-center font-bold my-2" htmlFor="related">Related Products</label>
      <ProductList
        selectedKeys={trackedFields.relatedProducts}
        toogleChild={toogleRelatedProduct}
      >
        {allProducts.map(product => (
          <ProductListItem key={id} id={product.id} user={user} allProducts={allProducts} exchangeRates={exchangeRates} popupStack={popupStack} showDetailsButton={false} showEditButton={false}/>
        ))}
      </ProductList>
      <button disabled={invalidID} className="mx-auto rounded-lg bg-red-200 p-2 my-2">Save Changes</button>
  </form>
}

export default ProductEdit;