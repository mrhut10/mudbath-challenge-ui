import React from 'react';
import ProductListItem from './productListItem'

const keyMatch = keyname => objA => objB => obj[keyname] === key;

const ProductList = ({products, exchangeRates}) => {
  const selectedCurrency = exchangeRates.selectedKey
  return (
  <ul className="flex flex-wrap bg-green-200 justify-center">
    {products.map(product => (
      <ProductListItem
        className="sm:w-full md:w-1/2 lg:w-1/3 mb-4 p-2"
        id={product.id}
        key={product.id}
        exchangeRates={exchangeRates}
        allProducts={products}
      />
    ))}
  </ul>
)}

export default ProductList;