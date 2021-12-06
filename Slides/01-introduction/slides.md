---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
# persist drawings in exports and build
drawings:
  persist: false
---

# Node.js Training

Kevin Cunningham

Grab repo at https://github.com/doingandlearning/node-3days-dec-2021

---

# A bit about me

- Lived, taught and developed in Brighton for 20 years
- Recently relocated back to Northern Ireland
- Dad to two boys
- Love learning new things
- Passionate about JavaScript and the power it gives developers
- You can find me on Twitter (@dolearning) or on my website (https://kevincunningham.co.uk)

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

---

# A bit about the course

|     |     |
| --- | --- |
| Intro to Node| Binary data with Buffers |
| Node on the command line | Data processing with Streams |
| Debugging | Files, Processes and OSs |
| Core JS Concepts | Child processes |
| Packages and Dependencies | Testing with Node |
| Node module system | Express | 
| Async control flow | RESTful Services |
| Node event system | SQL with Node | 
| Error handling |  |

---

# Timings

| | |
| --- | --- |
| 9.30 - 11 | Session 1 |
| 11 - 11.15 | Coffee |
| 11.15 - 12.45 | Session 2 |
| 12.45 - 1.45 | Lunch |
| 1.45 - 3.15 | Session 3 |
| 3.15 - 3.30 | Coffee |
| 3.30 - 4.30 | Session 4 | 

---

# A bit about you

- Name
- What your role is
- What you're hoping to get out of this course

---

# What is Node.js?

<p></p>

![The Event Loop](https://i.stack.imgur.com/Lbs9z.png)

Open source, free, cross-platform, JS on the server, event-driven, non-blocking, asynchronous, scalable
---

# Characteristics of Node

<ul v-click="2">
  <li v-click="2">Google Chrome V8 JavaScript Engine</li>
  <li v-click="3">Modules/Packages</li>
  <li v-click="4">Event Driven, Single-Threaded I/O Model</li>
</ul>

---

# Open up a terminal
Execute both of these commands to make sure that you have Node install properly.

```bash {all}
node -v
npm -v
```

All being well, you'll get a version number back.

For this course, anything over Node 12 should be fine (though I'll be using Node 14) and I'll be using npm version 6.14.15.

---

# Node on the command line

By the end of this section, you should be able to:
- Explore all possible Node and V8 command line flags
- Use key utility mode command line flags
- Understand an essential selection of operational command line flags

<!-- The Node.js platform is almost entirely represented by the node binary executable. In order to execute a JavaScript program we use: node app.js, where app.js is the program we wish to run. However, before we start running programs, let’s explore some of the command line flags offered by the Node binary. -->
---

```bash
node --help
node --v8-options
node --check app.js
node --print
node --eval
node --require
node --stack-trace-limit
```

---

# NPM


---

# Node.js REPL

- `.editor`
- Double tab
- Ctrl-l

---

# Editors

- Use what you want :) 
- I use vim when I'm not teaching and VSCode when I am

--- 

# First program 

- process.argv


---

# Exercises (`Labs/01-introduction`)

1. In the labs folder, there is a file called `will-throw.js`. Run the file without any flags and then run with the appropriate flag to see the full call stack.

  > In the first case, there should only be ten stack frames in the error output. In the second, there should be significantly more.

2. There are two other files in the labs folder, `bad-syntax.js` and `correct-syntax.js`. Use the appropriate flag to check the syntax of each file.

  > There should be no output when checking `correct-syntax.js` and there should be a Syntax Error when checking the syntax of `bad-syntax.js`.

3. Write your own command line program. Some ideas:
  - Create an add util that will take two arguments and log the answer
  - What about any number of arguments?
  - What about a tool that uses flags to decide whether it should add or subtract your numbers?
  - Have a play :) 

---

