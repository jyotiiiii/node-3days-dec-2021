// TODO: Create new Error class for not string with relevant err code

// TODO: Create new Error class for string being too long

function upperCase(str) {
  // TODO: Use your error classes to exit early.
  return str.toUpperCase();
}

console.log(upperCase("Hello"));
console.log(upperCase("A long string that should throw an error."));
console.log(upperCase(true));
console.log(upperCase(3));
console.log(upperCase([]));
console.log(upperCase({}));
