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

# Writing Unit Tests

---

By the end of this section, you should be able to:

- Understand the basic principles of assertions.
- Discover a selection of test runner frameworks.
- Configure a project to run tests in a standardized way.

---

# Assertions

An assertion checks a value for a given condition and throws if that condition is not met.

The core assert module exports a function that will throw an AssertionError when the value passed to it is falsy.

---
layout: two-cols
---

# Assertion methods

- assert.ok(val) – the same as assert(val)
- assert.equal(val1, val2) – coercive equal, val1 == val2
- assert.notEqual(val1, val2) – coercive unequal, val1 != val2
- assert.strictEqual(val1, val2) – strict equal, val1 === val2
- assert.notStrictEqual(val1, val2) – strict unequal, val1 !== val2
- assert.deepEqual(obj1, obj2) – coercive equal for all values in an object
- assert.notDeepEqual(obj1, obj2) – coercive unequal for all values in an object
- assert.deepStrictEqual(obj1, obj2) – strict equal for all values in an object

::right::

- assert.notDeepStrictEqual(obj1, obj2) – strict unequal for all values in an object
- assert.throws(function) – assert that a function throws
- assert.doesNotThrow(function) – assert that a function doesn't throw
- assert.rejects(promise|async function) – assert promise or returned promise rejects
- assert.doesNotReject(promise|async function) – assert promise or returned promise resolves
- assert.ifError(err) – check that an error object is falsy
- assert.match(string, regex) – test a string against a regular expression
- assert.doesNotMatch(string, regex) – test that a string fails a regular expression
- assert.fail() – force an AssertionError to be thrown

---

We can group the assertions into the following categories:

- Truthiness (assert and assert.ok)
- Equality (strict and loose) and Pattern Matching (match)
- Deep equality (strict and loose)
- Errors (ifError plus throws, rejects and their antitheses)
- Unreachability (fail)

---

# Test Harnesses

- Pure library
- Framework Environment

---

# tap Test Library

---

# jest Framework

---

# Configuring package.json

---

# Exercises

There are three separate APIs to test in the labs folder.

There is a sync, callback and promise based API.

Any additional dependencies, such as a test harness, may be additionally installed.

Ensure that when `npm test` is run the current working directory is fully tested.

For exercise2 and exercise3, the API mimics some kind of async storage mechanism, such as to a database. In some circumstances it is infeasible to check for a specific value (for instance an ID returned from a database). For those cases, we can check for the presence of an ID, or apply some validation. In our case we can at least check that the length of the ID is 4.