import { productInterface, productState } from '../redux/reducers/products'
import { currencyItem } from '../hooks/getAllCurrencies'
import { users } from '../hooks/useUser'

export const PRODUCT_ADD = 'PRODUCT_ADD'
export const PRODUCT_EDIT = 'PRODUCT_EDIT'
export const PRODUCT_DELETE = 'PRODUCT_DELETE'
export const PRODUCT_DIALOG_VIEW = 'PRODUCT_DIALOG_VIEW'
export const PRODUCT_DIALOG_EDIT = 'PRODUCT_DIALOG_EDIT'
export const PRODUCT_DIALOG_CLOSE = 'PRODUCT_DIALOG_CLOSE'

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

export interface ACTION_PRODUCT_DIALOG_VIEW extends action {
  type: typeof PRODUCT_DIALOG_VIEW
  payload: {
    id: number,
    type:'view',
  }
}

export interface ACTION_PRODUCT_DIALOG_EDIT extends action {
  type: typeof PRODUCT_DIALOG_EDIT
  payload: {
    id: number,
    type:'edit',
  }
}

export interface ACTION_PRODUCT_DIALOG_CLOSE extends action {
  type: typeof PRODUCT_DIALOG_CLOSE
  payload: number
}

export interface ACTION_USER_LOGIN extends action {
  type: typeof USER_LOGIN,
  payload: users
}

export interface ACTION_CURRENCIES_ADD extends action {
  type: typeof CURRENCIES_ADD
  payload: currencyItem | currencyItem[]
}

export interface ACTION_CURRENCIES_SELECT extends action {
  type: typeof CURRENCIES_SELECT,
  payload: currencyItem['base']
}