type fieldRight = String | number | symbol;

class dataSourceRights {
  #userName: string;
  #canView: boolean = false;
  #fieldRights: fieldRight[] = [];
  #canAddEntries: boolean = false;
  #canDeleteEntries: boolean = false;
  #canAddPermission: boolean = false
  constructor(userName){
    this.#userName = userName;
  }
  get userName(){ return this.#userName }
  get canView(){ return this.#canView}
  get fieldEditRights(){return this.#fieldRights}
  get canAddEntry(){return this.#canAddEntries}
  get canDeleteEntry(){return this.#canDeleteEntries}
  get canAddPermission(){return this.#canAddPermission}
  giveViewRight(){
    this.#canView = true;
    return this;
  }
  giveEditFieldRight(fieldName){
    this.#fieldRights.push(fieldName);
    return this;
  }
  giveAddEntryRight(){
    this.#canAddEntries = true;
    return this;
  }
  giveDeleteEntryRight(){
    this.#canDeleteEntries = true;
    return this;
  }
  GiveAddPermissionRight(){
    this.#canAddPermission;
    return this;
  }
}

export default dataSourceRights;