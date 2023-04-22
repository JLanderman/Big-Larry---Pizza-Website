import { ObjectId } from "mongodb";
import itemDAO from "../dao/itemDAO.js";

export default class ItemController {
  /*
   *   item is grabbed and formatted into a json response
   */
  static async apiGetItem(req, res, next) {
    if (req.query._id != null) {
      // ^ if this is a request for a specific ObjectID

      // v check to ensure this is a valid ObjectID
      if (!req.query._id.match(/^[0-9a-fA-F]{24}$/)) {
        console.error(
          "'GET by ObjectID' request does not contain valid ObjectID"
        );
        return;
      }

      let objID = new ObjectId(req.query._id);

      const { itemList } = await itemDAO.getItem(objID);
      let response = itemList;
      res.json(response);
      return;
    }

    const { itemList, totalNumItem } = await itemDAO.getItem();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }
}
