import cv from '../dist'

test('[success] init cvalidator', () => {
  expect(typeof cv).toBe('function')
  expect(typeof cv({}).is).toBe('object')
  expect(typeof cv({}).is.obj).toBe('function')
  expect(typeof cv({}).is.array).toBe('function')
  expect(typeof cv({}).is.string).toBe('function')
  expect(typeof cv({}).is.number).toBe('function')
  expect(typeof cv({}).is.nil).toBe('function')
  expect(typeof cv({}).is.undef).toBe('function')
})

test('[success] cvalidator.is.obj', () => {
  let a
  expect(cv({}).is.obj()).toBeTruthy()
  expect(cv(new Date()).is.obj()).toBeTruthy()

  expect(cv([]).is.obj()).toBeFalsy()
  expect(cv(null).is.obj()).toBeFalsy()
  expect(cv('a').is.obj()).toBeFalsy()
  expect(cv(0).is.obj()).toBeFalsy()
  expect(cv(1).is.obj()).toBeFalsy()
  expect(cv(a).is.undef()).toBeTruthy()
  expect(cv().is.obj()).toBeFalsy()
  expect(cv(true).is.obj()).toBeFalsy()
  expect(cv(false).is.obj()).toBeFalsy()
})

test('[success] cvalidator.is.array', () => {
  let a
  expect(cv([]).is.array()).toBeTruthy()

  expect(cv({}).is.array()).toBeFalsy()
  expect(cv(null).is.array()).toBeFalsy()
  expect(cv('a').is.array()).toBeFalsy()
  expect(cv(0).is.array()).toBeFalsy()
  expect(cv(1).is.array()).toBeFalsy()
  expect(cv(a).is.undef()).toBeTruthy()
  expect(cv().is.array()).toBeFalsy()
  expect(cv(true).is.array()).toBeFalsy()
  expect(cv(false).is.array()).toBeFalsy()
  expect(cv(new Date()).is.array()).toBeFalsy()
})

test('[success] cvalidator.is.string', () => {
  let a
  expect(cv('').is.string()).toBeTruthy()
  expect(cv('a').is.string()).toBeTruthy()

  expect(cv(0).is.string()).toBeFalsy()
  expect(cv(1).is.string()).toBeFalsy()
  expect(cv([]).is.string()).toBeFalsy()
  expect(cv({}).is.string()).toBeFalsy()
  expect(cv(null).is.string()).toBeFalsy()
  expect(cv().is.string()).toBeFalsy()
  expect(cv(a).is.string()).toBeFalsy()
  expect(cv(true).is.string()).toBeFalsy()
  expect(cv(false).is.string()).toBeFalsy()
  expect(cv(new Date()).is.string()).toBeFalsy()
})

test('[success] cvalidator.is.number', () => {
  let a
  expect(cv(0).is.number()).toBeTruthy()
  expect(cv(1).is.number()).toBeTruthy()

  expect(cv(a).is.number()).toBeFalsy()
  expect(cv('').is.number()).toBeFalsy()
  expect(cv('a').is.number()).toBeFalsy()
  expect(cv([]).is.number()).toBeFalsy()
  expect(cv({}).is.number()).toBeFalsy()
  expect(cv(null).is.number()).toBeFalsy()
  expect(cv().is.number()).toBeFalsy()
  expect(cv(true).is.number()).toBeFalsy()
  expect(cv(false).is.number()).toBeFalsy()
  expect(cv(new Date()).is.number()).toBeFalsy()
})

test('[success] cvalidator.is.nil', () => {
  let a
  expect(cv(null).is.nil()).toBeTruthy()

  expect(cv(a).is.nil()).toBeFalsy()
  expect(cv().is.nil()).toBeFalsy()
  expect(cv(a).is.nil()).toBeFalsy()
  expect(cv('').is.nil()).toBeFalsy()
  expect(cv('a').is.nil()).toBeFalsy()
  expect(cv([]).is.nil()).toBeFalsy()
  expect(cv({}).is.nil()).toBeFalsy()
  expect(cv(true).is.nil()).toBeFalsy()
  expect(cv(false).is.nil()).toBeFalsy()
  expect(cv(new Date()).is.nil()).toBeFalsy()
})

test('[success] cvalidator.is.undef', () => {
  let a
  expect(cv().is.undef()).toBeTruthy()
  expect(cv(a).is.undef()).toBeTruthy()

  expect(cv('').is.undef()).toBeFalsy()
  expect(cv('a').is.undef()).toBeFalsy()
  expect(cv([]).is.undef()).toBeFalsy()
  expect(cv({}).is.undef()).toBeFalsy()
  expect(cv(null).is.undef()).toBeFalsy()
  expect(cv(true).is.undef()).toBeFalsy()
  expect(cv(false).is.undef()).toBeFalsy()
  expect(cv(new Date()).is.undef()).toBeFalsy()
})

test('[success] cvalidator.is.date', () => {
  let a
  expect(cv(new Date()).is.date()).toBeTruthy()
  
  expect(cv('').is.date()).toBeFalsy()
  expect(cv('a').is.date()).toBeFalsy()
  expect(cv([]).is.date()).toBeFalsy()
  expect(cv({}).is.date()).toBeFalsy()
  expect(cv().is.date()).toBeFalsy()
  expect(cv(a).is.date()).toBeFalsy()
  expect(cv(null).is.date()).toBeFalsy()
  expect(cv(true).is.date()).toBeFalsy()
  expect(cv(false).is.date()).toBeFalsy()
})

