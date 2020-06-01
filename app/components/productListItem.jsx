import React from 'react';

const ProductListItem = ({id, name, description, price, relatedProducts, selectedCurrency}) => {
  return (
    <ul className="sm:w-full md:w-1/2 lg:w-1/3 mb-8 p-4">
      <h3>{name}</h3>
      <ul>
        <li>ID: {id}</li>
        <li>{description}</li>
        <li>price: {price.toFixed(2)} (in {selectedCurrency})</li>
      </ul>
    </ul>
  )
}

export default ProductListItem;