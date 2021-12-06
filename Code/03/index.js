const newProm = new Promise((resolve, reject) =>
  reject(new Error("Really bad thing."))
).catch((err) => console.log(err));

//const { readFile } = require("fs").promises;
// const files = [filename, "not a file", filename];

// const print = (results) => {
//   results
//     .filter(({ status }) => (status = "rejected"))
//     .forEach(({ reason }) => console.error(reason));

//   const data = results
//     .filter(({ status }) => (status = "fulfilled"))
//     .map(({ value }) => value);

//   const contents = Buffer.concat(data);
//   console.log(contents.toString());
// };

// const readers = files.map((file) => readFile(file));

// Promise.allSettled(readers).then(print).catch(console.error);
