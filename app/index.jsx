import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import getAllCurrencies from './hooks/getAllCurrencies';
import getAllProducts from './hooks/getAllProducts'
import ProductList from './components/productList'
import MenuItems from './components/MenuItems'
import usePopupState from './hooks/usePopupState'
import 'regenerator-runtime/runtime'

const App = () => {

  // state hooks
  const popupStack = usePopupState();
  const [user, setUser] = useState('user');

  const [allCurrencies, setSelectedCurrency] = getAllCurrencies();
  const [AllProducts, updateProductByKey] = getAllProducts(user);


  if (allCurrencies.status === "downloaded" && allCurrencies.data && !allCurrencies.selectedKey) {
    setSelectedCurrency('AUD');
  }
  return (
    <Layout
      MenuItems={<MenuItems user={user} setUser={setUser} exchangeRates={allCurrencies} />}
    >
      <ProductList
        products={AllProducts.data}
        exchangeRates={allCurrencies}
        updateProductByKey={updateProductByKey}
        popupStack={popupStack}
      />
      <div>future popup holder</div>
    </Layout>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));