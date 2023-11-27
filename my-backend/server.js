import express from 'express'
import mongodb from 'mongodb'
import cors from 'cors'
import pizzaRouter from './routes/Pizza.route.js'
import dotenv from 'dotenv'
import itemDao from './dao/itemDAO.js'
import UserDAO from './dao/UserDAO.js';
import PaletteDao from './dao/paletteDAO.js'

const app = express()

dotenv.config()
app.use(cors({
  credentials: true,
}))
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb'}));

app.get("/", (req, res) => {
  res.send("Hello Backend World")
})

app.use('/pizza', pizzaRouter)

const MongoClient = mongodb.MongoClient;
let dbClient; // Used to close connection after tests

MongoClient.connect(process.env.ITEM_DB_URI, {
  wtimeoutMS: 2500,
}).then(async (client) => {
  dbClient = client;
  await itemDao.injectDB(client);
  await UserDAO.injectDB(client);
  await PaletteDao.injectDB(client);
});

//api needs to run on a different port than the front end
let server = app.listen(5000, () => { console.log("Server started on port 5000") });

// Used to close all connections after tests have run
export const closeServerAndDB = () => {
  if (dbClient){
    dbClient.close(() => {
      console.log("Database connection closed successfully.");
    });
  };
  if (server){
    server.close(() => {
      console.log("Server closed successfully.");
    });
  };
};

export default app
