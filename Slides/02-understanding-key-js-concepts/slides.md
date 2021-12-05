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

# Understand key JavaScript concepts

---

# Aims
  - Arrow functions
	- Events and Callbacks
	- Describe the prototypical nature of all JavaScript-based inheritance
	- Explain the role of closure scope in state management

---

# Functions
- Multi-paradigm nature of JS
- Functions passed as arguments 
- Functions assigned as values in an object
- (Fat) Arrow Functions

---
layout: two-cols
---

# Creating an Event Emitter
<p></p>

The events module exports an EventEmitter constructor:

```js
const {EventEmitter} = require('events')
```

and, now the `events` module is the constructor as well:

```js
const EventEmitter = require('events')
```

So to create a new event emitter:

```js
const myEmitter = new EventEmitter()
```

::right::
<div v-click>
A more typical pattern is to inherit from the EventEmitter.

```js
class MyEmitter extends EventEmitter {
  constructor (opts = {}) {
    super(opts)
    this.name = opts.name
  }
}
```
</div>

---

# Emitting Events

```js {all|1|2|3|all}
const { EventEmitter } = require('events')
const myEmitter = new EventEmitter()
myEmitter.emit('an-event', some, args)
```
---

# An example of using emit with inheriting from EventEmitter:

```js {all|7-10|8|9|all}
const { EventEmitter } = require('events')
class MyEmitter extends EventEmitter {
  constructor (opts = {}) {
    super(opts)
    this.name = opts.name
  },
  destroy (err) {
    if (err) { this.emit('error', err) }
    this.emit('close')
  }
}
```

---

# Listening for Events

To add a listener, use the addListener method.

```js {all|4}
const { EventEmitter } = require('events')

const ee = new EventEmitter()
ee.on('close', () => { console.log('close event fired!') })
ee.emit('close')
```

<p v-click="2">It could also be written as:</p>
<div v-click="2">

```js
ee.addListener('close', () => {
  console.log(close event fired!')
})
```
</div>

<p v-click="3">Arguments passed to emit are received by the listener function.</p>

<div v-click="3">

```js
ee.on('add', (a, b) => { console.log(a + b) }) // logs 13
ee.emit('add', 7, 6)
```
</div>

---

# Order is important

This listener will not fire:

```js
ee.emit('close')
ee.on('close', () => { console.log('close event fired!') })
```

<div v-click>
Listeners are called in the order they are registered:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('1st') })
ee.on('my-event', () => { console.log('2nd') })
ee.emit('my-event')
```
</div>

<div v-click="2">
But the <code>prependListener</code> method can be used to inject listeners to the top position:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('2nd') })
ee.prependListener('my-event', () => { console.log('1st') })
ee.emit('my-event')
```
</div>

---

# Single or Multi-use

An event can be used more than once:

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.on('my-event', () => { console.log('my-event fired') })
ee.emit('my-event')
ee.emit('my-event')
ee.emit('my-event')
```

<div v-click>
The once method will immediately remove its listener after it has been called.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()
ee.once('my-event', () => { console.log('my-event fired') })
ee.emit('my-event')
ee.emit('my-event')
ee.emit('my-event')
```
</div>

---

# Removing Listeners

The removeListener method can be used to remove a previously registered listener.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

const listener1 = () => { console.log('listener 1') }
const listener2 = () => { console.log('listener 2') }

ee.on('my-event', listener1)
ee.on('my-event', listener2)

setInterval(() => {
  ee.emit('my-event')
}, 200)

setTimeout(() => {
  ee.removeListener('my-event', listener1)
}, 500)

setTimeout(() => {
  ee.removeListener('my-event', listener2)
}, 1100)
```

---

# Remove all listeners
The removeAllListeners method can be used to remove listeners without having a reference to the function.

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

const listener1 = () => { console.log('listener 1') }
const listener2 = () => { console.log('listener 2') }

ee.on('my-event', listener1)
ee.on('my-event', listener2)
ee.on('another-event', () => { console.log('another event') })

setInterval(() => {
  ee.emit('my-event')
  ee.emit('another-event')
}, 200)

setTimeout(() => {
  ee.removeAllListeners('my-event')
}, 500)

setTimeout(() => {
  ee.removeAllListeners()
}, 1100)
```

---

# The Error Event

What will happen here?

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

process.stdin.resume() // keep process alive

ee.emit('error', new Error('oh oh'))
```

<div v-click>
Emitting an 'error' event on an event emitter will cause the event emitter to throw an exception if a listener for the 'error' event has not been registered.
</div>

<div v-click="2">

```js
const { EventEmitter } = require('events')
const ee = new EventEmitter()

process.stdin.resume() // keep process alive

ee.on('error', (err) => {
  console.log('got error:', err.message )
})

ee.emit('error', new Error('oh oh'))
```
</div>



--- 

# Prototypical Inheritance

Inheritance with JS is achieved with a chain of prototypes. These approaches have evolved significantly over time.

The three common approaches to creating a prototypal chain:
- functional
- constructor functions
- class-syntax constructors

--- 

# Prototypical Inheritance (Functional)

```js {all|1-3|1-7|1-11|all}
const wolf = {
  howl: function() { console.log(`${this.name} awoooooo`)}
}

const dog = Object.create(wolf, {
  woof: {value: function() {console.log(`${this.name} woof`)}}
})

const rufus = Object.create(dog, {
  name: {value: 'Rufus the dog'}
})

rufus.woof()
rufus.howl()
```

---

# Prototypical Inheritance (Constructor function)

```js {all|1-3|1-7|9-11|13|13-17|19|all}
function Wolf(name) {
  this.name = name;
}
  
Wolf.prototype.howl = function() {
  console.log(`${this.name} awooooooo`)
}
  
function Dog(name) {
  Wolf.call(this, `${name} the dog`)
}
  
Object.setPrototypeOf(Dog.prototype, Wolf.prototype)
  
Dog.prototype.woof = function() {
  console.log(`${this.name} woof`)
}
  
const rufus = new Dog('Rufus')
  
rufus.woof()
rufus.howl()
```

---

# Prototypal Inheritance (Class-Syntax Constructors)

```js
class Wolf {
  constructor(name) {
    this.name = name
  }
  howl() {
    console.log(`${this.name} awooooooo`)
  }
}

class Dog extends Wolf {
  constructor(name) {
    super(`${name} the dog`)
  }
  woof() {
    console.log(`${this.name} woof`)
  }
}

const rufus = new Dog('Rufus')

rufus.woof()
rufus.howl()
```

---

# Closure Scope

When a function is created, an invisible object is also created - this is the closure scope.

Parameters and variables created in the function are stored on this object.

```js
function outerFunction() {
  const foo = true;
  function print() {
    console.log(foo)
  }
  foo = false
  print()
}
outerFunction()
```

---

# Exercises

1. Open the file `exercise1.js`. Implement the prefixer function as a closure function. It will return a function with the given prefix defined. Run `node exercise1.js` in the directory and you should get the correct Hello's and Goodbye's.

2. In `exercises2.js`, you need to implement an event emitter and use it. It should be able to handle any number of arguments.

Extra: Open the file `exercises2.js`. Your job is to create a prototype chain from leopard -> lynx -> cat. Decide which type of inheritance you want to try to implement (remember the three are functional, constructor, class syntax). If you have time, try another implementation.

