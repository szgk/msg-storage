import search from '../dist'

test('[success] searcher is imported', () => {
  expect(typeof search).toBe('function')
})

test('[success] target is not object', () => {
  expect(search(0, 0)).toBeTruthy()
  expect(search(-0, 0)).toBeTruthy()
  expect(search(-0, +0)).toBeTruthy()
  expect(search(1, 1)).toBeTruthy()
  expect(search(1, +1)).toBeTruthy()
  expect(search('', '')).toBeTruthy()
  expect(search(void 0, undefined)).toBeTruthy()

  expect(search(1, 0)).toBeFalsy()
  expect(search('', 'a')).toBeFalsy()
  expect(search(false, 0)).toBeFalsy()
  expect(search(undefined, 0)).toBeFalsy()
  expect(search(void 0, 0)).toBeFalsy()
  expect(search(null, 0)).toBeFalsy()
  expect(search(-1, 0)).toBeFalsy()
  expect(search({}, null)).toBeFalsy()
})

test('[success] target is array', () => {
  expect(search([''], '')).toBeTruthy()
  expect(search(['', 'hoge'], 'hoge')).toBeTruthy()
  expect(search(['', 'hoge', ['fuga']], 'fuga')).toBeTruthy()
  expect(search(['', 'hoge', ['', ['', ['fuga']]]], 'fuga')).toBeTruthy()

  expect(search(['', 'hoge', ['', ['']]], 'fuga')).toBeFalsy()
  expect(search(['', 'hoge', ['', ['',[[[[[[[[[]]]]]]]]]]]], 'fuga')).toBeFalsy()
})

test('[success] target is object', () => {
  expect(search({a: ''}, '')).toBeTruthy()
  expect(search({a: 'aa', b: ''}, '')).toBeTruthy()
  expect(search({a: {b: ''}}, '')).toBeTruthy()
  expect(search({a: {b: {C: ''}}}, '')).toBeTruthy()
  expect(search({a: ''}, 'a')).toBeFalsy()
})

test('[success] target is object and array', () => {
  expect(search({a: 'aa', b: [[[['']]]]}, '')).toBeTruthy()
})
