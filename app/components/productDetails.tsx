import React from 'react'
import { connect } from 'react-redux'
import { findProductByID, findExchangeRate } from '../helpers/index'
import ProductListItem from './productListItem'
import { productInterface } from '../hooks/getAllProducts'
import { currenciesState } from '../redux/reducers/currencies'
import { users } from '../hooks/useUser'
import { usePopupStateReturnInterface } from '../hooks/usePopupState'

interface ProductDetailsProps {
  id: number
  allProducts: productInterface[]
  currencies: currenciesState
  user: users
}
const ProductDetails = ({
  id,
  user,
  allProducts,
  currencies,
}: ProductDetailsProps) => {
  const { name, description, price, relatedProducts } = findProductByID(
    id,
    allProducts,
  )
  const exRate = findExchangeRate(
    price.base,
    currencies.selected,
    currencies,
  )
  const priceInLocal = exRate ? (price.amount * exRate).toFixed(2) : undefined

  return (
    <>
      <div className="p-2 flex w-full justify-between">
        <div className="font-bold">
          <span className="text-lg">${priceInLocal}</span>{' '}
          <span className="text-sm">{currencies.selected}</span>{' '}
          <span className="text-sm text-deemphgrey">
            / {price.amount.toFixed(2)} {price.base}
          </span>
        </div>
        <div className="p-2">
          <span className="text-deemphgrey">ID:</span>{' '}
          <span className="font-bold">{id}</span>
        </div>
      </div>
      <div className="p-4 text-center">{description}</div>
      <hr className="h-2 p-1" />
      <div className="bg-mainbg p-2">
        <h3 className="text-deemphgrey">Related</h3>
        <div className="py-8">
          {relatedProducts.map((product) => (
            <ProductListItem id={product} key={product} showDetailsButton showEditButton={false}/>
          ))}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  allProducts: state.products.allProducts,
  currencies: state.currencies,
  user: state.users,

  // popupState: usePopupStateReturnInterface  
})

export default connect(mapStateToProps)(ProductDetails)
