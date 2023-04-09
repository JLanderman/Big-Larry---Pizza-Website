import express from 'express'
import cors from 'cors'
import pizzaRouter from './routes/Pizza.route.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello backend World")
})

app.use('/pizza', pizzaRouter)
app.listen(5000, () => { console.log("Server started on port 5000") }) //api needs to run on a different port than the front end

export default app