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
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# Debugging in Node.js

---

# Morning 👋🏻

As you arrive, could you:

- Pull the changes from the repo
- Think of a takeaway (learning, question, wondering) from yesterday to share.

---

- Learn how to start a process in inspect mode
- Connect to a process in inspect mode in order to debug it
- Understand what breakpoints are and how to set them
- Learn about errors in Node

---

# Starting in Inspect Mode

Consider this code as `app.js`:
```js 
function test(n = 99) {
  if (n === 0) throw Error();
  test(n-1)
}

test()
```

## node --inspect app.js
## node --inspect-brk app.js
## chrome://inspect

--- 

# Kinds of Errors

<div v-click>
1. Operational

- Errors that happen while the program is doing something (network failure, I/O failure).
These should be ideally recovered from.
</div>

<div v-click>
2. Developer

- The program should probably stop running (invalid input? faulty logic?) but should give a helpful error to the developer.
</div>

---

# Throwing

- You can throw anything
- You could throw a string
- It is best to throw an instance of the Error class

---

# Native Error Constructors

As well as Error, there are six other native error constructors:

<div v-click>
- EvalError
- SyntaxError
- RangeError
- ReferenceError
- TypeError
- URIError
</div>

<div v-click>
These are mostly for JS API's but you can leverage them if you want.
</div>

---

# Custom Errors

- Native errors are limited and rudimentary.
- We can make our own by subclassing native error constructors or by using a code property.


---


# Exercises

1. Start `exercise.js` with Node in Inspect Mode, but with the application immediately paused on the first line of execution code.

If this done correctly, then the program should be paused on line 1. Verify this in the Chrome Devtools.

2. Explore setting breakpoints and then querying your API using code and the UI.

3. Open `exercise2.js` and work through the TODOs. Create errors and then use them. 

4. If you've time, explore what else is available to you in the debugger. Also, explore other ways to throw/catch errors.
