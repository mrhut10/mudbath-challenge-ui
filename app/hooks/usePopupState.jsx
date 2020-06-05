import React from 'react'
import useStack from './useStack'

function usePopupState(){
  const [AllValues, EndValue, addValue, removeValues, danerousEditValue] = useStack();
  const openProductDetails = id => addValue({type: 'productDetail', id});
  const openProductEdit = (id, user) => user === 'admin' ? addValue({type: 'productEdit', id}) : 'not loged in';
  const closePopup = removeValues;
  const danerousProductIDChange = (oldID, newID) => dangerSetValues(
    AllValues.map(
      value =>
        value.type === 'productDetail' || value.type === 'productEdit' && value.id === oldID
        ? {...value, id: newID}
        : value
    )
  );
  return {
    currentValue: EndValue,
    openProductDetails,
    openProductEdit,
    closePopup,
    danerousProductIDChange,
    wholeStack: AllValues,
  }
}

export default usePopupState;