const net = require("net");
const { Transform, finished, pipeline } = require("stream");
const { scrypt } = require("crypto");

const createTransformSteam = () => {
  return new Transform({
    transform(chunk, enc, next) {
      scrypt(chunk, "some-salt", 32, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        next(null, data);
      });
    },
  });
};

// const transform = createGzip();
const transform = createTransformSteam();

transform.on("data", (data) => {
  console.log("got data: ", data.toString("base64"));
});

finished(transform, (err) => {
  if (err) console.error(err);
  console.log("All done");
});

net
  .createServer((socket) => {
    const interval = setInterval(() => {
      socket.write("beat");
    }, 1000);

    pipeline(socket, transform, socket, (err) => {
      console.log("There was socket err", err);
    });
    // socket.on("data", (data) => {
    //   socket.write(data.toString().toUpperCase());
    // });

    // socket.on("end", () => {
    //   clearInterval(interval);
    // });
  })
  .listen(1337);
