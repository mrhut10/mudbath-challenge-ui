import {
  PRODUCT_ADD,
  PRODUCT_DELETE,
  PRODUCT_EDIT,
  PRODUCT_DIALOG_VIEW,
  PRODUCT_DIALOG_EDIT,
  PRODUCT_DIALOG_CLOSE,
  ACTION_PRODUCT_ADD,
  ACTION_PRODUCT_DELETE,
  ACTION_PRODUCT_EDIT,
  ACTION_PRODUCT_DIALOG_VIEW,
  ACTION_PRODUCT_DIALOG_EDIT,
  ACTION_PRODUCT_DIALOG_CLOSE,
} from './actionTypes'
import {ACTION_USER_LOGIN, USER_LOGIN} from './actionTypes'
import {CURRENCIES_ADD, ACTION_CURRENCIES_ADD, CURRENCIES_SELECT, ACTION_CURRENCIES_SELECT} from './actionTypes'
import { productInterface } from './reducers/products'
import { userNames } from './reducers/user'
import { currencyItem } from './reducers/currencies'


export const productAdd = (products:productInterface|productInterface[]):ACTION_PRODUCT_ADD => ({
  type: PRODUCT_ADD,
  payload: products,
})

export const productEdit = (productID:number, product:productInterface):ACTION_PRODUCT_EDIT => ({
  type: PRODUCT_EDIT,
  payload: {id:productID, product}
})

export const productDelete = (productID: productInterface['id']):ACTION_PRODUCT_DELETE => ({
  type: PRODUCT_DELETE,
  payload: productID
})

export const productDialogView = (productID: productInterface['id']):ACTION_PRODUCT_DIALOG_VIEW => ({
  type: PRODUCT_DIALOG_VIEW,
  payload: {id: productID, type:"view"}
})

export const productDialogEdit = (productID: productInterface['id'], user: userNames):ACTION_PRODUCT_DIALOG_EDIT => ({
  type: PRODUCT_DIALOG_EDIT,
  payload: {id: productID, type:'edit'}
})

export const productDialogClose = (count: number):ACTION_PRODUCT_DIALOG_CLOSE => ({
  type: PRODUCT_DIALOG_CLOSE,
  payload: count,
})

export const login = (user: userNames):ACTION_USER_LOGIN => ({
  type:USER_LOGIN,
  payload: user,
})

export const currencyAdd = (currencys: currencyItem | currencyItem[]):ACTION_CURRENCIES_ADD => ({
  type: CURRENCIES_ADD,
  payload: currencys
})

export const currencySelect = (base: currencyItem['base']):ACTION_CURRENCIES_SELECT => ({
  type: CURRENCIES_SELECT,
  payload: base,
})
