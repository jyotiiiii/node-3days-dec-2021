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

# SQL in JS

---

By the end of this section, you'll:

- Be able to use JS to send raw SQL queries
- Be able to use an ORM to encapsulate the logic
- Be able to discuss the use of connection pools

---

# Using the MySQL library

- Connect
- Query
- Insert
- Update
- Delete

---

# Using an ORM

- Sequelize
- Models

--- 

# Connection Pooling

<v-clicks>

- Rather than just relying on caching to improve DB performance, we can use connection pools.

- Each new DB connection takes about 1.3MB in memory - so in a heavy production environment, memory resources can be quickly exceeded.

- Instead of opening and closing connections for every request, connection pooling uses a cache of database connections that can be reused.

- This allows for parallel task execution.

- The connection pool is by process, so if you're using multiple nodes this scales.

</v-clicks>

<div v-click="6">

```js 
const sequelize = new Sequelize(/* ... */, {
  // ...
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

</div>

---

# NoSQL Databases

- Relational vs Document store


---

# Mongoose

- Create a model
- Create controllers

---


# Exercise

1. Migrate your in memory store to use a DB backend.