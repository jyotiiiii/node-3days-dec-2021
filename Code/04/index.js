const { readFile } = require("fs");
const { upperCase } = require("./upperCase");

function printInput(input) {
  console.log(upperCase(input));
}

printInput("I'm here");

// console.log("index", module);
