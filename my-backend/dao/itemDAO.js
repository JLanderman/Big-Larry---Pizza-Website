import {decodeJwt} from 'jose';
let allItems;
let customToppings;
import { ObjectId, MongoClient  } from "mongodb";
//import MongoClient from "../server";
import AWS from 'aws-sdk';
AWS.config.update({accessKeyID: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_REGION});
const s3 = new AWS.S3();

export default class ItemDao {
  /*
   *   database is put into variable items for querying
   */
  static async injectDB(conn) {
    if (allItems) {
      return;
    }
    allItems = await conn.db(process.env.ITEM_NS).collection("allMenuItems");
    
    if(customToppings)
    {
      return;
    }
    customToppings = await conn.db(process.env.ITEM_NS).collection("customToppings");
  }

  /*
   *   Gets all the custom toppings
   *   @return list of custom toppings
   */

  static async getCustomToppingsCollection(){
    return customToppings;
  }

  /*
   *   Retrieves all menu items
   *   @return list of all the menu items
   */

  static async getItem() {
    let query;

    let cursor;

    try {
      cursor = await allItems.find(query);
    } catch (e) {
      console.error(
        `Unable to issue the getItem() find command in itemDAO.js, ${e}`
      );
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await item.countDocuments(query);

    return { itemList, totalNumItem };
  }

  /*
   *   Retrieves all lunch/dinner items
   *   @return list of all lunch/dinner menu items
   */

  static async getLunch() {
    const query = { itemCategory: 'lunch/Dinner' };
    const client = new MongoClient(process.env.ITEM_DB_URI, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const collection = client.db('samsPizza').collection('allMenuItems');
      const results = await collection.find(query).toArray();
  
      // Sort the results based on the custom logic
      results.sort((a, b) => {
        const substringOrder = ['burger','Burger', 'Sandwich','sandwich', 
        'Grilled', 'grilled', 'Dog', 'dog', 'Burrito', 'burrito', 
        'Egg Roll', 'Egg roll', 'egg Roll', 'egg roll', 'Fries', 'fries', 'Fry', 'fry'];
        //These are the 'groups' the api is sorting by. Added extra copies of sorting groups 
        // without caps in case the client ever makes a typo

        const getSubstringIndex = (item) => {
          const itemName = item.name.toLowerCase();
          for (let i = 0; i < substringOrder.length; i++) {
            if (itemName.includes(substringOrder[i].toLowerCase())) {
              return i;
            }
          }
          return substringOrder.length; // If not found, consider it last
        };
  
        return getSubstringIndex(a) - getSubstringIndex(b);
      });
  
      const totalNumItem = results.length;
  
      return { lunchList: results, totalNumItem };
    } catch (e) {
      console.error(`Error in getLunch: ${e}`);
      return { lunchList: [], totalNumItem: 0 };
    } finally {
      client.close();
    }
  }
  

  /*
   *   Retrieves specific item by object id
   *   @param object id
   *   @return item based on object id
   */

  //overloading this function with a variation for getting specific MongoDB "_id"s
  static async getItem(DesiredObjectId) {
    let query;
    let cursor;

    try {
      cursor = await allItems.find(DesiredObjectId); // Shouldn't this be finding the query instead of DesiredObjectID directly?
    } catch (e) {
      console.error(
        `Unable to issue the getItem(id) find command in itemDAO.js, ${e}`
      );
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await allItems.countDocuments(query);

    return { itemList, totalNumItem };
  }


  // Removed: The overloaded function for getting lunch items by ID.
  // This breaks the normal lunch display code.
  // If you need a specific item by ID, consider using the overloaded get item function above since they're all in the same collection.
  // You can probably remove this if it doesn't break anything.

  // static async getLunch(DesiredObjectId)
  // {
    // let query;
    // let cursor;

    // try{
    //   cursor = await allItems.find(DesiredObjectId);
    //   console.log('check2',allItems)
    // }catch(e)
    // {
    //   console.error(
    //     `Unable to issue the getLunchItem find command in lunchDAO.js, ${e}`
    //   );
    //   return {lunchList: [] , totalNumItem: 0}
    // }
    // console.log('check1',allItems)
    // const displayCursor = cursor.limit(100).skip(0);
    // const lunchList = await displayCursor.toArray();
    // const totalNumItem = await allItems.countDocuments(query);
    // console.log('check3',lunchList)
    // console.log('check4',totalNumItem)
    // return { lunchList, totalNumItem};
  // }

  /*
   *   Retrieves all pizza special menu items
   *   @return list of all pizza menu items
   */

  static async getPizzaSpecial() {
    const query = { itemCategory: 'pizzaSpecial' };
    const client = new MongoClient(process.env.ITEM_DB_URI, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const collection = client.db('samsPizza').collection('allMenuItems');
      
      const results = await collection.find(query).toArray();
  
      // Sort the results based on the custom logic
      results.sort((a, b) => {
        const substringOrder = ['eroni'];
        const customSortFieldA = substringOrder.some(substring => a.name.toLowerCase().includes(substring)) ? -1 : 1;
        const customSortFieldB = substringOrder.some(substring => b.name.toLowerCase().includes(substring)) ? -1 : 1;
  
        if (customSortFieldA !== customSortFieldB) {
          return customSortFieldA - customSortFieldB;
        }
  
        if (a.name.toLowerCase().includes('Lets Customize'.toLowerCase())) {
          return 1; // Move 'Lets Customize' to the end
        }
        if (b.name.toLowerCase().includes('Lets Customize'.toLowerCase())) {
          return -1; // Keep 'Lets Customize' at the end
        }
  
        return 0; // No change for other items
      });
  
      const totalNumItem = results.length;
  
      return { itemList: results, totalNumItem };
    } catch (e) {
      console.error(`Error in getPizzaSpecial: ${e}`);
      return { itemList: [], totalNumItem: 0 };
    } finally {
      client.close();
    }
  }
  

  /*
   *   Retrieves all combo special menu items
   *   @return list of all combo special menu items
   */
  static async getComboSpecial() {
    const query = { itemCategory: 'comboSpecial' };
    const client = new MongoClient(process.env.ITEM_DB_URI, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const collection = client.db('samsPizza').collection('allMenuItems');
      const results = await collection.find(query).toArray();
  
      // Separate items into two arrays: with and without expected format
      const itemsWithFormat = [];
      const itemsWithoutFormat = [];
  
      // Sort the results based on the presence of the expected format
      results.forEach(item => {
        const match = item.name.match(/#(\d+)/);
        if (match) {
          // Item with expected format
          item.productNumber = parseInt(match[1]); // Add productNumber for sorting
          itemsWithFormat.push(item);
        } else {
          // Item without expected format
          itemsWithoutFormat.push(item);
        }
      });
  
      // Sort items with expected format by productNumber
      itemsWithFormat.sort((a, b) => a.productNumber - b.productNumber);
  
      // Combine the two arrays
      const finalResults = [...itemsWithFormat, ...itemsWithoutFormat];
  
      return { itemList: finalResults, totalNumItem: finalResults.length };
    } catch (e) {
      console.error(`Error in getComboSpecial: ${e}`);
      return { itemList: [], totalNumItem: 0 };
    } finally {
      client.close();
    }
  }
  
  

  /*
   *   Retrieves all special menu items
   *   @return list of all special menu items
   */

  static async getSpecialDeals() {
    let query;
    query = {itemCategory: {$eq: 'specialDeal'}}
    let cursor;

    try {
      cursor = await allItems.find(query);
    } catch (e) {
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await allItems.countDocuments(query);

    return { itemList, totalNumItem };
  }

  /*
   *   Creates new menu item based on the data recieved from the admin
   *   Necessary information: name, itemCatagory, and some form of price
   *   Price can be int32 or array, or small and large price may be used
   *   Api adapts to info given, will only add what is passed to it into the database
   *   @param Item info that the admin is putting into the website
   *   @return failure if it occured
   */

  // get rid of photo field
  static async putItem(name, itemCategory, subCategory, price, priceLarge, priceSmall, description, photo, photoData, username, token){
    let params;
    if(photoData){
      const newPhotoData = photoData.replace(/^data:image\/\w+;base64,/, "");
      const imageData = new Buffer.from(newPhotoData, 'base64');
      const type = photoData.split(';')[0].split('/')[1];
      const image = photo;

      params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${image}`,
        Body: imageData,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
      }
    }

    try{
      const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

      if(!token || username != tokenUsername.user.username){
        return 'Unauthorized User';
      }
    }catch(e){
      return 'Invalid Token';
    }

    let query= {name: name, itemCategory: itemCategory}; //always have a name and category
    let query2; //used to append new things to the query, allows for easier logic

    //check if new item has a sub category and add if it does appends it
    if(subCategory !== null){
      query2 = Object.assign({}, query, {drinktype: subCategory});   //appends subCategory to query and store it into a new query
      query = query2;
    }

    //check for one price or two price variables
    if(price){
      query2 = Object.assign({}, query, {price: price});
      query = query2;
    } else if(priceLarge && priceSmall){
      query2 = Object.assign({}, query, {price_large: priceLarge, price_small: priceSmall});
      query = query2;
    } else{ console.log("Error: There was no price passed to api, all new items need a price. ")}

    if(description){
      query2 = Object.assign({}, query, {info: description});
      query = query2;
    }
    if(photo){
      query2 = Object.assign({}, query, {photo: photo});
      query = query2;
    }
    
    let cursor;
    try{
      await allItems.insertOne(query); //Insert items to query in database
      const item = await allItems.find(query);
      const displayCursor = item.limit(100).skip(0);
      const itemList = await displayCursor.toArray();
      if(photoData){
        cursor = await s3.upload(params).promise();
      }
      return itemList[0]._id;
    } catch(e){
      return 'Unable to put item';
    }
    
  }

  /*   Removed, above function can handle everything
   *   Creates new menu item based on the data the admin passed
   *   @param Item info that the admin is putting into the website
   *   @return failure if it occured
   */
  /*
  static async putItemTwo(name, itemCategory, photo, priceLarge, priceSmall, username, token){
    const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

    if(!token || username != tokenUsername.user.username){
      console.error(
        'Unauthorized User'
      );
      return;
    }

    let query;
    query = {name: name, itemCategory: itemCategory, price_large: priceLarge, price_small: priceSmall, photo: photo};
    let cursor;
    try{
      cursor = await allItems.insertOne(query); //Insert items to query in database
    } catch(e){
      console.error('Unable to put item');
    }
  }*/

  /*
   *   Retrieves all drink items
   *   @return list of all drink items
   */

  static async getDrink(){
    let query;
    query = {itemCategory: {$eq: 'drink'}}
    let cursor;

    try{
      cursor = await allItems.find(query);
    }catch(e)
    {
      console.error(
        `Unable to issue the getItem() find command in itemDAO.js, ${e}`
      );
      return {itemList: [], totalNumItem: 0};
    }
    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await allItems.countDocuments(query);

    return {itemList, totalNumItem};
  }

  /*
   *   Deletes the specified menu item based on item id
   *   @param id
   *   @return success/failure
   */

  static async deleteItem(_id, username, token){
    try{
      const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

      if(!token || username != tokenUsername.user.username){
        return 'Unauthorized User';
      }
    }catch(e){
      return 'Invalid Token';
    }

    let query;
    query = { _id: new ObjectId(_id) };
    let cursor;

    try{

      cursor = await allItems.deleteOne(query); //Delete item in database based on query
      if (cursor.deletedCount === 1) {
        const image = await allItems.find(query).toArray();
        const deleteImage = image[0].photo;

        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: `${deleteImage}`
        }

        await s3.deleteObject(params).promise();
      } else {
        return 'Item not found'
      }
    } catch(e){
      return `unable to delete item, ${e}`;
    }
  }

  /*
   *   Modifies the specified menu item based on name and category and uses new info to change the item
   *   Necessary information: current and new name, current and new itemCatagory, and some form of price
   *   Price can be int32 or array, or small and large price may be used
   *   Api adapts to info given, will only add what is passed to it into the database
   *   @param name, category of item used to identify item to be removed. All else are used as new info for item
   *   @return failure if it occured
   */

  static async modifyItem(currentName, currentItemCategory, name, itemCategory, SubCat, photo, photoData, price, priceLarge, priceSmall, Description, username, token){
    let params;
    if(photoData){
      const newPhotoData = photoData.replace(/^data:image\/\w+;base64,/, "");
      const imageData = new Buffer.from(newPhotoData, 'base64');
      const type = photoData.split(';')[0].split('/')[1];
      const image = photo;

      params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${image}`,
        Body: imageData,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
      }
    }

    try{
      const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

      if(!token || username != tokenUsername.user.username){
        return 'Unauthorized User';
      }
    }catch(e){
      return 'Invalid Token';
    }

    let query1, query2, query3;
    query1 = {name: currentName, itemCategory: currentItemCategory}; //this finds the correct entry
    query2 = {name: name, itemCategory: itemCategory} //always has new name and new item category
    
    //check if new item has a sub category and add if it does append it to query2
    if(SubCat !== null){
      query3 = Object.assign({}, query2, {drinktype: SubCat});   //appends new element to query2
      query2 = query3;
    }

    //appends the price(s) to the query
    if(price){
      query3 = Object.assign({}, query2, {price: price});
      query2 = query3;
    } else if(priceLarge && priceSmall){
      query3 = Object.assign({}, query2, {price_large: priceLarge, price_small: priceSmall});
      query2 = query3;
    } else{ console.log("Error: There was no price passed to api, all new items need a price. ")}

    if(Description){
      query3 = Object.assign({}, query2, {info: Description});
      query2 = query3;
    }
    if(photo){
      query3 = Object.assign({}, query2, {photo: photo});
      query2 = query3;
    }
    
    let cursor;

    try{
      cursor = await allItems.find(query1).toArray();
      if(cursor[0] !== undefined){
        if(photoData){
          const paramsDelete = {
            Bucket: process.env.S3_BUCKET,
            Key: `${cursor[0].photo}`
          }
          await s3.deleteObject(paramsDelete).promise();
          await s3.upload(params).promise();
        }
        await allItems.updateOne(query1, {$set: query2});  //Modify item in database based on name and category with query2
      }else{
        return 'Item not found. Cannot modify.';
      }
    } catch(e){
      console.error(`unable to modify item, ${e}`)
    }
  }


  /*   Removed, above function can handle everything
   *   Modifies the specified menu item based on name and category and uses new info to change the item
   *   @param name, category of item used to identify item to be removed. All else are used as new info for item
   *   @return failure if it occured
   */
  /*  
  static async modifyItemTwo(currentName, currentItemCategory, name, itemCategory, photo, priceLarge, priceSmall, username, token){
    const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

    if(!token || username != tokenUsername.user.username){
      console.error(
        'Unauthorized User'
      );
      return;
    }

    let query1, query2;
    query1 = {name: currentName, itemCategory: currentItemCategory};
    query2 = {name: name, itemCategory: itemCategory, photo: photo, price_large: priceLarge, price_small: priceSmall};
    let cursor;
    try{
      cursor = await allItems.updateOne(query1, {$set: query2});  //Modify item in database based on name and category with query2
    } catch(e){
      console.error(`unable to modify item, ${e}`)
    }
  }*/

}