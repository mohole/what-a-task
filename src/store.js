'use strict';

class InternalStore {
  constructor(){
    this.data = {}
  }

  get(){
    return this.data;
  }

  set(newData){
    this.data = Object.assign({}, this.data, newData);
    return this.data;
  }
}

export const Store = new InternalStore();