const express = require('express')
const app = express()
const pizzaRouter = require('./routes/Pizza.route')

app.get("/", (req, res) => {
    res.send("Hello backend World")
})

app.use('/pizza', pizzaRouter)

app.listen(5000, () => { console.log("Server started on port 5000") }) //api needs to run on a different port than the front end