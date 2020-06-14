import React, { ReactElement } from 'react';
import { findProductByID } from '../helpers/index'
import Overlay from './overlay'
import DialogMenu from './dialogMenu'
import ProductDetails from './productDetails'

import {usePopupStateReturnInterface} from '../hooks/usePopupState'
import {productInterface} from '../hooks/getAllProducts'
import {currencyStateInterface} from '../hooks/getAllCurrencies'
import { users } from '../hooks/useUser'


interface ContentProductDetailsProps {
  id: productInterface["id"]
  popupStack: usePopupStateReturnInterface
  user: users
  allProducts: productInterface[]
  exchangeRates: currencyStateInterface
}

const ContentProductDetails = ({id, popupStack, user, allProducts, exchangeRates}:ContentProductDetailsProps) => {
  const {name, photo} = findProductByID(id, allProducts) ?? {name: 'LOADING', photo: 'LOADING'}

  return (
    <>
      <Overlay
        className="h-40"
        BgElement={
          <div
            className="w-full h-40 overflow-hidden bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage:
                `linear-gradient(to bottom, rgba(255,255,255,1) 33%,rgba(255,255,255,0) 100%), url('${photo}')`
            }}>
              <div className="m-3 font-bold text-dark text-xl">
                <span className="border-b-2 border-dotted border-light">
                  {name}
                </span>
              </div>
          </div>
        }
      >
        <DialogMenu id={id} user={user} allProducts={allProducts} popupState={popupStack} />
      </Overlay>
      <ProductDetails id={id} user={user} allProducts={allProducts} currencies={exchangeRates} popupState={popupStack}/>
    </>
  )
}

export default ContentProductDetails;