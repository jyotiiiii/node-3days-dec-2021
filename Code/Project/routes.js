const router = require("express").Router();

router.use((req, res, next) => {
    console.log("In the router: ", new Date.toISOString())
    next();
})

router.get()