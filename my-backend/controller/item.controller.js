import { ObjectId } from "mongodb";
import itemDAO from "../dao/itemDAO.js";
import AWS from "aws-sdk";
import fs from "fs";
AWS.config.update({region: 'us-west-1'})

const s3 = new AWS.S3();

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


  static async apiGetPizzaSpecial(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getPizzaSpecial();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }

  static async apiGetComboSpecial(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getComboSpecial();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }

  static async apiGetSpecialDeals(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getSpecialDeals();
    let response = {
      item: itemList,
      total_results: totalNumItem,

    };
    res.json(response);
  }

  static async apiPutItem(req, res, next){
    const name = req.body.name;
    const itemCategory = req.body.itemCategory;
    const photo = req.body.photo;
    const price = req.body.price;
    // we are putting in a lunch/Dinner item without a photo
    console.log('apiPutitem: Received data:', name, itemCategory, photo, price);
      try {
        // Call the itemDAO.putItem method to insert the item into MongoDB
        await itemDAO.putItem(name, itemCategory, price);
        res.status(201).json({ success: true, message: "Item inserted successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while inserting the item" });
      }
  }
  
  /*static async apiPutItem(req, res, next){
    const name = req.body.name;
    const itemCategory = req.body.itemCategory;
    const photo = req.body.photo;

    if (!name) return res.status(400);
    if (!itemCategory) return res.status(400);
    if (!photo) return res.status(400);

    //const fileData = fs.readFileSync(photo);

    const params = {
      Bucket: 'testingschoolproject',
      //Key: photo,
      //Body: fileData
    };
    //await s3.putObject(params).promise();
      await itemDAO.putItem(name, itemCategory, photo);
  }
  */
}
