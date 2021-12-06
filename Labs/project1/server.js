const http = require("http");
const port = 3000;

let userStore = [
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
  response.write("<h1>Hello</h1>");
  response.end();
});

app.listen(port);
console.log(`Server is running on port ${port}.`);
