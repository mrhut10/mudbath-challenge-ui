import React from 'react'
import TextValidator from '../helpers/textValidator'
import { users } from 'hooks/useUser'
import { productInterface } from 'hooks/getAllProducts'
import { currencyStateInterface } from 'hooks/getAllCurrencies'
import { usePopupStateReturnInterface } from 'hooks/usePopupState'

interface ProductFormProps {
  id: number
  allProducts: productInterface[]
  currencies: currencyStateInterface
  user: users
}

const ProductForm = ({}) => {
  /*
    return (
    <form className="flex flex-wrap" onSubmit={handleSubmit}>
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
  )*/
}


export default ProductForm