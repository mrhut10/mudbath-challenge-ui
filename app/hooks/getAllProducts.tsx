import React from 'react';
import getJSONFileData from './getJSONFileData';
import { users } from './useUser'


export interface productInterface {
  id: number,
  name: string,
  description: string,
  price: {
    base: string,
    amount: number
  }
  relatedProducts: number[]
}

const products_file_url = '/products.json'

const getAllProducts = () => {
  const {stateValue:allProducts, selectItemByKey, updateItemByKey} = getJSONFileData<productInterface, "id">(
    products_file_url,
    'products',
    "id"
  )
  function updateProductByKey(keyValue:productInterface["id"], newDefinition:productInterface, user:users){
    // only allow admin to edit
    if (user !== "admin"){
      throw new Error("must be admin to update Product")
    }
    
    updateItemByKey(keyValue, newDefinition);
  }
  return {allProducts, selectItemByKey, updateProductByKey};
}


export default getAllProducts;