import React from 'react';
import ProductListItem from './productListItem'

const keyMatch = keyname => objA => objB => obj[keyname] === key;

const ProductList = ({Products, exchangeRates, selectedCurrency}) => (
  <ul className="bg-white flex flex-wrap">
    {Products.map(product => {
      const { id, name, description, relatedProducts, price } = product;
      const exchangeRate = price.base === selectedCurrency ? 1 : exchangeRates.find(rate => rate.base === price.base).rates[selectedCurrency];
      return (
        <ProductListItem
          name={name}
          id={id}
          description={description}
          relatedProducts={relatedProducts.map(key => Products.find(item => item['id'] === key))}
          price={price.amount * exchangeRate}
          selectedCurrency={selectedCurrency}
        />
      )
    })}
  </ul>
)

export default ProductList;