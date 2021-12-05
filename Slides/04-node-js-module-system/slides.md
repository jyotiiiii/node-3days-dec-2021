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

# Node.js Module System

---

By the end of this section, you should be able to:

- Learn how to load modules.
- Discover how to create modules.
- Lookup a modules file path.
- Detect whether a module is the entry point of an application.

--- 

# Loading a module

- require()

--- 

# Creating a module

Require won't always be a function that generates an instance of something. Instead, require will return whatever is exported from the module.

```js
"use strict"

const upper = (str) => {
  if (typeof str === 'symbol') str = str.toString();
  return str.toUpperCase();
}

module.exports = {upper: upper}
```

--- 

# Detecting Main Module

We may want a program to behave differently if it is a module or a program.

If `module.parent === null` or if `require.main === module` then we are in the main module.

---

# Resolving a module path

- `require.resolve`

--- 

# Exercises

1. Open `Labs/05-node-js-module-system/add.js` and create a function that takes two numbers and adds them together. Export that function.

2. In `index.js` import the function you've created and use it to console.log two numbers being added together.

3. Add a console.log to your `add.js` file which will add two numbers together loaded as a separate program. Check that this works by running `node add.js` in the directory.