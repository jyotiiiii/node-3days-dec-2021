// TODO: Create new Error class for not string with relevant err code
class NotStringError extends Error {
  code = "ERR_NOT_A_STRING";

  constructor() {
    super("This is not a string");


}
get name() {
  return "NotStringError"
}
}
// TODO: Create new Error class for string being too long

function upperCase(str) {
  // TODO: Use your error classes to exit early.
  if (str.length > 6) {
    throw new NotStringError("Whoops! Your input is too long");
  } else if (typeof str !== "string" ) {
    throw new NotStringError("Whoops! Wrong characters entered");
  }
  return str.toUpperCase();

}



console.log(upperCase("Hello"));
console.log(upperCase("A long string that should throw an error."));
console.log(upperCase(true));
console.log(upperCase(3));
console.log(upperCase([]));
console.log(upperCase({}));
