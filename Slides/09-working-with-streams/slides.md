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

# Working with Streams

---

By the end of this section, you should be able to:

- Distinguish the different types of streams.
- Create various types of streams.
- Understand stream events and how to handle them.
- Explain incremental data processing with Node.js.

---

# Stream Types


The Node core stream expose six constructors:

<v-clicks>

- Stream
- Readable
- Writable
- Duplex
- Transform
- PassThrough


Other common Node core APIs (like process, net, http, fs, child_process) expose streams created with these.

The Stream constructor is the default export of the stream module and inherits from the EventEmitter.

It's rarely used directly but is inherited from by the other constructors.

</v-clicks>

---

# Common events emitted by streams

<v-clicks>

- data
- end
- finish
- close
- error

The data and end events are used in readable streams.

The finish is emitted by writable streams when there is nothing left to write.

The close and error are common to all streams.

There's a full list of events for [readable](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_class_stream_readable) and [writable](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_class_stream_writable) streams in the docs.

</v-clicks>

---

# Stream Modes

<v-clicks>

There are two stream modes:

- Binary Streams
- Object Streams

The mode of a stream is determined by its `objectMode` option.

**false (default)**

The default mode is binary, which only read or write Buffer instances.

**true**

In object mode streams can read or write JS objects. In Node core, most object mode streams deal with strings.

</v-clicks>

---

# Readable Streams

## Purposes

<v-clicks>

- Read file
- Read data from an incoming HTTP request
- Read user input from a command prompt
- ...

</v-clicks>

---

# Writeable Streams

## Purposes

<v-clicks>
- Write a file
- Write data to an HTTP response
- Write to the terminal
- ...
</v-clicks>

---

# Readable-Writeable Streams

These come in three types:

- Duplex
- Transform
- PassThrough

The most common is the Transform stream but we'll think about all three.

---

# Determining End-of-Stream

<v-clicks>

There are four possible end of stream events:

- close
- error
- finish
- end


Use stream.finished utility function instead of listening to all four.
</v-clicks>

---

# Piping Streams

We can put everything we've learned to deal with piping - available on CLIs for decades.

- Pipe is used for a single pipe
- Pipeline is used for a chain

---

# Exercises

1. In exercise1, use the appropriate method ot make sure that all the data in the readable stream is automatically sent to the writeable stream.

2. In exercise2, replace the PassThrough() instantiation so that transform is assigned to a stransform stream that upper cases any incoming chunks.