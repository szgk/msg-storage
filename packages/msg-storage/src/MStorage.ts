import mcv from 'method-chain-validator'
import {Any, Messages} from '../../../types'

class MStorage {
  private storage: MStorage | null = null
  private messages: Messages = {}

  constructor(
    {messages}: {messages?: Messages}) {
    this.messages = messages || {}
  }

  private search = (messages: Messages, path: string[]): string | undefined => {
    let res = undefined
    let len = path.length
    while(len--) {
      const value: Messages | string = messages[path[len]]
      if(mcv(value).is.string()) {
        res = (value as string)
        break
      }
      if(mcv(value).is.obj()) {
        res = this.search((value as Messages), path)
      }
    }
    return res
  }

  private applyOption = (str: string, options: {[key: string]: string}) => {
    let res = str
    for(let key in options) {
      res = res.replace(`\{\{${key}\}\}`, options[key])
    }
    return res
  }

  public init = ({messages}: {messages: Messages}) => {
    if(mcv(messages).hasOnlyString()) {
      this.storage = new MStorage({messages})
    } else {
      throw new Error('invalid options: message')
    }
  }

  public m = (param: string, options?: {[key: string]: string}) => {
    if(mcv(this.storage).is.nil()) {
      throw new Error('not init')
    }
    const messages = (this.storage as MStorage).messages
    const path = param.split('.')
    let res = this.search(messages, path)
    return  res ? options ? this.applyOption(res, options) : res : param
  }

}

export default new MStorage({})
