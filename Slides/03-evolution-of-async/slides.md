---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# Async Control Flow

---

By the end of this section, you should be able to:
- Understand native asynchronous primitives.
- Understand serial and parallel control flow with callbacks.
- Understand serial and parallel control flow with promises.
- Understand serial and parallel control flow with async/await.

---

# Callbacks

A function that is called at some future point, once a task has been completed.

```js
const {readFile} = require('fs')

readfile(__filename, (err, contents) => {
  if(err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
})
```

---

# Callbacks - Parallel Execution

A program with three variables, `smallFile`, `mediumFil` and `bigFile`.

```js
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}
readFile(bigFile, print)
readFile(mediumFile, print)
readFile(smallFile, print)
```

<p v-click>Small file will be printed first, even though bigFile was called first.</p>
<p v-click="2">This is a way to achieve parallel execution in Node.</p>

---

# Callbacks - Serial Execution

```js
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)
const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}
readFile(bigFile, (err, contents) => {
  print(err, contents)
  readFile(mediumFile, (err, contents) => {
    print(err, contents)
    readFile(smallFile, print)
  })
})
```

<p v-click>Serial execution is achieved by waiting for the callback before starting the next async operation.</p>

---
layout: two-cols
---

## What if we want all of the contents of each file to be concatenated?

::right::

```js {all|21|all}
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)
const data = []
const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}

readFile(bigFile, (err, contents) => {
  if (err) print(err)
  else data.push(contents)
  readFile(mediumFile, (err, contents) => {
    if (err) print(err)
    else data.push(contents)
    readFile(smallFile, (err, contents) => {
      if (err) print(err)
      else data.push(contents)
      print(null, Buffer.concat(data))
    })
  })
})
```

---
layout: two-cols
---
# What about an unknown amount of async operations?


<p v-click="6">Using a self-recursive function with the two extra variables allows us to handle a list of any size.</p>

::right::

```js {all|13|14|25|15-23|all}
const { readFile } = require('fs')
const files = Array.from(Array(3)).fill(__filename)
const data = []

const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}

let count = files.length
let index = 0
const read = (file) => {
  readFile(file, (err, contents) => {
    index += 1
    if (err) print(err)
    else data.push(contents)
    if (index < count) read(files[index])
    else print(null, Buffer.concat(data))
  })
}

read(files[index])
```


---
layout: two-cols
---
# fastseries

<p>Callback-based serial execution can become quite complicated, quite quickly.</p>
<p>Using a small library to help with complexity is advised.</p>

::right::

```js {all|13-20|14|16|17|22|all}
const { readFile } = require('fs')
const series = require('fastseries')()
const files = Array.from(Array(3)).fill(__filename)

const print = (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(Buffer.concat(data).toString())
}

const readers = files.map((file) => {
  return (_, cb) => {
    readFile(file, (err, contents) => {
      if (err) cb(err)
      else cb(null, contents)
    })
  }
})

series(null, readers, null, print)
```

---
layout: two-cols
---

# Promises

<p>A promise represents an async operation that is either pending or settled.</p>
<p>If it's settled, it's either resolved or rejected.</p>

::right::
With a callback:

```js
function myAsyncOperation (cb) {
  doSomethingAsynchronous((err, value) => { 
    cb(err, value) 
  })
}

myAsyncOperation(functionThatHandlesTheResult)
```

With a Promise:

```js
function myAsyncOperation () {
  return new Promise((resolve, reject) => {
    doSomethingAsynchronous((err, value) => {
      if (err) reject(err)
      else resolve(value)
    })
  })
}
```

---

# The `promisify` function

```js
const { promisify } = require('util')
const doSomething = promisify(doSomethingAsynchronous)

function myAsyncOperation () {
  return doSomething()
}

const promise = myAsyncOperation()
                  .then(value => console.log(value))
                  .catch(err => console.log(err))
```

---
layout: two-cols
---
# A more concrete example


```js
const { promisify } = require('util')
const { readFile } = require('fs')

const readFileProm = promisify(readFile)

const promise = readFileProm(__filename)

promise.then((contents) => {
  console.log(contents.toString())
})

promise.catch((err) => {
  console.error(err)
})
```

::right::

<div v-click>

```js
const { readFile } = require('fs').promises

readFile(__filename)
  .then((contents) => {
    console.log(contents.toString())
  })
  .catch(console.error)
```
</div>

---

# Series operation

```js {all|10|14|16|all}
const { readFile } = require('fs').promises
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (contents) => {
  console.log(contents.toString())
}
readFile(bigFile)
  .then((contents) => {
    print(contents)
    return readFile(mediumFile)
  })
  .then((contents) => {
    print(contents)
    return readFile(smallFile)
  })
  .then(print)
  .catch(console.error)
```

