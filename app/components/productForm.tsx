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
  const resetData:fieldsDescriptor = {
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
    relatedProducts: {
      validator: new TextValidator()
        .isCommaSeparatedIntegers('Error relatedProducts must be comma separated list of non negative integers')
        .isCommaSeparatedIntegersNotInclude('must not reference itself',product.id)
        .isCommaSeparatedIntegerAndEachValueInList(
          'must be comma separated product ids that exist',
          allProducts.map(item => item.id)
        )
        .isCommaSeparatedIntegerInquieValues('each value must be unquie')
        ,
      value: product.relatedProducts.join(',')
    }
  }
  const [fieldData, setFieldData] = useState<fieldsDescriptor>(resetData)
  const ValidationResults: [string, [boolean, string]][] = Object.keys(fieldData)
    .map((key) => [
      key,
      fieldData[key].validator.validate(fieldData[key].value)
  ])
  const ValidationErrors: [string, [boolean, string]][] = ValidationResults.filter(item => item[1][0] !== true)


  const handleChange = (fieldName: string) => (e) => {
    const input = e.target
    if (Object.keys(fieldData).includes(fieldName)){
      const newFieldData = {...fieldData}
      newFieldData[fieldName] = {
        ...newFieldData[fieldName],
        value: input.value
      }
      setFieldData(newFieldData)
    } 
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (ValidationErrors.length > 0){
      // don't submit
    } else {
      const newData = Object
        .keys(fieldData)
        .reduce<Partial<productInterface>>(
          (acc, next) => {
            const field = fieldData[next]
            let returnData = {...acc}
            if (next==='priceAmount'){
              returnData.price = {...returnData.price, amount: Number(field.value)}
            } else if (next === 'priceBase'){
              returnData.price = {...returnData.price,base: field.value}
            } else if (next === 'relatedProducts'){
              returnData.relatedProducts = field.value.split(',').map(item => Number(item))
            } else {
              returnData[next] = field.value
            }
            return returnData
          },
          {}
        )
        // save product
        saveProductByKey(id, {...product, ...newData})
    }
  }
  
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
      {/* price Fields (amount and base) */}
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
      {/* related Products */}
      <TooltipValidation
        labelMessage={({id:'relatedProducts', message: 'Related'})}
        NotValidMessage={ValidationResults.find(item => item[0] === 'relatedProducts')[1][1]}
        TooltipMessage="Related Products"
      >
        <Input
          id='relatedProducts'
          name='relatedProducts'
          type='text'
          defaultValue={fieldData.relatedProducts.value}
          validatorResult={ValidationResults.find(item => item[0] === 'relatedProducts')[1]}
          onChange={handleChange('relatedProducts')}
          className='w-full'
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
        onClick={handleSave}
      >
        Save
      </Button>
    </form>
  )
}


export default ProductForm