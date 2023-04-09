import express from 'express'
import itemController from '../controller/item.controller.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello Pizza World")
})

router.get("/cheese", (req, res) => {
    res.send("Hello Cheese Pizza World")
})

/*
*   when route/items is called, items in database will be outputted
*/
router.route("/items").get(itemController.apiGetItem)

export default router