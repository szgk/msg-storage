declare module 'method-chain-validator' {
  import {Any} from './index.ts'
  import MethodChainValidator from '../packages/method-chain-validator/src/MethodChainValidator'
  interface Methods {
    obj: () => boolean,
    array: () => boolean,
    string: () => boolean,
    number: () => boolean,
    nil: () => boolean,
    undef: () => boolean,
    date: () => boolean,
    regex: () => boolean,
    err: () => boolean,
    same: (param: Any) => boolean,
    sameError: (param: Any) => boolean,
    equalObj: (param: Any) => boolean,
    equal: (param: Any) => boolean,
  }

  export default (param: Any) => ({
    is: {
      not: {
        obj: (): boolean => {},
        array: (): boolean => {},
        string: (): boolean => {},
        number: (): boolean => {},
        nil: (): boolean => {},
        undef: (): boolean => {},
        date: (): boolean => {},
        regex: (): boolean => {},
        err: (): boolean => {},
        same: (param: Any): boolean => {},
        sameError: (param: Any): boolean => {},
        equalObj: (param: Any): boolean => {},
        equal: (param: Any): boolean => {},
      },
      obj: (): boolean => {},
      array: (): boolean => {},
      string: (): boolean => {},
      number: (): boolean => {},
      nil: (): boolean => {},
      undef: (): boolean => {},
      date: (): boolean => {},
      regex: (): boolean => {},
      err: (): boolean => {},
      same: (param: Any): boolean => {},
      sameError: (param: Any): boolean => {},
      equalObj: (param: Any): boolean => {},
      equal: (param: Any): boolean => {},
    },
    has: (param: Any): boolean => {},
    hasOnlyString: (): boolean => {},
    hasOnlyNumber: (): boolean => {},
    hasOnlyNil: (): boolean => {},
    hasOnlyUndef: (): boolean => {},
  })
}