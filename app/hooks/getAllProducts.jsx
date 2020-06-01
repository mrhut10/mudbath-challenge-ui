import React from 'react';
import getJSONFileData from './getJSONFileData';

const products_file_url = '/products.json'

const getAllProducts = (user) => {
  const [stateValue, selectItemByKey, updateItemByKey] = getJSONFileData(
    products_file_url,
    'products',
    'id'
  )
  const updateByKey = (key, newDefinition) => {
    if (user==="admin"){
      updateItemByKey(key, newDefinition);
    }
  }
  return [stateValue, selectItemByKey, updateByKey];
}


export default getAllProducts;