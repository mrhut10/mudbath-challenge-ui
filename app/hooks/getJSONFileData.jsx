import react, { useState, useEffect } from 'react';

const getJSONFileData = (path, name, keyName, updateItemFunction) => {
  const [stateValue, setSateValue] = useState({
    status: 'downloading',
    data: [],
    selectedKey: null,
  });
  const itemByKey = key => stateValue.data.find(item => item[keyName] === key)
  const selectItemByKey = key => setSateValue({
    ...stateValue,
    selectedKey: key
  })
  const updateItemByKey = key => {
    const oldItem = itemByKey(key)
    const newItem = updateItemFunction(oldItem)
    setSateValue({
      ...stateValue,
      data: stateValue.data.map(item => item[keyName] === key ? newItem : oldItem)
    })
  }
  useEffect(()=>{
    fetch(path)
    // as isn't a normal API, we have to force it to stream download the file
    .then(response => response.json())
    .then(value => {
      console.log(`${name} downloaded`, value);
      return value;
    })
    .then(value => setSateValue({
      status: 'downloaded',
      data: value,
      selected: null,
    }));
  }, [])
  return [stateValue, selectItemByKey, updateItemByKey];
}

export default getJSONFileData