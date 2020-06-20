import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_EDIT, ACTION_PRODUCT_ADD, ACTION_PRODUCT_EDIT, ACTION_PRODUCT_DELETE } from '../actionTypes'


import { productInterface } from '../../hooks/getAllProducts'

export { productInterface }

export interface productState {
  allProducts: productInterface[],
  productDialogState: {id: number, type: 'edit' | 'view'}[]
}

const initialState: {allProducts:productInterface[]} = {
  allProducts: [],
};

export default function (
  state=initialState,
  action:ACTION_PRODUCT_ADD | ACTION_PRODUCT_EDIT | ACTION_PRODUCT_DELETE
) {
  switch (action.type){
    case PRODUCT_ADD:
      const a:ACTION_PRODUCT_ADD = action
      if (a.payload && Array.isArray(a.payload) && a.payload.every(item => isProduct(state, item))){
        return {...state, allProducts: [...state.allProducts, ...a.payload]}
      } else if (a.payload && isProduct(state, a.payload)){
        return {...state, allProducts: [...state.allProducts, a.payload]}
      }
      break
    default:
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

