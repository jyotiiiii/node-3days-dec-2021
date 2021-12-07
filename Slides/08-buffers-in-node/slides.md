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

# Using buffers in Node

---

# Good morning, good afternoon, good evening! 👋🏻

Same deal as yesterday:

- Pull down the repo with today's slides and exercises.
- Have a think about a takeaway from yesterday.

---

By the end of this section, you'll:
- Understand the anatomy of a Buffer instance.
- Safely and unsafely create buffers.
- Convert between buffers and other data structures.

---

# The Buffer Instance

<v-clicks>

- Buffer constructor is a global, so no need to require a module.
- When it was first introduced to Node, JS didn't have a native binary type
- We now have ArrayBuffer and a number of Typed Arrays to provide different "views" of a buffer
- Full list of these on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
- When these new structures were added to JS, the Buffer constructor internals were refactored
- So, a buffer object is both an instance of Buffer and an instance of Uint8Array
- That means we can use the full API of [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) as well as the [Buffer methods](https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html)
- There's only one breaking change in this refactor. `Buffer.prototype.slice` and `Uint8.prototype.slice`.

</v-clicks>

---

# Allocating Buffers

<v-clicks>

> You'll rarely need to allocate a buffer but if you do, don't use the new keyword with Buffer constructor.

The correct way to allocate a buffer of a certain amount of bytes is:

```js
const buffer = Buffer.alloc(10)
```

This is the safe way to allocate buffers - the unsafe way is:

```js
const buffer = Buffer.allocUnsafe(10)
```

</v-clicks>

---

# Converting String to Buffers

<v-clicks>

You can create buffer from a string:

```js
const buffer = Buffer.from("This is a string.")
```

In order to convert a string, an encoding is assumed. The default encoding is UTF8. Be careful with string lengths!

You can set the encoding with a second parameter:

```js
const buffer = Buffer.from("This is a string", "utf16le")
```

The supported byte-to-text encodings are hex and base64. Supplying one of these encodings allows us to represent the data in a string, this can be useful for sending data across the wire in a safe format.


</v-clicks>

---

# Converting Buffers to Strings

<v-clicks>

To convert a buffer to a string, call the toString method on a Buffer instance.

Be careful to decode with the same method as it was encoded (duh!).

The UTF8 encoding format has between 1 and 4 bytes to represent each character, if for any reason one or more bytes is truncated from a character this will result in encoding errors.

So in situations where we have multiple buffers that might split characters across a byte boundary the Node core string_decoder module should be used.

</v-clicks>

---

# JSON Serializing and Deserializing Buffers

<v-clicks>

When JSON.stringify encounters any object it will attempt to call a toJSON method on that object if it exists. 

The Buffer `toJSON` method returns a JS object to represent the Buffer in a JSON-friendly way.


</v-clicks>

---

# Exercises

1. In file exercise1, safely create a Buffer of size 1024. 

2. In file exercise2, convert str to a base64 encoded string by using a buffer. 

