import { combineReducers } from "redux";
import products from './products';
import user from './user'
import currencies from './currencies'


export default combineReducers({
  products,
  currencies,
  user,
});
