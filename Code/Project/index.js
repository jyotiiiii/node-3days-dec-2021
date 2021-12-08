const express = require('express');
const auth = require('./auth.js');

const bookRoutes = require('./routes')

const port = process.env.PORT || 3000;

const app = express();

app.use("/api/v1/books", bookRoutes)

app.get('/', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.send('Hello BBC!');
});

app.post('/book/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.path);
    console.log(req.query);
    res.send('Hello BBC!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
