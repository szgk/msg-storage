export type Any = string | number | boolean | object | Function | Object | RegExp | Date | Error | null | undefined

export type Obj = {[key: string]: Any, [key: number]: Any}

export enum Cls {
  DATE = '[object Date]',
  REGEXP = '[object RegExp]',
}

export interface Messages {
  [key: string]: string | Messages;
  [key: number]: string | Messages;
}
