import express from 'express'
import itemController from '../controller/item.controller.js'
import userController from '../controller/user.controller.js'

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

router.route("/lunchItems").get(itemController.apiGetLunch)
router.route("/items").get(itemController.apiGetItem)
router.route("/cartItems").get(itemController.apiGetCart)

router.route("/user/login").post(userController.login)

export default router