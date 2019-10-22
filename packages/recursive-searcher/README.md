# recursive searcher

recursive searcher

## Usage

```
npm install -D recursive-searcher

import rs from 'recursive-searcher'

rs.search({a: 1}, 1) // return true

rs.every({a: 'hoge', b: {c: 'fuga'}}, param => typeof param === 'string') // return true
```

## Method
- search(target, param)
  - target
    - searched target
  - param
    - search parameter
- every(target, validation)
  - target
    - searched target
  - validation
    - function for every paramater