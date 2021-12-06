const EventEmitter = require("events");

const myEE = new EventEmitter();

const greet = (greeting, ...names) => {
  names.forEach((name) => console.log(`${greeting} ${name}`));
};

myEE.on("my-cool-event", greet);
// myEE.on("my-cool-event", (greeting, ...names) => {
//   names.forEach((name) => console.log(`Good morning ${name}`));
// });
// myEE.prependOnceListener("my-cool-event", () =>
//   console.log("I'll always go first")
// );

myEE.emit("my-cool-event", "Salve", "dan", "kelly", "sam");

myEE.removeAllListeners();

myEE.emit("my-cool-event", "Goodbye", "dan", "kelly", "sam");

// class MyEmitter extends EventEmitter {
//   constructor(opts = {}) {
//     super(opts);
//     this.name = opts.name;
//   }

//   destroy(err) {
//     if (err) {
//       this.emit("error", err);
//     }
//     this.emit("close");
//   }
// }

// const myEE1 = new MyEmitter({ name: "myEE" });
// myEE1.on("close", function (e) {
//   console.log("I'm closing");
//   console.log(e);
// });

// myEE1.on("error", (err) => console.log(err));

// myEE1.destroy("It broke.");
