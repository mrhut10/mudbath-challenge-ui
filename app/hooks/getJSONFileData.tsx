import React, { useState, useEffect } from 'react';

export interface JSONFileState<T, K extends keyof T> {
  status: 'downloading' | 'downloaded'
  selectedKey: K | undefined | null
  data: T[]
}

function getJSONFileData<T, K extends keyof T>(path:string, name:string, keyName:K){
  const initialState:JSONFileState<T, K> = {
    status: 'downloading',
    data: [],
    selectedKey: undefined,
  }
  const [stateValue, setSateValue]:[JSONFileState<T, K>, (a:JSONFileState<T, K>) => any] = useState(initialState);

  const itemByKeyValue = (keyValue:any):any => stateValue.data.find(item => item[keyName] === keyValue)
  
  const selectItemByKey = (keyValue:any) => {
    if (!itemByKeyValue(keyValue)){
      // item doesn't exist
      return new Error("can't select an item that doesn't exist")
    }

    return setSateValue({
      ...stateValue,
      selectedKey: keyValue
    })
  }

  const updateItemByKey = (keyValue:any, newItem:T) => {
    const oldItemIndex = stateValue.data.findIndex(item => item[keyName] === keyValue);
    const oldItem = stateValue.data[oldItemIndex];

    // item must exist
    if (!oldItem){
      throw new Error("Item Must Exist to Update It");
    }

    // prevent id conflicts
    if (
      keyValue !== newItem[keyName] &&
      stateValue.data.find(item => item[keyName] === newItem[keyName])
    ) {
      // id is getting change and will be a conflict
      return new Error("can't change as will create conflict of multiple items with same id");
    }

    return setSateValue({
      ...stateValue,
      data: stateValue.data.map((item, index) => index === oldItemIndex ? newItem : oldItem)
    })
  }

  useEffect(()=>{
    fetch(path)
    // as isn't a normal API, we have to force it to stream download the file
    .then(response => response.json())
    .then(value => {
      // log downloaded 
      console.log(`${name} downloaded`, value);
      // cast value into array of T
      return value as T[];
    })
    .then(values => setSateValue({
      status: 'downloaded',
      data: values,
      selectedKey: undefined
    }));
  }, [])
  return {
    stateValue, selectItemByKey, updateItemByKey
  };
}

export default getJSONFileData