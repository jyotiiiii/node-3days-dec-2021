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

# Interacting with the file system

---

By the end of this section, you should be able to:

- Understand path manipulation in Node.
- Query files and directories for meta-data and permissions controls.
- Dynamically respond to file system changes.
- Discover various ways to write files and read files and directories.

---

# File Paths

<v-clicks>

There are two core modules that achieve file system management.

**fs**: provides APIs to deal with reading, writing, file system meta-data and file system watching

**path**: handles path manipulation and normalization across platforms



</v-clicks>


<h2 v-click="4">Important variables</h2>

<v-clicks>

**__filename** - the absolute path of the currently executing file

**__dirname** - the absolute path to the directory the currently executing path is located in

</v-clicks>

---

# path

The most common method used in path is join, as this character is different between Windows and Linux based machines.

There are path constructors (relative, resolve, normalize and format) and path deconstructors (parse, basename, dirname, extname).

---

# Reading and Writing

The higher level methods for reading and writing are provided in four abstraction types:

- Synchronous
- Callback based
- Promise based
- Stream based

--- 

# File Metadata

Metadata about files can be obtained with the following methods:

- fs.stat, fs.statSync, fs.promises.stat
- fs.lstat, fs.lstatSync, fs.promises.lstat

The only difference between the stat and lstat methods is that stat follows symbolic links, and lstat will get meta data for symbolic links instead of following them.

---

# Watching

The fs.watch method is provided by Node core to tap into file system events. It is however, fairly low level and not the most friendly of APIs.

---

# Exercise

The labs folder for this section contains two files, index.js and store.json.

Your job is the write the code for the functions to build a file-based store.

Remember to use JSON.stringify() before writing to the disk, and JSON.parse() after reading.

If you're successful, the store.json should contain the books that are added in index.js with appropriate ids.

## Extra time? Some possible extensions:

- Watch an additional directory for any uploaded JSON files that will be parsed and added to your store. Clear the upload when you're done.

- How would you trigger the store persistence? Should this happen on every book submission?

---
layout: two-cols
---



# Exercise 1

The code in exercise1 will generate a project folder and add five files to it. Complete the exercise function so that all the files in the project folder are written to the out.txt file as stored in the out constant. Only the file name should be stored.

So, given a project folder with the following files:
- 0p2ly0dluiw
- 2ftl32u5zu5
- 8t4iilscua6
- 90370mamnse
- zfw8w7f8sm8

The out.txt should then contain:

0p2ly0dluiw,2ftl32u5zu5,8t4iilscua6,90370mamnse,zfw8w7f8sm8

::right::

# Exercise 2

The code in exercise2 will create a folder named project (removing it first if it already exists and then recreating it), and then perform some file system manipulations within the project folder.


The goal is to ensure that the answer variable is set to the newly created file. So when a directory is added, the answer variable should not be set to the directory path. When the preexisting files status is updated via a permissions change, the answer variable should not be set to that preexisting file.

If implemented correctly the process will output: passed!