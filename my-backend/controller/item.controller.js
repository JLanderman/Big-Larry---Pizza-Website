import { ObjectId } from "mongodb";
import itemDAO from "../dao/itemDAO.js";
import fs from "fs";
//If using AWS statements, make sure to v3 not v2

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

  static async apiGetToppingPrice(req, res, next) {
    const { topping } = req.body;
    console.log('topping:', topping);
    try {
      // Query the 'customToppings' collection based on topping and size
      const customToppings = await itemDAO.getCustomToppingsCollection();

      const customTopping = await customToppings.findOne({topping});
      /* The Database items for the cutom toppings collection is set up like this:
      _id: [OBJECTID]
      topping: [TOPPING NAME]
      price_p: [PERSONAL TOPPING PRICE]
      price_s: [SMALL TOPPING PRICE]
      price_m: [MEDIUMTOPPING PRICE]
      price_l: [LARGE TOPPING PRICE]
      price_xl: [EXTRA LARGE TOPPING PRICE]"*/
      //The current toppings available are: Cheese, topping_1, topping_2, topping_3, comboVeggieAllMeat, xToppingxCheese

      if (customTopping) {
          // Return all price values divided by 100 to the front end
          const {
            price_p,
            price_s,
            price_m,
            price_l,
            price_xl
          } = customTopping;

          // Convert prices to dollars by dividing by 100
          const prices = {
            price_p: `$${(price_p / 100).toFixed(2)}`,
            price_s: `$${(price_s / 100).toFixed(2)}`,
            price_m: `$${(price_m / 100).toFixed(2)}`,
            price_l: `$${(price_l / 100).toFixed(2)}`,
            price_xl: `$${(price_xl / 100).toFixed(2)}`
          };
          res.json(prices);
      } else {
        // Handle the case when the topping is not found
        res.status(404).json({ message: 'Topping not found' });
      }
    } catch (error) {
      // Handle any errors that may occur during the database query
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async apiGetAllToppingsPrices(req, res, next) {
    try {
      const customToppings = await itemDAO.getCustomToppingsCollection();
      const allToppings = await customToppings.find({}).toArray();
  
      // Convert prices to dollars by dividing by 100
      const toppingsWithPrices = allToppings.map(topping => ({
        topping: topping.topping,
        prices: {
          price_p: `$${(topping.price_p / 100).toFixed(2)}`,
          price_s: `$${(topping.price_s / 100).toFixed(2)}`,
          price_m: `$${(topping.price_m / 100).toFixed(2)}`,
          price_l: `$${(topping.price_l / 100).toFixed(2)}`,
          price_xl: `$${(topping.price_xl / 100).toFixed(2)}`
        }
      }));
  
      res.json(toppingsWithPrices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async apiUpdateToppingPrice(req, res, next) {
    const { topping, size, price } = req.body;
    console.log("Received values:", req.body);
  
    try {
      //Turn the dollar amount into a whole integer
      const newPrice = price * 100;
      
      // Update the price for the matching topping in the 'customToppings' collection
      const updateQuery = {
        topping,
      };
      updateQuery[size] = newPrice;
      console.log(newPrice); // You can display success or error messages here

      const customToppings = await itemDAO.getCustomToppingsCollection();

      const result = await customToppings.updateOne(
        { topping },
        { $set: updateQuery }
      );

      if (result.modifiedCount === 1) {
        // Handle success
        res.json({ message: 'Price updated successfully' });
      } else {
        // Handle the case when the topping is not found
        res.status(404).json({ message: 'Topping not found' });
      }
    } catch (error) {
      // Handle any errors that may occur during the update
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } // end apiUpdateCustomTopping


  static async apiPutItem(req, res, next){
    const name = req.body.name;
    const itemCategory = req.body.itemCategory;
    const subCategory = req.body.subCategory;
    const price = req.body.price;
    const description = req.body.description;
    const photo =  req.body.photo;
        // we are putting in a lunch/Dinner item without a photo
    console.log('apiPutitem: Received data:', name, itemCategory, subCategory, price, description, photo);
      try {
        // Call the itemDAO.putItem method to insert the item into MongoDB
        await itemDAO.putItem(name, itemCategory, subCategory, price, description, photo);
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

  static async apiDeleteItem(req, res, next){
    const _id = req.body._id;
    let query;
    console.log('received id:', query);

    try {
      await itemDAO.deleteItem(_id);
      res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      console.error(`Cannot delete item: ${error}`);
      res.status(500).json({ success: false, message: "Error deleting item" });
    }
  }

  static async apiModifyItem(req, res, next){
    const curName = req.body.curName;
    const curItemCat = req.body.curItemCat;
    const name = req.body.name;
    const itemCategory = req.body.itemCategory;
    const photo = req.body.photo;
    const price = req.body.price;
    const priceLarge = req.body.price_large;
    const priceSmall = req.body.price_small;
      try {
        if(!priceLarge && !priceSmall){
          itemDAO.modifyItem(curName, curItemCat, name, itemCategory, photo, price);  //Modify item that only has one price
          res.status(200).json({ success: true, message: "Item modified successfully with one price" });
          return res;
        }else{
          itemDAO.modifyItemTwo(curName, curItemCat, name, itemCategory, photo, priceLarge, priceSmall); //Modify item that has two prices (large/small)
          res.status(200).json({ success: true, message: "Item modified successfully with two prices" });
          return res;
        }
      } catch (error) {
        console.error(`Cannot modify item, ${e}`)
      }
  }

  static async apiGetDrink(req, res, next)
  {
    const { itemList, totalNumItem} = await itemDAO.getDrink();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }
}
