import { ObjectId } from "mongodb";
import itemDAO from "../dao/itemDAO.js";
import fs from "fs";
import {decodeJwt} from 'jose';
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
        return res.status(400).send("Invalid Object ID");
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

  /*
   *   item from the lunch/Dinner menu section is grabbed
   *   @return list of lunch/dinner items and total num of lunch/dinner items
   */

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

  /*
   *   item from the pizza menu section is grabbed
   *   @return list of pizza items and total num of pizza items
   */

  static async apiGetPizzaSpecial(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getPizzaSpecial();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }

  /*
   *   item from the comboSecials menu section is grabbed
   *   @return list of comboSpecial items and total num of comboSpecial items
   */

  static async apiGetComboSpecial(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getComboSpecial();
    let response = {
      item: itemList,
      total_results: totalNumItem,
    };
    res.json(response);
  }

  /*
   *   item from the specialDeals menu section is grabbed
   *   @return list of specialDeal items and total num of specialDeal items
   */

  static async apiGetSpecialDeals(req, res, next) {
    const { itemList, totalNumItem } = await itemDAO.getSpecialDeals();
    let response = {
      item: itemList,
      total_results: totalNumItem,

    };
    res.json(response);
  }

  /*
   *   The price of the topping recieved is calculated for user to view
   *   @param req.body recieves the users topping input
   *   @return price of the specified topping
   */

  static async apiGetToppingPrice(req, res, next) {
    const { topping } = req.body;
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

  /*
   *   The price of all the pizza toppings are retrieved
   *   @return price of all the toppings
   */

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
  
      res.status(200).json(toppingsWithPrices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /*
   *   Topping price is updated to a new price
   *   @param req.body recieves the users topping, size, and price input to change to the price of the topping and the users name and token for authentication
   *   @return json message the shows it was a success
   */

  static async apiUpdateToppingPrice(req, res, next) {
    const { topping, size, price, username, token} = req.body;
    if (!topping) return res.status(400).send("No topping selected");
    if (!size) return res.status(400).send("No size selected");
    if (!price) return res.status(400).send("No price selected");
    if (!username) return res.status(400).send("No User");
    if (!token) return res.status(400).send("No Token");
    if(size != 'price_p' && size != 'price_s' && size != 'price_m' && size != 'price_l' && size != 'price_xl'){
      return res.status(400).send("No such size");
    }
    
    try {
      try{
        const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);
        if(!token || username != tokenUsername.user.username){
          console.error(
            'Unauthorized User'
          );
          return res.status(400).send('Unauthorized User');
        }
      }catch(e){
        console.error(
          `Unable to issue topping update, ${e}`
        );
        return res.status(400).send('Invalid Token');
      }
  
      //Turn the dollar amount into a whole integer
      const newPrice = price * 100;
      
      // Update the price for the matching topping in the 'customToppings' collection
      const updateQuery = {
        topping,
      };
      updateQuery[size] = newPrice;

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

   /*
   *   Creates a new menu item for the website based on details
   *   @param req.body... recieves the users item data that they want to put into the website and the users name and token for authentication
   *   @return json message stating if it was a success
   */

  static async apiPutItem(req, res, next){
    const name = req.body.newName;
    const itemCategory = req.body.newItemCat;
    const subCategory = req.body.newSubCat;
    const price = req.body.newPrice;
    const priceLarge = req.body.price_large;
    const priceSmall = req.body.price_small;
    const description = req.body.newDescription;
    const photo =  req.body.newPhoto;
    const user = req.body.username;
    const auth = req.body.token;

    if (!user) return res.status(400).send("No username");
    if(!auth)return res.status(400).send("No Token");

        // we are putting in a lunch/Dinner item without a photo
      console.log('apiPutitem: Received data:', name, itemCategory, subCategory, price, priceLarge, priceSmall, description, photo);
      try {
        // Call the itemDAO.putItem method to insert the item into MongoDB
        const id = await itemDAO.putItem(name, itemCategory, subCategory, price, priceLarge, priceSmall, description, photo, user, auth);
        if(id === 'Invalid Token'){
          res.status(400).send('Invalid Token');
        }else if(id === 'Unauthorized User'){
          res.status(400).send('Unauthorized User');
        }else{
          res.status(201).json({ success: true, message: "Item inserted successfully" , itemID: id});
        }
      } catch (error) {
        console.error(`Error, ${error}`);
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

  /*
   *   Deletes the specified item from the website using item id
   *   @param req.body... recieves the users name and token for authentication and id for the item
   *   @return json success/fail message
   */

  static async apiDeleteItem(req, res, next){
    const _id = req.body._id;
    const auth = req.body.token;
    const user = req.body.username;

    if (!user)return res.status(400).send("No username");
    if(!auth)return res.status(400).send("No Token");
    if(!_id)return res.status(400).send("No object id");

    try {
      const respond = await itemDAO.deleteItem(_id, user, auth);
      if(respond === 'Invalid Token'){
        res.status(400).send('Invalid Token');
      }else if(respond === 'Unauthorized User'){
        res.status(400).send('Unauthorized User');
      }else if(respond === 'Item not found'){
        res.status(400).send('Item not found');
      }else{
        res.status(200).json({ success: true, message: "Item deleted successfully" });
      }
    } catch (error) {
      console.error(`Cannot delete item: ${error}`);
      res.status(500).json({ success: false, message: "Error deleting item" });
    }
  }

  /*
   *   Modifies a selected menu item for the website based on details
   *   @param req.body... recieves the users item data that they want to modify into the website and the users name and token for authentication
   *   @return json message stating if it was a success
   */

  static async apiModifyItem(req, res, next){
    const curName = req.body.curName;
    const curItemCat = req.body.curItemCat;
    const newName = req.body.newName;
    const newItemCat = req.body.newItemCat;
    const newSubCat = req.body.newSubCat;
    const newPhoto = req.body.newPhoto;
    const price = req.body.newPrice;
    const priceLarge = req.body.price_large;
    const priceSmall = req.body.price_small;
    const Description = req.body.newDescription;
    const user = req.body.username;
    const auth = req.body.token;

    if((price && priceLarge) || (price && priceSmall) || (price && priceLarge && priceSmall)){
      return res.status(400).send("Price error");
    }
    if (!user) return res.status(400).send("No username");
    if(!auth)return res.status(400).send("No Token");

   /* console.log('Current Name:', curName);      //console logs for testing
    console.log('Current itemCategory:', curItemCat);
    console.log('New Name:', newName);
    console.log('New itemCategory:', newItemCat);
    console.log('newPhoto:', newPhoto);
    console.log('newPrice:', price);
    console.log('newPriceLarge:', priceLarge);
    console.log('newPriceSmall:', priceSmall);
    console.log('Description:', Description);
  */
    try{
      const respond = await itemDAO.modifyItem(curName, curItemCat, newName, newItemCat, newSubCat, newPhoto, price, priceLarge, priceSmall, Description, user, auth);
      if(respond === 'Invalid Token'){
        res.status(400).send('Invalid Token');
      }else if(respond === 'Unauthorized User'){
        res.status(400).send('Unauthorized User');
      }else if(respond === 'Item not found. Cannot modify.'){
        res.status(400).send('Item not found. Cannot modify.');
      }else{
        res.status(200).json({ success: true, message: "Item modified successfully" });
      }
    } catch (error){
      console.error(`Cannot modify item, ${error}`)
    }
  }

  /*
   *   item from the drink menu section is grabbed
   *   @return list of drink items and total num of drink items
   */

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
