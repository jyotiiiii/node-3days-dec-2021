const fs = require("fs");
const { Readable } = require("stream");

const createReadStream = () => {
  const data = ["some", "data", "us-east-1", "bbc", "other", "stuff"];
  return new Readable({
    read() {
      if (data.length === 0) this.push(null);
      this.push(data.shift());
    },
  });
};
const readable = createReadStream();
// const readable = fs.createReadStream(__filename);

readable.on("data", (data) => console.log("Got data: ", data));
readable.on("end", () => console.log("all done"));
