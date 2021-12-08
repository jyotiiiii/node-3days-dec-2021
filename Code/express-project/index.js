const express = require("express");
const auth = require("./middleware/auth.js");

const bookRoutes = require("./routes/books.js");

const port = process.env.PORT || 3100;

const app = express();
// app.use(auth);
app.use(express.json());
app.use(express.static("public"));

let books = [
  {
    id: 2,
    name: "Beartown",
  },
];

app.use("/api/v1/books", bookRoutes);

// app.get("/book", (req, response) => {
//   console.log(books);

//   response.send("Hello BBC!");
// });

app.post("/", (req, response) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
  response.send("Hello BBC!");
});

// app.patch("/book/:author/:title", (req, response) => {
//   const { author, title } = req.params;
//   console.log(author, title);
//   response.send("Updated book");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
