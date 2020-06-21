import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
// state imports
import { Provider, connect } from "react-redux";
import store from './redux/store'
import App from './app'


ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
)
