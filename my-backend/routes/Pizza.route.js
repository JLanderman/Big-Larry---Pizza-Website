const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello Pizza World")
})

router.get("/cheese", (req, res) => {
    res.send("Hello Cheese Pizza World")
})

module.exports = router