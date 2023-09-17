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

  static async apiGetCart(req, res, next) {
    if (req.query._id != null) {
      if (!req.query._id.match(/^[0-9a-fA-F]{24}$/)) {
        console.error(
          "'GET by ObjectID' request does not contain valid ObjectID"
        );
        return;
      }

      let objID = new ObjectId(req.query._id);

      const { cartList } = await itemDAO.getCart(objID);
      let response = cartList;
      res.json(response);
      return;
    }

    const { cartList, totalNumItem } = await itemDAO.getCart();
    let response = {
      item: cartList,
      total_results: totalNumItem,
    };
    res.json(response);
  }


  static async apiGetLunch(req, res, next)
  {
    if(req.query._id != null)
    {
      if(!req.query._id.match(/^[0-9a-fA-F]{24}$/))
      {
        console.error(
          " 'GET by objectID' request does not contain valid ObjectID"
        );
        return;
      }
      let objectID = new ObjectId(req.query._id);

      const { lunchList } = await itemDAO.getLunch(objectID);
      let response = lunchList;
      res.json(response);
      return;
    }
    const { lunchList, totalNumItem} = await itemDAO.getLunch();
    let response= {
      item : lunchList,
      total_results : totalNumItem,
    };
    res.json(response);
  }
}
