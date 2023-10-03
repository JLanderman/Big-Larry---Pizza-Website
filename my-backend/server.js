import express from 'express'
import mongodb from 'mongodb'
import cors from 'cors'
import pizzaRouter from './routes/Pizza.route.js'
import dotenv from 'dotenv'
import itemDao from './dao/itemDAO.js'
import UserDAO from './dao/UserDAO.js';

const app = express()

dotenv.config()
app.use(cors({
  credentials: true,
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello Backend World")
})

app.use('/pizza', pizzaRouter)

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.ITEM_DB_URI, {
  wtimeoutMS: 2500,
}).then(async (client) => {
  await itemDao.injectDB(client);
  await UserDAO.injectDB(client);
});

app.listen(5000, () => { console.log("Server started on port 5000") }) //api needs to run on a different port than the front end

export default app
