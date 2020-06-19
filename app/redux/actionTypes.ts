import { productInterface } from '../hooks/getAllProducts'
import { currencyItem } from '../hooks/getAllCurrencies'

export const PRODUCT_ADD = 'PRODUCT_ADD'
export const PRODUCT_EDIT = 'PRODUCT_EDIT'
export const PRODUCT_DELETE = 'PRODUCT_DELETE'

export const USER_LOGIN = 'USER_LOGIN'

export const CURRENCIES_ADD = 'CURRENCIES_ADD'
export const CURRENCIES_SELECT = 'CURRENCIES_SELECT'

interface action {
  type : string,
  payload: any
}

export interface ACTION_PRODUCT_ADD extends action {
  type: typeof PRODUCT_ADD
  payload: productInterface | productInterface[]
}
export interface ACTION_PRODUCT_EDIT extends action {
  type: typeof PRODUCT_EDIT
  payload: {id: productInterface['id'], product:productInterface}
}
export interface ACTION_PRODUCT_DELETE extends action {
  type: typeof PRODUCT_DELETE
  payload: productInterface['id']
}

export interface ACTION_USER_LOGIN extends action {
  type: typeof USER_LOGIN,
  payload: 
}

export interface ACTION_CURRENCIES_ADD extends action {
  type: typeof CURRENCIES_ADD
  payload: currencyItem | currencyItem[]
}

export interface ACTION_CURRENCIES_SELECT extends action {
  type: typeof CURRENCIES_SELECT,
  payload: currencyItem['base']
}