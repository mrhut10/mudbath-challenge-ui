import React, {useState} from 'react'
import TextValidator from '../helpers/textValidator'
import { findProductByID } from '../helpers/index'
import Button from './button'
import TooltipValidation from './TooltipValidation'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'


interface ProductFormProps {
  id: number
  allProducts: productInterface[]
  currencies: currencyStateInterface
  saveProductByKey: (id: number, data: productInterface)=>void
}
interface fieldsDescriptor {
  [key: string]: {
    validator: TextValidator,
    value: string
    }
}


const ProductForm = ({id, allProducts, currencies,  saveProductByKey}:ProductFormProps) => {
  const product = findProductByID(id, allProducts)
  const [fieldData, setFieldData] = useState<fieldsDescriptor>({
    id: {
      validator: new TextValidator().isNumber().isUnquie(
        allProducts.map(product => String(product.id)).filter(item => item !== String(id))
      ),
       //.isNumber().isUnquie(allProducts.map(product => product.id).filter(item => item !== id))
      value: String(product.id)
    },
    name: {
      validator: new TextValidator().required().isString().minLength(2),
      value: product.name
    },
    description: {
      validator: new TextValidator().required().isString().minLength(2),
      value: product.description
    },
    priceBase: {
      validator: new TextValidator().required().isString().minLength(3).maxLength(3),
      value: product.price.base,
    },
    priceAmount: {
      validator: new TextValidator().required().isNumber().isNumberMinValue(0),
      value: String(product.price.amount)
    },

  })


  const handleChange = (fieldName: string) => (e) => {
    const input = e.target
    if (Object.keys(fieldData).includes(fieldName)){
      console.log(input.value)
      const newFieldData = {...fieldData}
      newFieldData[fieldName] = {
        ...newFieldData[fieldName],
        value: input.value
      }
      setFieldData(newFieldData)
    }
    
  }
  return (
    <form className="p-4">
      <label htmlFor="id">ID</label>
      <TooltipValidation
        labelMessage={({id:'id', message: 'ID'})}
        NotValidMessage={fieldData.id.validator.validate(fieldData.id.value)[1]}
        TooltipMessage="must be a unquie integer"
      >
        <input
          id="id"
          type="number"
          step="1"
          onChange={handleChange('id')}
          defaultValue={fieldData.id.value}
          className={fieldData.id.validator.validate(fieldData.id.value)[0] ? 'bg-mainbg' : 'bg-red-200'}
        />
      </TooltipValidation>
      <Button type="submit">Save</Button>
    </form>
  )
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