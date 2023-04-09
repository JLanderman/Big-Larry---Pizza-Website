import app from './server.js'
import mongodb from 'mongodb'
import itemDao from './dao/itemDAO.js'

const MongoClient = mongodb.MongoClient

MongoClient.connect(
    process.env.ITEM_DB_URI,
    {
        wtimeoutMS: 2500
    })
    .then(async client => {
        await itemDao.injectDB(client)
    })

export default app