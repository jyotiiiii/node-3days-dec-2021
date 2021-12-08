const fs = require("fs");
const { Writable } = require("stream");

const createWriteSteam = (data) => {
  return new Writable({
    objectMode: true,
    write(chunk, enc, next) {
      data.push(chunk);
      // Complex operation
      next();
    },
  });
};

const data = [];

const writable = createWriteSteam(data);

// const writable = fs.createWriteStream("./out");

writable.on("finish", () => {
  console.log("finished writing");
});

writable.write("Hello \n");
writable.write("How are you? \n");
writable.write("12 minutes to coffee. \n");
writable.end("Nothing more to write :)");

console.log(data);
