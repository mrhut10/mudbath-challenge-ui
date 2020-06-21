import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_EDIT, ACTION_PRODUCT_ADD, ACTION_PRODUCT_EDIT, ACTION_PRODUCT_DELETE, ACTION_PRODUCT_DIALOG_CLOSE, PRODUCT_DIALOG_CLOSE } from '../actionTypes'
import { PRODUCT_DIALOG_EDIT, PRODUCT_DIALOG_VIEW, ACTION_PRODUCT_DIALOG_EDIT, ACTION_PRODUCT_DIALOG_VIEW } from '../actionTypes'


export interface productInterface {
  id: number
  name: string
  description: string
  price: {base: string, amount: number}
  relatedProducts: number[]
  photo?: string
} 


export interface productState {
  allProducts: productInterface[],
  productDialogState: {id: number, type: 'edit' | 'view'}[]
}

const initialState: productState = {
  allProducts: [],
  productDialogState: []
};

export default function (
  state=initialState,
  action:
    ACTION_PRODUCT_ADD | 
    ACTION_PRODUCT_EDIT |
    ACTION_PRODUCT_DELETE |
    ACTION_PRODUCT_DIALOG_EDIT |
    ACTION_PRODUCT_DIALOG_VIEW |
    ACTION_PRODUCT_DIALOG_CLOSE
): productState {
  switch (action.type){
    case PRODUCT_ADD:
      {
        const a:ACTION_PRODUCT_ADD = action
        if (a.payload && Array.isArray(a.payload) && a.payload.every(item => isProduct(state, item))){
          return {...state, allProducts: [...state.allProducts, ...a.payload as productInterface[]]}
        } else if (a.payload && isProduct(state, a.payload)){
          return {...state, allProducts: [...state.allProducts, a.payload as productInterface]}
        }
      }
      break
    case PRODUCT_EDIT:
      {
        const a: ACTION_PRODUCT_EDIT = action
        if (
          a.payload?.product &&
          isProduct(state, a.payload.product) &&
          (a.payload.id === a.payload.product.id || state.allProducts.every(item => item.id !== a.payload.product.id))
        ){
          return {
            ...state,
            allProducts:state.allProducts.map(item => item.id === a.payload.id ? a.payload.product : item),
            productDialogState: state.productDialogState
              .map(item => item.id === a.payload.id ? {...item, id: a.payload.product.id} : item)
              .filter((item, i, list) => i !== list.length - 1)
          }
        }
      }
      break
    case PRODUCT_DIALOG_EDIT:
    case PRODUCT_DIALOG_VIEW:
      {
        const a: ACTION_PRODUCT_DIALOG_EDIT | ACTION_PRODUCT_DIALOG_VIEW = action
        return {...state, productDialogState: [...state.productDialogState, a.payload]}
      }
      break
    case PRODUCT_DIALOG_CLOSE:
      {
        const a: ACTION_PRODUCT_DIALOG_CLOSE = action
        return {
          ...state,
          productDialogState: state.productDialogState.filter(
            (v,i)=>i <= (state.productDialogState.length - 1 - (a.payload ?? 0))
          )
        }
      }
    }
    return state;
}

function isProduct(state, item) {
  // check ID
  if (
    !item.id ||
    typeof item.id !== 'number' ||
    !Number.isInteger(item.id)
  ){ return false }

  if (
    !item.name ||
    typeof item.name !== 'string' ||
    !(item.name.length >= 2)
  ){ return false }
  
  if (
    !item.description ||
    typeof item.description !== 'string' ||
    !(item.description.length >= 10)
  ){ return false }

  if (
    !item.price?.base ||
    typeof item.price.base !== 'string'
  ){ return false }
  
  if (
    !item.price?.amount ||
    typeof item.price.amount !== 'number'||
    !(item.price.amount > 0)
  ){ return false }

  if (
    !item.relatedProducts ||
    !Array.isArray(item.relatedProducts) ||
    !item.relatedProducts.every(relID => 
      typeof relID === 'number' &&
      Number.isInteger(relID)
    )
  ){ return false }


  // passed all of the tests
  return true
}

