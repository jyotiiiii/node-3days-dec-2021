const { promisify } = require("util");

const print = (err, contents) => {
  if (err) console.error(err);
  else console.log(contents);
};

function wait(ms, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms);
  });
}

const opA = async (cb) => {
  // setTimeout(() => {
  //   cb(null, "A");
  // }, 500);
  await wait(500, cb(null, "A"));
};

const opB = async (cb) => {
  // setTimeout(() => {
  //   cb(null, "B");
  // }, 250);
  await wait(250, cb(null, "B"));
};

const opC = async (cb) => {
  // setTimeout(() => {
  //   cb(null, "C");
  // }, 125);
  await wait(125, cb(null, "C"));
};

// opA((err, data) => {
//   if (err) console.log(err);
//   else print(data);
//   opB((err, data) => {
//     if (err) console.log(err);
//     else print(data);
//     opC((err, data) => {
//       if (err) console.log(err);
//       else print(data);
//     });
//   });
// });

async function run() {
  await opA(print);
  await opB(print);
  await opC(print);
}

run();
