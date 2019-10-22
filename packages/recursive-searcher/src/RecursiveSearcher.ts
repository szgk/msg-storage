import {Any, Obj} from '../../../types'

class RecursiveSearcher {
  private isObj = (target: Any): boolean => !!target && typeof target === 'object'

  private objToStr = (target: Any) => this.isObj(target)
    ? JSON.stringify(target)
    : target

  private execValidate(target: Any, param: Any, validator: (param: Any) => boolean): boolean {
    let res = false

    if(Array.isArray(target)) {
      res = this.searchArray(target, param, validator)
    } else if(this.isObj(target)) {
      res = this.searchObj((target as Obj), param, validator)
    } else {
      return validator(target)
    }

    return res
  }

  private searchObj = (target: Obj, param: Any, validator?: (param: Any) => boolean): boolean => {
    let res = false
    for(let prm in target) {

      if(validator) {
        res = this.execValidate(target[prm], param, validator)
        if(!res) break
      } else {
        res = target[prm] === param
        if(res) break
      }

      if(validator) {
        res = this.every(target[prm], validator)
      } else {
        res = this.search(target[prm], param)
      }
    }
    return res
  }

  private searchArray = (target: Array<Any>, param: Any, validator?: (param: Any) => boolean) => {
    let res = false
    let len = target.length
    while(len--) {
      if(validator) {
        res = this.execValidate(target[len], param, validator)
        if(!res) break
      } else {
        res = this.search(target[len], param)
        if(res) break
      }
    }
    return res
  }

  // TODO: In the case param is Symbol
  public search = (target: Any, param: Any): boolean => {
    let res = false

    if(target === param) {
      return true
    } else if(Array.isArray(target)) {
      res = this.searchArray(target, param)
    } else if(this.isObj(target)) {
      res = this.searchObj((target as Obj), param)
    }

    return res
  }

  public every = (target: Any, validator: (param: Any) => boolean): boolean => {
    let res = false

    if(Array.isArray(target)) {
      res = this.searchArray(target, null, validator)
    } else if(this.isObj(target)) {
      res = this.searchObj((target as Obj), null, validator)
    } else {
      if(validator(target)) {
        return true
      }
    }

    return res
  }
}

export default new RecursiveSearcher()
