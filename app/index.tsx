import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
// state imports
import { Provider, connect } from "react-redux";
import store from './redux/store'
import {productAdd, currencyAdd, currencySelect } from './redux/actions'
import { productInterface } from './redux/reducers/products'
import { currenciesState } from './redux/reducers/currencies';
import Layout from './components/layout'
import MenuItems from './components/MenuItems'
import ProductList from './components/productList'
import getAllProducts from './hooks/getAllProducts';
import ProductListItem from './components/productListItem';
//import ProductListItem from './components/productListItem'
//import DialogManager from './components/dialogManager'

//import useUser, { users } from './hooks/useUser'
//import getAllCurrencies from './hooks/getAllCurrencies'
//import getAllProducts from './hooks/getAllProducts'
//import usePopupState from './hooks/usePopupState'
//component imports

interface AppProps {
  productAdd: (i:productInterface[])=>void
  currencyAdd:(i:currenciesState['allCurrencies'])=>void
  currencySelect:(base:string) => void,
  allProducts: productInterface[]
}

const App = ({currencyAdd, productAdd, allProducts, currencySelect}:AppProps) => {
  // download currencies
  useEffect(() => {
    fetch('/exchange_rates.json')
    .then(res => res.json())
    .then(json => {
      console.log('downloaded currencies')
      currencyAdd(json as currenciesState['allCurrencies'])
    })
    .then(() => {currencySelect('AUD')})
    
    fetch('./products.json')
    .then(res=>res.json())
    .then(json => {
      console.log('downloaded products')
      productAdd(json as productInterface[])
    })
  }, [])
  
  return (
    <Layout MenuItems={<MenuItems />}>
      <ProductList>{
        allProducts.map(
          (a, i)=> <ProductListItem id={a.id} key={i} showDetailsButton={true}/>)
      }</ProductList>
      {/*
        <DialogManager
          popupStack={popupStack}
          user={user}
          allProducts={allProducts.data}
          exchangeRates={allCurrencies}
          updateProductById={(user: users, id: number, data) => {
            updateProductByKey(id, data, user)
          }}
        />
      */}
    </Layout>
  )
}

const AppWithDispatch =
  connect(
    state => ({
      allProducts: state.products.allProducts
    }),
    {productAdd, currencyAdd, currencySelect}
  )(App)

ReactDOM.render(
  (
    <Provider store={store}>
      <AppWithDispatch />
    </Provider>
  ),
  document.getElementById('root')
)
