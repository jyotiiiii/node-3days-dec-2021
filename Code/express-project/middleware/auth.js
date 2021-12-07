function auth(req, res, next) {
  if (req.headers["x-api-key"] !== "secret") {
    res.status(401).send({ success: false });
  }
  next();
}

module.exports = auth;
