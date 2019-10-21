import {Any, Obj} from '../../../types'

class RecursiveSearcher {
  private isObj = (target: Any): boolean => typeof target === 'object'

  private objToStr = (target: Any) => this.isObj(target)
    ? JSON.stringify(target)
    : target

  public searchObj = (target: Obj, param: Any): boolean => {
    let res = false
    for(let prm in target) {
      res = target[prm] === param
      if(res) break

      res = this.search(target[prm], param)
    }
    return res
  }

  public searchArray = (target: Array<Any>, param: Any) => {
    let res = false
    let len = target.length
    while(len--) {
      res = this.search(target[len], param)
      if(res) break
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
    } else if(target && this.isObj(target)) {
      res = this.searchObj((target as Obj), param)
    }
    return res
  }
}

export default new RecursiveSearcher().search
