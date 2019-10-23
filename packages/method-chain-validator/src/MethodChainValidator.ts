import {Any, Cls} from '../../../types'
import rs from 'recursive-searcher'

export class MethodChainValidator {
  private param: Any | undefined = undefined

  private getClass = (param: Any): string => Object.prototype.toString.call(param)
  private castRegeExp = (param: Any): RegExp => (param as RegExp)

  private array = (param: Any): boolean => Array.isArray(param)
  private obj = (param: Any): boolean => !!param && !this.array(param) && typeof param === 'object'
  private string = (param: Any): boolean => typeof param === 'string'
  private number = (param: Any): boolean => typeof param === 'number'
  private nil = (param: Any): boolean => !param && !this.array(param) && typeof param === 'object'
  private undef = (param: Any): boolean => typeof param === 'undefined'
  private date = (param: Any): boolean => this.getClass(param) === Cls.DATE
  private regex = (param: Any): boolean => this.getClass(param) === Cls.REGEXP
  private err = (param: Any): boolean => this.param instanceof Error && param instanceof Error
  private same = (param: Any): boolean => Object.is(this.param, param)
  private sameError = (param: Any): boolean =>
    !!param
    && !!this.param
    && this.err(this.param)
    && this.err(param)
    && (this.param as Error).message === (param as Error).message
  private equalObj = (param: Any): boolean => JSON.stringify(this.param) === JSON.stringify(param)
  private equal = (param: Any): boolean => this.equalObj(param) || this.sameError(param)

  private not = {
    obj:  () => !this.obj(this.param),
    array: () => !this.array(this.param),
    string: () => !this.string(this.param),
    number: () => !this.number(this.param),
    nil:  () => !this.nil(this.param),
    undef: () => !this.undef(this.param),
    date: () => !this.date(this.param),
    regex: () => !this.regex(this.param),
    err: () => !this.err(this.param),
    same: (param: Any): boolean => !this.same(param),
    sameError: (param: Any): boolean => !this.sameError(param),
    equalObj: (param: Any): boolean => !this.equalObj(param),
    equal: (param: Any): boolean => !this.equal(param),
  }

  public validator = (param: object): MethodChainValidator => {
    this.param = param
    return this
  }

  public is = {
    not: this.not,
    obj: (): boolean => this.obj(this.param),
    array: (): boolean => this.array(this.param),
    string: (): boolean => this.string(this.param),
    number: (): boolean => this.number(this.param),
    nil: (): boolean => this.nil(this.param),
    undef: (): boolean => this.undef(this.param),
    date: (): boolean => this.date(this.param),
    regex: (): boolean => this.regex(this.param),
    err: (): boolean => this.err(this.param),
    same: (param: Any): boolean => this.same(param),
    sameError: (param: Any): boolean => this.sameError(param),
    equalObj: (param: Any): boolean => this.equalObj(param),
    equal: (param: Any): boolean => this.equal(param),
  }

  private some = (param: Any): boolean => {
    if(this.equal(param)) return true
    return rs.search(this.param, param)
  }
  private onlyString = (): boolean => rs.every(this.param, (param: Any) => this.string(param))
  private onlyNumber = (): boolean => rs.every(this.param, (param: Any) => this.number(param))
  private onlyNil = (): boolean => rs.every(this.param, (param: Any) => this.nil(param))
  private onlyUndef = (): boolean => rs.every(this.param, (param: Any) => this.undef(param))

  private only = {
    string: () => this.onlyString(),
    number: () => this.onlyNumber(),
    nil: () => this.onlyNil(),
    undef: () => this.onlyUndef(),
  }

  public has = {
    some: (param: Any) => this.some(param),
    only: this.only,
  }

}

export default new MethodChainValidator().validator
