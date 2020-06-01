// if i had the time i would loved to make this persistent
// with indexedDB but I'll just make it work but data will not persist
// after refreshing the page unforchanately

import datasourceRights from './dataSourceRights';
interface databaseReply {
  status: 'success' | 'fail',
  message: string,
  data: any,
}

interface Source {
  name: string,
  data: object[],
  rights: datasourceRights[],
}

class dataSource {
  #sources: Source[] = [];
  newSource(name:string, BaseEntries:object[], rights:datasourceRights[]){
    this.#sources.push({
      name,
      data: [...BaseEntries],
      rights: [...rights],
    })
  }
  getEntries(sourceName:string, userName:string):databaseReply {
    const source = this.#sources.find(source => source.name === sourceName)
    const permitted = source && source.rights.find(right => right.userName === userName && right.canView)
    return {
      status: permitted ? 'success' : 'fail',
      message: permitted ? 'entries attached' : 'either no source or no permission',
      data: permitted ? source.data : undefined,
    }
  }
  EditEntry(sourceName:string, userName:string, index:number, fields:[{name: string | number | symbol, value: any}]):databaseReply{
    const source = this.#sources.find(source => source.name === sourceName)
    const fullPermision = 
      source &&
      fields.every(
        field => source.rights.find(
          right => right.userName === userName && right.fieldEditRights.includes(field.name)
        )
      )
    const indexExists = !!source.data[index];
    
    if (!fullPermision){
      return {
        status: 'fail',
        message: 'source or field permission missing',
        data: undefined,
      }
    }

    if (!indexExists){
      return {
        status: 'fail',
        message: 'source missing entry at index provided',
        data: undefined,
      }
    }

    // we can assume both permision and indexExisting at this point
    let newData = {
      ...source.data[index]
    };
    fields.forEach(field => { newData[field.name] = field.value });
    source.data[index] = newData;

    return {
      status: 'success',
      message: 'data attached',
      data:  newData,
    }
  }
  AddEntry(sourceName: string, userName: string, entry: object):databaseReply{
    const source = this.#sources.find(source => source.name === sourceName);
    const permitted = source && source.rights.find(right => right.userName === userName && right.canAddEntry);

    if (!permitted){
      return {status: 'fail', message: 'source or permission not found', data: undefined}
    }

    source.data.push(entry);
    return {
      status: 'success', 
      message: 'entry added',
      data: source.data.push(entry) - 1, // that will return the new index of entry
    }
  }
  DeleteEntry(sourceName: string, userName: string, index: number):databaseReply{
    const source = this.#sources.find(source => source.name === sourceName)
    const permitted = source && source.rights.find(right => right.userName === userName && right.canDeleteEntry)

    if (!permitted){
      return {status: 'fail', message: 'source or permision not found', data: undefined}
    }

    source.data === source.data.filter((item,itemIndex) => itemIndex !== index);
    return {status: 'success', message: `entry at index ${index} was removed`, data: undefined}
  }
  AddRights(sourceName: string, userName: string, right:datasourceRights):databaseReply{
    const source = this.#sources.find(source => source.name === sourceName)
    const permitted = source && source.rights.find(right => right.canAddPermission)

    if (!permitted){
      return {status:'fail', message: 'source or permission not found', data: undefined}
    }

    source.rights.push(right);
    return {status: 'success', message: 'permision added', data: undefined}
  }
}


export default new dataSource();
