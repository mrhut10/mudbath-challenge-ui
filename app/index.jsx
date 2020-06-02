import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import getAllCurrencies from './hooks/getAllCurrencies';
import getAllProducts from './hooks/getAllProducts'
import ProductList from './components/productList'
import 'regenerator-runtime/runtime'



const App = () => {

  const [allCurrencies, setSelectedCurrency] = getAllCurrencies();
  if (allCurrencies.status === "downloaded" && allCurrencies.data && !allCurrencies.selectedKey) {
    setSelectedCurrency('AUD');
  }
  const [AllProducts, updateProductByKey] = getAllProducts()
  return (
    <Layout>
      <h1>XYZ Products</h1>
      <div>{JSON.stringify(allCurrencies)}</div>
      <ProductList
        products={AllProducts.data}
        exchangeRates={allCurrencies}
        updateProductByKey={updateProductByKey}
      />
    </Layout>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));