import React from 'react'
import useStack, { useStackReturnInterface } from './useStack'
import { users } from '../helpers'

interface PopupItemInterface {
  type: "productDetail" | "productEdit"
  id: string
}

const openProductDetails = ({addValue}:useStackReturnInterface<PopupItemInterface>) => (allProducts, id:string) => {
  if (!allProducts.find(product => product.id === id)){
    return new Error("can't open popup to a product that doesn't exist")
  }

  return addValue({type: 'productDetail', id})
};
const openProductEdit = ({allValues, addValue}:useStackReturnInterface<PopupItemInterface>) => (allProducts, id:string, user:users) => {
  if (user !== 'admin'){
    return new Error('Only admin user can edit');
  }
  if (!allProducts.find(product => product.id === id)){
    return new Error("can't open popup to a product that doesn't exist")
  }

  return addValue({type:"productEdit", id})
  
}
const closePopups = ({removeValues}:useStackReturnInterface<PopupItemInterface>) => removeValues;
const danerousProductIDChange = ({allValues, dangerSetValues}:useStackReturnInterface<PopupItemInterface>) => (user: users, oldID: string, newID:string) => {
  if (user !== 'admin'){
    return new Error("only admin can change ID's in stack")
  }

  if (allValues.find(product => product.id === newID)){
    return new Error("newID already exists")
  }

  return dangerSetValues(
    allValues.map(
      value =>
        value.type === 'productDetail' || value.type === 'productEdit'
        ? {...value, id: newID}
        : value
    )
  )
}

function usePopupState(){
  const StackState = useStack<PopupItemInterface>();
  const {allValues, endValue} = StackState

  return {
    currentValue: endValue,
    openProductDetails: openProductDetails(StackState),
    openProductEdit: openProductEdit(StackState),
    closePopups: closePopups(StackState),
    danerousProductIDChange: danerousProductIDChange(StackState),
    wholeStack: allValues,
  }
}

export default usePopupState;