import React, {useState} from 'react'
import TextValidator from '../helpers/textValidator'
import { findProductByID } from '../helpers/index'
import Button from './button'
import TooltipValidation from './TooltipValidation'
import Input from './Input'
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
  [key: string]:
    {
      validator: TextValidator,
      value: string
    }
}

const failMessagesGenerator = (currencies:currencyStateInterface) => ({
  id: 'ID must be a unquie positive integer',
  name: 'must be at least 2 charators long',
  description: 'must be at least 10 charators long',
  priceBase: `must be 3 charators and one of the following ${currencies.data.map(item => item.base).join(' | ')}`,
  priceAmount: 'must be a non negative number'
})

const ProductForm = ({id, allProducts, currencies,  saveProductByKey}:ProductFormProps) => {
  const failMessages = failMessagesGenerator(currencies)
  const product = findProductByID(id, allProducts)
  const [fieldData, setFieldData] = useState<fieldsDescriptor>({
    id: {
      validator: new TextValidator()
        .isNumber(failMessages.id)
        .isInteger(failMessages.id)
        .isNumberMinValue(failMessages.id,1)
        .isUnquie(
          'value is already used',
          allProducts.map(product => String(product.id)).filter(item => item !== String(id))
        ),
      value: String(product.id)
    },
    name: {
      validator: new TextValidator()
        .required(failMessages.name)
        .minLength(failMessages.name,2),
      value: product.name
    },
    description: {
      validator: new TextValidator()
        .required(failMessages.description)
        .minLength(failMessages.description, 10),
      value: product.description
    },
    priceBase: {
      validator: new TextValidator()
        .required(failMessages.priceBase)
        .minLength(failMessages.priceBase, 3)
        .maxLength(failMessages.priceBase, 3)
        .oneOf(failMessages.priceBase, currencies.data.map(item => item.base)),
      value: product.price.base,
    },
    priceAmount: {
      validator: new TextValidator()
        .required(failMessages.priceAmount)
        .isNumber(failMessages.priceAmount)
        .isNumberMinValue(failMessages.priceAmount, 0),
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
    
    //const invaliedFields = ValidationResults.filter(item => item[0])
    
  }
  const ValidationResults: [string, [boolean, string]][] = Object.keys(fieldData)
    .map((key) => [
      key,
      fieldData[key].validator.validate(fieldData[key].value)
  ])
  const ValidationErrors: [string, [boolean, string]][] = ValidationResults.filter(item => item[1][0] !== true)

  return (
    <form className="p-4 w-full">
      {/* ID Field */}
      <TooltipValidation
        labelMessage={({id:'id', message: 'ID'})}
        NotValidMessage={ValidationResults.find(item => item[0] === 'id')[1][1]}
        TooltipMessage="unquie ID for product"
        >
        <Input 
          id="id"
          type="number"
          required
          validatorResult={ValidationResults.find(item => item[0] === 'id')[1]}
          step="1"
          onChange={handleChange('id')}
          defaultValue={fieldData.id.value}
          className="w-full"
          />
      </TooltipValidation>
      {/* Name Field */}
      <TooltipValidation
        labelMessage={({id:'name', message: 'Name'})}
        NotValidMessage={ValidationResults.find(item => item[0] === 'name')[1][1]}
        TooltipMessage="product name"
        >
        <Input
          id="name"
          type="text"
          minLength={2}
          required
          validatorResult={ValidationResults.find(item => item[0] === 'name')[1]}
          step="1"
          onChange={handleChange('name')}
          defaultValue={fieldData.name.value}
          className="w-full"
          />
      </TooltipValidation>
      {/* Description Field */}
      <TooltipValidation
        labelMessage={({id:'description', message: 'Description'})}
        NotValidMessage={ValidationResults.find(item => item[0] === 'description')[1][1]}
        TooltipMessage="product Description"
      >
        <Input
          id='description'
          name='description'
          type='textArea'
          rows={4}
          defaultValue={fieldData.description.value}
          validatorResult={ValidationResults.find(item => item[0] === 'description')[1]}
          onChange={handleChange('description')}
          className='w-full'
        />
      </TooltipValidation>
      <TooltipValidation
        labelMessage={({id:'price', message: 'Price'})}
        NotValidMessage={
          (ValidationResults.find(item => item[0] === 'priceBase')[1][1])
          + ' '
          + ValidationResults.find(item => item[0] === 'priceAmount')[1][1]
        }
        TooltipMessage="product price"
        className=" flex space-x-4"
        >
          <Input
            id="priceBase"
            type="select"
            required
            validatorResult={ValidationResults.find(item => item[0] === 'priceBase')[1]}
            onChange={handleChange('priceBase')}
            defaultValue={fieldData.priceBase.value}
            className="m-3"
            options={currencies.data.map(item => item.base)}
          />
          <Input 
            id="priceAmount"
            type="number"
            required
            validatorResult={ValidationResults.find(item => item[0] === 'priceAmount')[1]}
            step="0.01"
            onChange={handleChange('priceAmount')}
            defaultValue={fieldData.priceAmount.value}
            className=" appearance-none w-full"
          />
      </TooltipValidation>
        {
          ValidationErrors.length > 0 &&
          <div className="bg-red-200 rounded-lg border-b-2 border-red-400 flex justify-evenly m-3">
            Please Correct Field Validation Errors
          </div>
        }
        <Button
        className=" m-y-4"
        type="submit"
        disabled={ValidationErrors.length > 0}
      >
        Save
      </Button>
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