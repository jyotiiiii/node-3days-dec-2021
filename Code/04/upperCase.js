function upperCase(input) {
  return input.toUpperCase();
}

if (module.parent === null) {
  const args = process.argv;

  for (let i = 2; i < args.length; i++) {
    console.log(upperCase(args[i]));
  }
}

module.exports = { upperCase };
