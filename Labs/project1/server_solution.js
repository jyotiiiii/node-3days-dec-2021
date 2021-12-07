const http = require("http");
const querystring = require("querystring");
const port = 3000;

let bookStore = [
  {
    id: 1,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    location: "JavaScript",
  },
];

let id = 1;

const app = http.createServer();

// TODO:
// - Add CRUD functionality to our in memory bookStore over HTTP
// - Decide if route or verb is the right way to handle it
// - Could you refactor the in memory store to be a closure?
// -

app.on("request", (request, response) => {
  switch (request.method) {
    case "GET":
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(bookStore));
      response.end();
      break;
    case "POST":
      let body = [];
      request.on("data", (bodyData) => body.push(bodyData));
      request.on("end", () => {
        body = JSON.parse(Buffer.concat(body).toString());
        body.id = ++id;
        bookStore.push(body);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(
          JSON.stringify({ success: true, message: "Added book." })
        );
        response.end();
      });
      break;

    case "PATCH":
      const idPatch = request.url.split("/")[1];

      const tempStore = bookStore.filter((book) => book.id !== idPatch);
      const bookToUpdate = bookStore.filter((book) => book.id === idPatch)[0];
      let bodyPatch = [];
      request.on("data", (bodyData) => bodyPatch.push(bodyData));
      request.on("end", () => {
        bodyPatch = JSON.parse(Buffer.concat(bodyPatch).toString());
        const updatedBook = { ...bookToUpdate, ...bodyPatch };
        const updatedStore = [updatedBook, ...tempStore];
        bookStore = updatedStore;
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(
          JSON.stringify({ success: true, message: "Added book." })
        );
        response.end();
      });
  }
  // GET
  if (request.method === "GET") {
    // send the whole book object
    // JSON.stringify()
  }

  // POST
  if (request.method === "POST") {
  }

  // DELETE

  // PATCH
});

app.listen(port);
console.log(`Server is running on port ${port}.`);
