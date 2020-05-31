import React, { useState, useEffect } from 'react';
import getJSONFileData from './getJSONFileData';

const products_file_url = '/products.json'

const getAllProducts = () => {
  const [stateValue, selectItemByKey] = getJSONFileData(
    products_file_url,
    'products',
    'id'
  )
  return [stateValue, selectItemByKey];
}


export default getAllProducts;