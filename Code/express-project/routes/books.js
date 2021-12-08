const router = require("express").Router();

router.use((req, res, next) => {
  console.log("In the router: ", new Date().toISOString());
  next();
});

router.get("/", (req, res) => {
  res.json("All the books");
});
router.get("/:id", (req, res) => {
  res.json("Get particular book");
});

router.post("/", (req, res) => {
  res.json("Create the book");
});

module.exports = router;
