declare module 'recursive-searcher' {
  import {Any} from './index.ts'
  let search: (target: Any, param: Any) => boolean
  let every: (target: Any, validator: (param: Any) => boolean) => boolean
}