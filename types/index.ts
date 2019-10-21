export type Any = string | number | boolean | object | Object | RegExp | Date | Error | null | undefined

export type Obj = {[key: string]: Any, [key: number]: Any}

export enum Cls {
  DATE = '[object Date]',
  REGEXP = '[object RegExp]',
}