import ms from '../dist'

test('[success] import  mstorage', () => {
  expect(typeof ms).toBe('object')
  expect(typeof ms.init).toBe('function')
  expect(typeof ms.m).toBe('function')
  expect(() => ms.init({messages: {a: 'hoge'}})).not.toThrow()
})

test('[success] get nested param', () => {
  ms.init({messages: {f: 'moga', a: {h: 'hhh', e: {g: 'fff'}}, b: {i: {j: {k: 'kkk'}}, c: 'fuga'}}})
  expect(ms.m('f')).toBe('moga')
  expect(ms.m('a.h')).toBe('hhh')
  expect(ms.m('b.c')).toBe('fuga')
  expect(ms.m('a.e.g')).toBe('fff')
  expect(ms.m('b.i.j.k')).toBe('kkk')

  expect(ms.m('b')).toBe('b')
})

test('[success] replace variable', () => {
  ms.init({
    messages: {f: 'valieble is {{var}}. name is {{name}}.'}
  })
  expect(ms.m('f')).toBe('valieble is {{var}}. name is {{name}}.')
  expect(ms.m('f', {vv: 'moga', name: 'fuga'})).toBe('valieble is {{var}}. name is fuga.')
  expect(ms.m('f', {var: 'hogehoge'})).toBe('valieble is hogehoge. name is {{name}}.')
  expect(ms.m('f', {var: 'hogehoge', name: 'fuga'})).toBe('valieble is hogehoge. name is fuga.')
})
