let allItems;
let customToppings;
import { ObjectId } from "mongodb";



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

  static async getLunch()
  {
    let query;
    query = {itemCategory: "lunch/Dinner"};
    let cursor;

    try
    {
      cursor = await allItems.find(query);
    }catch (e)
    {
      console.error(
        `Unable to issue the getLunchItem find command in lunchDAO.js, ${e}`
      );
      return {lunchList: [], totalNumItem: 0 }; 
    }

    const displayCursor = cursor.limit(100).skip(0);
    const lunchList = await displayCursor.toArray();
    const totalNumItem = await allItems.countDocuments(query);

    return {lunchList, totalNumItem};

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
    let query;
    query = {itemCategory: {$eq: 'pizzaSpecial'}}
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

  static async getComboSpecial() {
    let query;
    query = {itemCategory: {$eq: 'comboSpecial'}}
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
