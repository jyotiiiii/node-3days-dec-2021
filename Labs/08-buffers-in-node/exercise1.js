"use strict";
const assert = require("assert");
const buffer = null; // TODO: Safely allocate a buffer of size 1024

for (const byte of buffer) assert.equal(byte, buffer[0]);
console.log("passed!");
