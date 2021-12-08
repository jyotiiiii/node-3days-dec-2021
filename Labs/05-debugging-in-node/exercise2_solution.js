// TODO: Create new Error class for not string with relevant err code
class NoneString extends Error {
  code = "ERR_NOT_A_STRING";

  constructor() {
    super("This variable should be a string.");
  }

  get name() {
    return "NoneString";
  }
}

// TODO: Create new Error class for string being too long
class TooLongString extends Error {
  code = "ERR_EXCEEDS_MAX_STRING_LENGTH";

  constructor() {
    super("String needs to be shorter.");
  }

  get name() {
    return "TooLongString";
  }
}

function upperCase(str) {
  // TODO: Use your error classes to exit early.
  if (typeof str !== "string") throw new NoneString();
  if (str.length > 15) throw new TooLongString();
  return str.toUpperCase();
}

console.log(upperCase("Hello"));
// console.log(upperCase("A long string that should throw an error."));
// console.log(upperCase(true));
// console.log(upperCase(3));
// console.log(upperCase([]));
// console.log(upperCase({}));
