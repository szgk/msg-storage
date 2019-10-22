import rs from '../dist'

test('[success] searcher is imported', () => {
  expect(typeof rs.search).toBe('function')
  expect(typeof rs.every).toBe('function')
})

test('[success] target is not object', () => {
  expect(rs.search(0, 0)).toBeTruthy()
  expect(rs.search(-0, 0)).toBeTruthy()
  expect(rs.search(-0, +0)).toBeTruthy()
  expect(rs.search(1, 1)).toBeTruthy()
  expect(rs.search(1, +1)).toBeTruthy()
  expect(rs.search('', '')).toBeTruthy()
  expect(rs.search(void 0, undefined)).toBeTruthy()

  expect(rs.search(1, 0)).toBeFalsy()
  expect(rs.search('', 'a')).toBeFalsy()
  expect(rs.search(false, 0)).toBeFalsy()
  expect(rs.search(undefined, 0)).toBeFalsy()
  expect(rs.search(void 0, 0)).toBeFalsy()
  expect(rs.search(null, 0)).toBeFalsy()
  expect(rs.search(-1, 0)).toBeFalsy()
  expect(rs.search({}, null)).toBeFalsy()
})

test('[success] target is array', () => {
  expect(rs.search([''], '')).toBeTruthy()
  expect(rs.search(['', 'hoge'], 'hoge')).toBeTruthy()
  expect(rs.search(['', 'hoge', ['fuga']], 'fuga')).toBeTruthy()
  expect(rs.search(['', 'hoge', ['', ['', ['fuga']]]], 'fuga')).toBeTruthy()

  expect(rs.search(['', 'hoge', ['', ['']]], 'fuga')).toBeFalsy()
  expect(rs.search(['', 'hoge', ['', ['',[[[[[[[[[]]]]]]]]]]]], 'fuga')).toBeFalsy()
})

test('[success] target is object', () => {
  expect(rs.search({a: ''}, '')).toBeTruthy()
  expect(rs.search({a: 'aa', b: ''}, '')).toBeTruthy()
  expect(rs.search({a: {b: ''}}, '')).toBeTruthy()
  expect(rs.search({a: {b: {C: ''}}}, '')).toBeTruthy()
  expect(rs.search({a: ''}, 'a')).toBeFalsy()
})

test('[success] target is object and array', () => {
  expect(rs.search({a: 'aa', b: [[[['']]]]}, '')).toBeTruthy()
})

test('[success] target is object and array', () => {
  expect(rs.search({a: 'aa', b: [[[['']]]]}, '')).toBeTruthy()
})

test('[success] every string', () => {
  const validator = param => typeof param === 'string'
  expect(rs.every({a: 'aa', b: [[[['']]]]}, validator)).toBeTruthy()
  expect(rs.every({a: 'aa', b: [[[[{a: 'hoge'}]]]]}, validator)).toBeTruthy()

  expect(rs.every({a: 'aa', b: [[[[{a: 0}]]]]}, validator)).toBeFalsy()
  expect(rs.every({a: 'aa', b: [[[['', false]]]]},validator)).toBeFalsy()
  expect(rs.every(null, validator)).toBeFalsy()
})
