import React, { useState, useRef, useEffect } from 'react'
import ValidatorObject, {validationResult, validationTest} from '../helpers/validatorObject'
import ValidatorText from '../helpers/ValidatorText'
import { findProductByID, findExchangeRate } from '../helpers/index'
import Button from './button'
import TooltipValidation from './TooltipValidation'
import Input from './Input'
import { productInterface } from '../hooks/getAllProducts'
import { currencyStateInterface } from '../hooks/getAllCurrencies'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'
import { users } from '../hooks/useUser'
import ProductListItem from './productListItem'
import ProductList from './productList'
import Overlay from './overlay'
import Validator from '~/helpers/validator'


interface ProductFormProps {
  id: number
  allProducts: productInterface[]
  currencies: currencyStateInterface
  saveProductByKey: (id: number, data: productInterface)=>void
}
interface fieldsDescriptor {
  id: string,
  name: string,
  description: string,
  priceAmount: string,
  priceBase: string,
  relatedProducts: number[]
}

type NamedValidationResults = [string, validationResult]

const ProductForm = ({id, allProducts, currencies,  saveProductByKey}:ProductFormProps) => {
  const validationRules = {
    id: new ValidatorText()
      .isString('ID must be a string')
      .required('ID is required')
      .isInteger('ID must be a integer')
      .MinValue('ID must be positive number', 1)
      .isUnquie('ID is already Taken (must be unquie)', allProducts.filter(item => item.id !== id).map(item => String(item.id))),
    name: new ValidatorText()
      .isString('must be a string')
      .required('required')
      .minLength('name bust be at least 2 char long', 2),
    description: new ValidatorText()
      .isString('must be a string')
      .required('required')
      .minLength('must be at least 10 char long', 10),
    priceAmount: new ValidatorText()
      .required('required')
      .isNumber('must be a number')
      .MinValue('price must be positive', 0.01),
    priceBase: new ValidatorText()
      .required('required')
      .isOneOf(
        `must be one of ${currencies.data.map(item => item.base).join(' | ')}`,
        currencies.data.map(item => item.base)
      ),
    relatedProducts: new ValidatorObject()
        .isArray('must be an array of ')
        .genericTest('items must be integers', (input:any[]) => input.every(item => typeof item === 'number' && Number.isInteger(item)))      
  }
  const product = findProductByID(id, allProducts)

  const resetData:fieldsDescriptor = {
    id: String(product.id),
    name: product.name,
    description: product.description,
    priceBase: product.price.base,
    priceAmount: String(product.price.amount),
    relatedProducts: product.relatedProducts
  }

  const [fieldData, setFieldData] = useState<fieldsDescriptor>(resetData)

  const ValidationResults: NamedValidationResults[] = Object.keys(fieldData)
    .map((key) => [
      key,
      validationRules[key].evaluate(fieldData[key])
  ])
  const ValidationErrors: NamedValidationResults[] = ValidationResults.filter(item => item[1][0] !== true)

  const handleChange = (fieldName: string) => (e) => {
    const input = e.target
    if (Object.keys(fieldData).includes(fieldName)){
      setFieldData({
        ...fieldData,
        [fieldName]: input.value
      })
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (ValidationErrors.length > 0){
      // don't submit
      console.log('fix validation errors first')
    } else {
      const newData = Object.keys(fieldData).reduce<Partial<productInterface>>(
        (acc, next) => {
          const field:string|number|number[] = fieldData[next]
          let returnData = {...acc}
          
          if (next==='id'){
            returnData.id = Number(field)
          } else if (next==='priceAmount'){
            returnData.price = {...returnData.price, amount: Number(field)}
          } else if (next === 'priceBase'){
            returnData.price = {...returnData.price, base: field as string}
          } else {
            /* this will handle the below fields
            *  name
            *  description
            *  relatedProducts 
            *     (last one via a mocked event which sends array we need) */
            returnData[next] = field
          }
          return returnData
        },
        {}
      )
      // save product
      console.log({...product, ...newData})
      saveProductByKey(id, {...product, ...newData})
    }
  }
  
  /*
  // tools to manage related Products
  const relatedProductInputReference = useRef(null)
  const removeRelatedProduct = (removeId:Number) => {
    const element = relatedProductInputReference.current
    const newValue = element.value.split(',').filter(item => Number(item) !== removeId).join(',')
    element.value = newValue;
    handleChange('relatedProducts')({target: element})
  }
  const addRelatedProduct = (addId:number) => {
    const element = relatedProductInputReference.current
    const newValue = [...element.value.split(','), addId].join(',')
    element.value = newValue;
    handleChange('relatedProducts')({target: element})
  }*/

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
          defaultValue={fieldData.id}
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
          defaultValue={fieldData.name}
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
          defaultValue={fieldData.description}
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
            defaultValue={fieldData.priceBase}
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
            defaultValue={fieldData.priceAmount}
            className=" appearance-none w-full"
          />
      </TooltipValidation>
      {/* related Products */}
      <TooltipValidation
        labelMessage={({id:'Related', message: 'Related'})}
        NotValidMessage=""
        TooltipMessage="Select Related Products"
        className=""
        >
          <div className="p-4 flex flex-wrap">
            {allProducts
            .filter(item => item.id !== id)
            .map((item, i) => {
              const priceInLocal = item.price.amount * findExchangeRate(item.price.base, currencies.selectedKey, currencies)
              const toogleItem = (id:number) => {
                const RP = fieldData.relatedProducts.includes(id)
                  ? fieldData.relatedProducts.filter(a=> a !== id)
                  : [...fieldData.relatedProducts, id]
                handleChange('relatedProducts')({target: {value: RP}})
              }
              return (
                <div
                  key={i}
                  className="box-border relative w-full max-w-3xl m-4 bg-cardbg rounded-lg p-5 flex justify-around"
                  onClick={()=>toogleItem(item.id)}
                >
                  <div className="w-1/2 text-red-400 w-32">
                    {fieldData.relatedProducts.includes(item.id) ? 'SELECTED' : ''}
                  </div>
                  <div className="w-1/2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <div className="flex">
                      <div className="text-base mr-2">{priceInLocal.toFixed(2)} ({currencies.selectedKey})</div>
                      <div className="text-deemphgrey text-sm">/ {item.price.amount} ({item.price.base})</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
      </TooltipValidation>
      <div>
        {
          (ValidationErrors?.length ?? 0) > 0 &&
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
      </div>
    </form>
  )
}


export default ProductForm