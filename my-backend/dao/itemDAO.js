let allItems;
let customToppings;
import { ObjectId, MongoClient  } from "mongodb";
//import MongoClient from "../server";



export default class ItemDao {
  /*
   *   database is put into the variable item for querying
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

  static async getCustomToppingsCollection(){
    return customToppings;
  }

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

  static async getPizzaSpecial() {
    const query = { itemCategory: 'pizzaSpecial' };
    const customSortField = 'Lets Customize'; // Specify the item name to move to the end
    const client = new MongoClient(process.env.ITEM_DB_URI, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const collection = client.db('samsPizza').collection('allMenuItems');
      
      // Use the aggregation framework to add a custom sort field
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            customSortField: {
              $cond: {
                if: { $eq: ['$name', customSortField] },
                then: 1, // Set a value that moves it to the end
                else: 0,
              },
            },
          },
        },
        { $sort: { customSortField: 1 } }, // Sort by customSortField in ascending order
      ];
  
      const results = await collection.aggregate(pipeline).toArray();
      const totalNumItem = results.length;
  
      return { itemList: results, totalNumItem };
    } catch (e) {
      console.error(`Error in getPizzaSpecial: ${e}`);
      return { itemList: [], totalNumItem: 0 };
    } finally {
      client.close();
    }
  }
  
  

  static async getComboSpecial() {
    const query = { itemCategory: 'comboSpecial' };
    const client = new MongoClient(process.env.ITEM_DB_URI, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      const collection = client.db('samsPizza').collection('allMenuItems');
      const results = await collection.find(query).toArray();
  
      // Sort the results based on the productNumber
      results.sort((a, b) => {
        const numberA = parseInt(a.name.match(/#(\d+)/)[1]);
        const numberB = parseInt(b.name.match(/#(\d+)/)[1]);
        return numberA - numberB;
      });
  
      return { itemList: results, totalNumItem: results.length };
    } catch (e) {
      console.error(`Error in getComboSpecial: ${e}`);
      return { itemList: [], totalNumItem: 0 };
    } finally {
      client.close();
    }
  }
  

  static async getSpecialDeals() {
    let query;
    query = {itemCategory: {$eq: 'specialDeal'}}
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
    const totalNumItem = await allItems.countDocuments(query);

    return { itemList, totalNumItem };
  }

  // get rid of photo field
  static async putItem(name, itemCategory, subCategory, price, description, photo){
    console.log('itemDAO.js putItem Received data:', name, itemCategory, subCategory, price, description, photo);
    let query;
    if(itemCategory === 'lunch/Dinner'){
      query = {name: name, itemCategory: itemCategory, price: price};
    }
    else if(itemCategory === 'drink'){
      query = {name: name, itemCategory: itemCategory, subCategory: subCategory, price: price};
    }
    // pizza special category
    else{
      query = {name: name, itemCategory: itemCategory, price: price, description: description, photo: photo};
    }
    
    let cursor;
    try{
      cursor = await allItems.insertOne(query); //Insert items to query in database
    } catch(e){
      console.error('Unable to put item');
    }
  }

  static async putItemTwo(name, itemCategory, photo, priceLarge, priceSmall){
    let query;
    query = {name: name, itemCategory: itemCategory, price_large: priceLarge, price_small: priceSmall, photo: photo};
    let cursor;
    try{
      cursor = await allItems.insertOne(query); //Insert items to query in database
    } catch(e){
      console.error('Unable to put item');
    }
  }

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

  static async deleteItem(_id){
    let query;
    query = { _id: new ObjectId(_id) };    let cursor;
    try{
      cursor = await allItems.deleteOne(query); //Delete item in database based on query
      if (cursor.deletedCount === 1) {
        console.log('Item deleted successfully');
      } else {
        console.log('Item not found');
      }
    } catch(e){
      console.error(`unable to delete item, ${e}`)
    }
  }

  static async modifyItem(currentName, currentItemCategory, name, itemCategory, photo, price){
    let query1, query2;
    query1 = {name: currentName, itemCategory: currentItemCategory};
    query2 = {name: name, itemCategory: itemCategory, photo: photo, price: price};
    let cursor;
    try{
      cursor = await allItems.updateOne(query1, {$set: query2});  //Modify item in database based on name and category with query2
    } catch(e){
      console.error(`unable to modify item, ${e}`)
    }
  }

  static async modifyItemTwo(currentName, currentItemCategory, name, itemCategory, photo, priceLarge, priceSmall){
    let query1, query2;
    query1 = {name: currentName, itemCategory: currentItemCategory};
    query2 = {name: name, itemCategory: itemCategory, photo: photo, price_large: priceLarge, price_small: priceSmall};
    let cursor;
    try{
      cursor = await allItems.updateOne(query1, {$set: query2});  //Modify item in database based on name and category with query2
    } catch(e){
      console.error(`unable to modify item, ${e}`)
    }
  }

}
