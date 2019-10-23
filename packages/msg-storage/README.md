# msg storage

messasge storage

## Usage

```
npm install -D msg-storage

import ms from 'msg-storage'

ms.init({
  messages: {
    greet: {
      hello: 'hello {{name}}.'
    }
  }
})

ms.m('greet.hello', {name: 'Jhon'}) // hello Jhon.
```
