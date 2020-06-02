import React from 'react';
import ProductListItem from './productListItem'

const keyMatch = keyname => objA => objB => obj[keyname] === key;

const ProductList = ({products, exchangeRates, updateProductByKey}) => {
  const selectedCurrency = exchangeRates.selectedKey
  return (
  <ul className="flex flex-wrap bg-green-200">
    {products.map(product => {
      const { id, name, description, relatedProducts, price } = product;
      return (
        <ProductListItem
          className="sm:w-full md:w-1/2 lg:w-1/3 mb-4 p-2"
          name={name}
          key={id}
          description={description}
          relatedProducts={relatedProducts}
          price={price}
          selectedCurrency={selectedCurrency}
          exchangeRates={exchangeRates}
          allProducts={products}
          updateProductByKey={updateProductByKey}
        />
      )
    })}
  </ul>
)}

export default ProductList;