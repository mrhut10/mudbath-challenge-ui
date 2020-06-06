import React from 'react';
import getJSONFileData from './getJSONFileData';
import { users } from '../helpers'


export interface productInterface {
  id: string,
  name: string,
  description: string,
  price: {
    base: string,
    amount: number
  }
  relatedProducts: string[]
}

const products_file_url = '/products.json'

const getAllProducts = (user: users) => {
  const {stateValue, selectItemByKey, updateItemByKey} = getJSONFileData<productInterface, "id">(
    products_file_url,
    'products',
    "id"
  )
  const updateByKey = (keyValue:any, newDefinition:productInterface) => {
    // only allow admin to edit
    if (user !== "admin"){
      return new Error("must be admin to update Product")
    }
    
    try {
      updateItemByKey(keyValue, newDefinition);
    } catch (error) {
      alert(error.message)
    }
  }
  return [stateValue, selectItemByKey, updateByKey];
}


export default getAllProducts;