test('[success] cvalidator.is.regex', () => {
  let a
  expect(cv(/a/).is.regex()).toBeTruthy()

  expect(cv(new Date()).is.regex()).toBeFalsy()
  expect(cv('').is.regex()).toBeFalsy()
  expect(cv('a').is.regex()).toBeFalsy()
  expect(cv([]).is.regex()).toBeFalsy()
  expect(cv({}).is.regex()).toBeFalsy()
  expect(cv().is.regex()).toBeFalsy()
  expect(cv(a).is.regex()).toBeFalsy()
  expect(cv(null).is.regex()).toBeFalsy()
  expect(cv(true).is.regex()).toBeFalsy()
  expect(cv(false).is.regex()).toBeFalsy()
})

test('[success] cvalidator.is.err', () => {
  let err = new Error()
  expect(cv(err).is.err()).toBeTruthy()
  expect(cv({}).is.err()).toBeFalsy()
})

test('[success] cvalidator.is.same', () => {
  let a
  let date = new Date()
  expect(cv().is.same()).toBeTruthy()
  expect(cv().is.same(a)).toBeTruthy()
  expect(cv(a).is.same(a)).toBeTruthy()
  expect(cv(a).is.same()).toBeTruthy()
  expect(cv(date).is.same(date)).toBeTruthy()
  expect(cv('').is.same('')).toBeTruthy()
  expect(cv('a').is.same('a')).toBeTruthy()
  expect(cv(null).is.same(null)).toBeTruthy()
  expect(cv(undefined).is.same(undefined)).toBeTruthy()
  expect(cv(void 0).is.same(undefined)).toBeTruthy()

  expect(cv(new Date()).is.same(new Date())).toBeFalsy()
  expect(cv(0).is.same(false)).toBeFalsy()
  expect(cv(0).is.same(undefined)).toBeFalsy()
  expect(cv(0).is.same(null)).toBeFalsy()
  expect(cv(0).is.same(-1)).toBeFalsy()
  expect(cv(false).is.same(0)).toBeFalsy()
  expect(cv(false).is.same('')).toBeFalsy()
  expect(cv(false).is.same([])).toBeFalsy()
  expect(cv(false).is.same({})).toBeFalsy()
  expect(cv(true).is.same(1)).toBeFalsy()
  expect(cv(true).is.same('1')).toBeFalsy()
  expect(cv(true).is.same({})).toBeFalsy()
  expect(cv(undefined).is.same(null)).toBeFalsy()
  expect(cv('a').is.same('')).toBeFalsy()
  expect(cv(/a/).is.same(/a/)).toBeFalsy()
  expect(cv({}).is.same({})).toBeFalsy()
  expect(cv([]).is.same([])).toBeFalsy()
})

test('[success] cvalidator.is.sameError', () => {
  let err = new Error()
  let err2 = new Error('hoge')

  expect(cv(err).is.sameError(err)).toBeTruthy()
  expect(cv(err2).is.sameError(err2)).toBeTruthy()

  expect(cv(err).is.sameError({})).toBeFalsy()
  expect(cv(err).is.sameError(err2)).toBeFalsy()
})

test('[success] cvalidator.is.equalObj', () => {
  expect(cv({}).is.equalObj({})).toBeTruthy()
  expect(cv([]).is.equalObj([])).toBeTruthy()
  expect(cv({a:''}).is.equalObj({a:''})).toBeTruthy()

  expect(cv({a:'a'}).is.equalObj({})).toBeFalsy()
  expect(cv([1]).is.equalObj([])).toBeFalsy()
})

test('[success] cvalidator.is.equal', () => {
  let a
  let date = new Date()

  expect(cv(date).is.equal(date)).toBeTruthy()
  expect(cv({}).is.equal({})).toBeTruthy()
  expect(cv({}).is.equal({a: undefined})).toBeTruthy()
  expect(cv([]).is.equal([])).toBeTruthy()
  expect(cv([[a]]).is.equal([[a]])).toBeTruthy()
  
  expect(cv({a:[]}).is.equal({})).toBeFalsy()
  expect(cv([]).is.equal([1])).toBeFalsy()
  expect(cv({}).is.equal({a: ''})).toBeFalsy()
})

test('[success] cvalidator.is.has', () => {
  expect(cv({a: 'aa'}).has('aa')).toBeTruthy()
  expect(cv({a: {b: {c: 'aa'}}}).has('aa')).toBeTruthy()
  expect(cv(['aa']).has('aa')).toBeTruthy()
  expect(cv([[[[[[['aa']]]]]]]).has('aa')).toBeTruthy()
  expect(cv('').has('')).toBeTruthy()
  expect(cv(0).has(0)).toBeTruthy()
  
  expect(cv({a: 'aa'}).has('a')).toBeFalsy()
  expect(cv(['']).has('aa')).toBeFalsy()
  expect(cv({}).has()).toBeFalsy()
  expect(cv('a').has('')).toBeFalsy()
})

test('[success] cvalidator.is.has', () => {
  expect(cv([]).is.not.obj()).toBeTruthy()
  expect(cv({}).is.not.array()).toBeTruthy()
  expect(cv(1).is.not.string()).toBeTruthy()
  expect(cv('').is.not.number()).toBeTruthy()
  expect(cv(false).is.not.nil()).toBeTruthy()
  expect(cv(false).is.not.undef()).toBeTruthy()
  expect(cv({}).is.not.date()).toBeTruthy()
  expect(cv({}).is.not.regex()).toBeTruthy()
  expect(cv({}).is.not.err()).toBeTruthy()
  expect(cv({}).is.not.same({})).toBeTruthy()
  expect(cv(new Error()).is.not.sameError(new Error('hoge'))).toBeTruthy()
  expect(cv({}).is.not.equalObj({a: ''})).toBeTruthy()
  expect(cv({}).is.not.equal({a: ''})).toBeTruthy()
})