---
layout:two-cols
---
# Unknown number of files

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const data = []
const print = (contents) => {
  console.log(contents.toString())
}
let count = files.length
let index = 0
const read = (file) => {
  return readFile(file).then((contents) => {
    index += 1
    data.push(contents)
    if (index < count) return read(files[index])
    return data
  })
}

read(files[index])
  .then((data) => {
    print(Buffer.concat(data))
  })
  .catch(console.error)
``` 
---

# Promise.all()

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const print = (data) => {
  console.log(Buffer.concat(data).toString())
}

const readers = files.map((file) => readFile(file))

Promise.all(readers)
  .then(print)
  .catch(console.error)
```

<p>Slight problem here is that if one of the Promises fails, it all fails.</p>

---

# Promise.allSettled()

```js {all|15-19|5-7|8-10|11-12|all}
const { readFile } = require('fs').promises
const files = [filename, 'not a file', filename]

const print = (results) => {
  results
    .filter(({status}) => status = 'rejected')
    .forEach(({reason}) => console.error(reason))
  const data = results
    .filter(({status}) => status = 'fulfilled')
    .map(({value}) => value)
  const contents = Buffer.concat(data)
  console.log(contents.toString())
}

const readers = files.map((file) => readFile(file))

Promise.allSettled(readers)
  .then(print)
  .catch(console.error)
```

---

# Promises in Parallel

Either use `allSettled` or give each their own then/catch handlers.

```js
const { readFile } = require('fs').promises
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (contents) => {
  console.log(contents.toString())
}

readFile(bigFile).then(print).catch(console.error)
readFile(mediumFile).then(print).catch(console.error)
readFile(smallFile).then(print).catch(console.error)
```

---

# Async/Await

- Stylistically similar to sync code.

```js
const { readFile } = require('fs').promises

async function run () {
  const contents = await readFile(__filename)
  console.log(contents.toString())
}

run().catch(console.error)
```

---

# Series in async/await

```js
const { readFile } = require('fs').promises

const print = (contents) => {
  console.log(contents.toString())
}
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

async function run () {
  print(await readFile(bigFile))
  print(await readFile(mediumFile))
  print(await readFile(smallFile))
}

run().catch(console.error)
```

---

# Concatenate

```js
const { readFile } = require('fs').promises
const print = (contents) => {
  console.log(contents.toString())
}
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

async function run () {
  const data = [
    await readFile(bigFile),
    await readFile(mediumFile),
    await readFile(smallFile)
  ]
  print(Buffer.concat(data))
}

run().catch(console.error)
```

---

# Unknown length?

```js
const { readFile } = require('fs').promises

const print = (contents) => {
  console.log(contents.toString())
}

const files = Array.from(Array(3)).fill(__filename)

async function run () {
  const data = []
  for (const file of files) {
    data.push(await readFile(file))
  }
  print(Buffer.concat(data))
}

run().catch(console.error)
```

<p>This is the right approach where the operations must be sequentially called.</p>

---

# Output order matters, Execution order doesn't

```js
const { readFile } = require('fs').promises
const files = Array.from(Array(3)).fill(__filename)
const print = (contents) => {
  console.log(contents.toString())
}

async function run () {
  const readers = files.map((file) => readFile(file))
  const data = await Promise.all(readers)
  print(Buffer.concat(data))
}

run().catch(console.error)
```

<p>Parallel execution with sequentially ordered output.</p>
Same problem with the Promise.all() as before

---

# Use allSettled()

```js
const { readFile } = require('fs').promises
const files = [filename, 'foo', filename]
const print = (contents) => {
  console.log(contents.toString())
}

async function run () {
  const readers = files.map((file) => readFile(file))
  const results = await Promise.allSettled(readers)

  results
    .filter(({status}) => status === 'rejected')
    .forEach(({reason}) => console.error(reason))

  const data = results
    .filter(({status}) => status === 'fulfilled')
    .map(({value}) => value)

  print(Buffer.concat(data))
}

run().catch(console.error)
```

---

# Exercises

1. In the labs folder, there is a file `parallel.js`. 
The functions must be called in the order `opA`, `opB` and `opC`.

Call them in such a way so that `C` then `B` then `A` is printed out.

2. In the labs folder, there is a file `serial.js`.
Call the functions in such a way such that `A` then `B` then `C` is printed out.

3. In `lab.js` use the `api.fetch()` function to complete the two exercises. How many different ways can you do it in? Explore some parallel and series approaches.