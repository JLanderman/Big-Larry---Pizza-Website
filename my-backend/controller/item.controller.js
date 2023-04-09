import itemDAO from '../dao/itemDAO.js'

export default class ItemController{

    /*
    *   item is grabed and formatted into a json response
    */
    static async apiGetItem(req, res, next){
        const {itemList, totalNumItem} = await itemDAO.getItem({})
        let response = {
            item: itemList,
            total_results: totalNumItem
        }
        res.json(response)
    }
}