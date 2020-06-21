import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { findProductByID, last } from '../helpers/index'
import Overlay from './overlay'
import DialogMenu from './dialogMenu'
import ProductDetails from './productDetails'

import { productInterface, productState } from '../redux/reducers/products'
import { currenciesState } from '../redux/reducers/currencies'
import { userNames } from '../redux/reducers/user'

interface ContentProductDetailsProps {
  id: productInterface['id']
//  popupStack: usePopupStateReturnInterface
  user: userNames
  allProducts: productInterface[]
  exchangeRates: currenciesState
}

const ContentProductDetails = ({
  id,
  user,
  allProducts,
  exchangeRates,
}: ContentProductDetailsProps) => {
  const { name, photo } = findProductByID(id, allProducts) ?? {
    name: 'LOADING',
    photo: 'LOADING',
  }

  return (
    <>
      <Overlay
        className="h-40"
        BgElement={
          <div
            className="w-full h-40 overflow-hidden bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,1) 33%,rgba(255,255,255,0) 100%), url('${photo}')`,
            }}
          >
            <div className="m-3 font-bold text-dark text-xl">
              <span className="border-b-2 border-dotted border-light">
                {name}
              </span>
            </div>
          </div>
        }
      >
        <DialogMenu
          id={id}
        />
      </Overlay>
      <ProductDetails id={id} />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.users,
  allProducts: state.products.allProducts,
  exchangeRates: state.currencies,
})

export default connect(mapStateToProps)(ContentProductDetails)
