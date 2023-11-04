import express from 'express'
import itemController from '../controller/item.controller.js'
import userController from '../controller/user.controller.js'
import paletteController from '../controller/palette.controller.js'

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
router.route("/pizzaSpecial").get(itemController.apiGetPizzaSpecial)
router.route("/comboSpecial").get(itemController.apiGetComboSpecial)
router.route("/specialDeals").get(itemController.apiGetSpecialDeals)
router.route("/user/login").post(userController.login)
router.route("/allItems").post(itemController.apiPutItem)
router.route("/allItems/deleteItem").post(itemController.apiDeleteItem)
router.route("/allItems/updateItem").post(itemController.apiModifyItem)
router.route("/drink").get(itemController.apiGetDrink)
router.route("/user/editUser").post(userController.apiEditUser)
router.route("/user/retrieveToken").post(userController.apiGetUserbyToken)
router.route("/customToppings").post(itemController.apiGetToppingPrice);
router.route("/customToppings/update").post(itemController.apiUpdateToppingPrice);
router.route("/palettes").get(paletteController.apiGetLastTenPalettes);
router.route("/palettes/current").get(paletteController.apiGetCurrentPalette);
router.route("/palettes/add").post(paletteController.apiPutPalette);


export default router