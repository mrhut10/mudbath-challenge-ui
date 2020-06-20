import React from 'react'
import { connect } from 'react-redux'
import Card from './card'
import Button from './button'
import { findExchangeRate, findProductByID, users } from '../helpers/index'
import { productInterface, productState } from '../redux/reducers/products'
import { currenciesState } from '../redux/reducers/currencies'
import { userNames } from '~/redux/reducers/user'
import { productDialogView, productDialogEdit } from '../redux/actions'


interface ProductListItemProps {
  id: number
  allProducts: productInterface[]
  exchangeRates: currenciesState
  user?: users
  showDetailsButton?: boolean
  showEditButton?: boolean
  productDialogView: (id:number) => void,
  productDialogEdit: (id:number, user: userNames) => void,
}

function ProductListItem({
  id,
  allProducts,
  exchangeRates,
  user = 'user',
  showDetailsButton = true,
  showEditButton = user === 'admin',
  productDialogEdit,
  productDialogView,
}: ProductListItemProps) {
  const selectedCurrency = exchangeRates.selected
  const { name, price, photo } = findProductByID(id, allProducts)
  const exRate = findExchangeRate(
    price.base,
    exchangeRates.selected,
    exchangeRates,
  )

  return (
    <li className="w-full p-5 list-none">
      <Card>
        <div className="w-full overflow-hidden flex justify-evenly p-2 flex-wrap xsm:flex-no-wrap">
          <div className="flex items-center w-40 h-40">
            {/*this will center image V */}
            <div className="flex rounded-lg w-full bg-mainbg p-2">
              <img
                className="w-full h-auto object-cover rounded-lg"
                src={photo}
              />
            </div>
          </div>
          <div className="flex-shrink flex-grow p-8 flex flex-wrap justify-between items-start">
            {/*Title Price and Buttons */}
            <div className="mr-8 mb-4">
              <h3 className="font-bold text-dark mb-3">{name}</h3>
              {!exRate ? (
                'LOADING'
              ) : (
                <div className="space-x-4">
                  <span className="text-lg">
                    ${(price.amount * exRate).toFixed(2)}
                  </span>
                  <span className="text-sm">{selectedCurrency}</span>
                </div>
              )}
            </div>
            <div className="box-border flex justify-between flex-wrap h-10 w-32">
              {showDetailsButton ? (
                <Button onClick={() => productDialogView(id)}>
                  Details
                </Button>
              ) : undefined}
              {showEditButton ? (
                <Button
                  disabled={user !== 'admin'}
                  onClick={() => productDialogEdit(id, user)}
                  tooltip={(user === 'user' && 'Sign In to edit') || undefined}
                >
                  Edit
                </Button>
              ) : undefined}
            </div>
          </div>
        </div>
      </Card>
    </li>
  )
}

const mapStateToProps = state => ({
  allProducts: state.products.allProducts,
  exchangeRates: state.currencies,
  user: state.user
  // popupStack?: usePopupStateReturnInterface
})

export default connect(mapStateToProps, {productDialogView, productDialogEdit})(ProductListItem)
