import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
// state imports
import useUser, { users } from './hooks/useUser'
import getAllCurrencies from './hooks/getAllCurrencies'
import getAllProducts from './hooks/getAllProducts'
import usePopupState from './hooks/usePopupState'
//component imports
import Layout from './components/layout'
import MenuItems from './components/MenuItems'
import ProductList from './components/productList'
import ProductListItem from './components/productListItem'
import DialogManager from './components/dialogManager'

const App = () => {
  // state hooks
  const [user, toogleUser, setUser] = useUser()
  const { allCurrencies, setSelectedCurrency } = getAllCurrencies()
  const { allProducts, updateProductByKey } = getAllProducts()
  const popupStack = usePopupState()

  // select first currency once downloaded
  if (
    allCurrencies.status === 'downloaded' &&
    allCurrencies.data &&
    !allCurrencies.selectedKey
  ) {
    setSelectedCurrency(allCurrencies.data[0].base)
  }

  return (
    <Layout
      MenuItems={
        <MenuItems
          user={user}
          toogleUser={toogleUser}
          setUser={setUser}
          exchangeRates={allCurrencies}
          setCurrency={setSelectedCurrency}
        />
      }
    >
      <ProductList>
        {allProducts.data.map(({ id }, i, list) => (
          <ProductListItem
            key={i}
            user={user}
            id={id}
            allProducts={list}
            exchangeRates={allCurrencies}
            popupStack={popupStack}
            showEditButton
          />
        ))}
      </ProductList>
      <DialogManager
        popupStack={popupStack}
        user={user}
        allProducts={allProducts.data}
        exchangeRates={allCurrencies}
        updateProductById={(user: users, id: number, data) => {
          updateProductByKey(id, data, user)
        }}
      />
    </Layout>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
