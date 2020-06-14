import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useUser from './hooks/useUser'
import getAllProducts, { productInterface } from './hooks/getAllProducts'
import getAllCurrencies from './hooks/getAllCurrencies'
import useStack from './hooks/useStack'
import usePopupState from './hooks/usePopupState'


const App = () => {
  const [user, toogleUser, setUser] = useUser()
  const {allProducts, updateProductByKey} = getAllProducts()
  const {allCurrencies, setSelectedCurrency} = getAllCurrencies()
  const Stack = useStack<string>()
  const popupState = usePopupState();

  return (
    <div>
      <div className="m-3 gb-green-400 w-full" >
        <h2 className="font-bold">Testing useUser()</h2>
        <div>hello {user}</div>
        <button className="m-2 p-2 bg-blue-400" onClick={toogleUser}>click to toogle user</button>
      </div>
      <div className="m-3">
        <h2 className="font-bold">testing getAllProducts() methods</h2>
        {JSON.stringify(allProducts)}
      </div>
      <button className="m-2 p-2 bg-blue-400" onClick={()=>{
        updateProductByKey(
          1,
          {
            id: 1, name: 'changed Product', description: 'new description', price: {amount: 10, base: 'USD'}, relatedProducts: []
          },
          user
        )
      }}>
        changeProduct with id:1
      </button>
      <div>
        <h2 className="font-bold">test getAllCurrencies() Methods</h2>
        <div>{JSON.stringify(allCurrencies)}</div>
        <button onClick={()=>setSelectedCurrency('Bo')}>Select Currency</button>
      </div>
      <div>
        <h2 className="font-bold">testing useStack() methods</h2>
        <div>{JSON.stringify({
          last: Stack.lastValue,
          all: Stack.allValues,
        })}</div>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>Stack.addValue('hello'+Stack.allValues.length)}>Add Hello</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>Stack.removeValues()}>remove 1 value</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>Stack.removeValues(3)}>remove 3 value</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>Stack.dangerSetValues(['boo'])}>danerously set to ['boo']</button>
      </div>
      <div>
        <h2 className="font-bold">testing popupStack() methods</h2>
        <div>{JSON.stringify({
          next: popupState.currentValue,
          all: popupState.wholeStack
        })}</div>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>popupState.openProductDetails(allProducts.data, 1)}>openDetails</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>popupState.openProductEdit(allProducts.data, 1, user)}>openEdit</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>popupState.closePopups(1)}>close 1 position</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>popupState.closePopups(3)}>close 3 position</button>
        <button className="p-2 m-2 bg-blue-300" onClick={()=>popupState.danerousProductIDChangeAndCloseWindow(user, 1, 2)}>rename id:1 to id:10 (work)</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));