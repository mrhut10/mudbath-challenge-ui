import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {productAdd, currencyAdd, currencySelect } from './redux/actions'
import { SHA256 } from 'crypto-js'



import Layout from './components/layout'
import MenuItems from './components/MenuItems'
import ProductList from './components/productList'
import ProductListItem from './components/productListItem';
import DialogManager from './components/dialogManager'

import { productInterface } from './redux/reducers/products'
import { currenciesState } from './redux/reducers/currencies';

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
    .then(json => json
      .map(
        item => {
          const seed = SHA256(JSON.stringify(item)).toString()
          return {...item, photo: `https://picsum.photos/seed/${seed}/200`}
        }
      )
    )
    .then(json => {
      console.log('downloaded products')
      productAdd(json as productInterface[])
    })
  }, [])
  
  return (
    <Layout MenuItems={<MenuItems />}>
      <ProductList>
        {
          allProducts.map(
          (a, i)=> <ProductListItem id={a.id} key={i} showDetailsButton={true}/>)
        }
      </ProductList>
      <DialogManager />
    </Layout>
  )
}

const mapStateToProps = state => ({
  allProducts: state.products.allProducts,
})

const dispatchObject = {productAdd, currencyAdd, currencySelect}


export default connect(mapStateToProps, dispatchObject)(App)