let item;
let cart;
let lunch;
let allItems;


export default class ItemDao {
  /*
   *   database is put into the variable item for querying
   */
  static async injectDB(conn) {
    if (item) {
      return;
    }
    item = await conn.db(process.env.ITEM_NS).collection("menuItems");

    if (cart) {
      return;
    }
    cart = await conn.db(process.env.ITEM_NS).collection("cartItems");

 
    if(lunch)
    {
      return;
    }
    lunch = await conn.db(process.env.ITEM_NS).collection("lunchItems");

    if (allItems) {
      return;
    }
    allItems = await conn.db(process.env.ITEM_NS).collection("allMenuItems");
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

  static async getCart() {
    let query;

    let cursor;

    try {
      cursor = await cart.find(query);
    } catch (e) {
      console.error(
        `Unable to issue the getCart find command in cartDAO.js, ${e}`
      );
      return { cartList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const cartList = await displayCursor.toArray();
    const totalNumItem = await cart.countDocuments(query);

    return { cartList, totalNumItem };
  }


  static async getLunch()
  {
    let query;
    
    let cursor;

    try
    {
      cursor = await lunch.find(query);
    }catch (e)
    {
      console.error(
        `Unable to issue the getLunchItem find command in lunchDAO.js, ${e}`
      );
      return {lunchList: [], totalNumItem: 0 }; 
    }

    const displayCursor = cursor.limit(100).skip(0);
    const luchList = await displayCursor.toArray();
    const totalNumItem = await lunch.countDocuments(query);

    return {luchList, totalNumItem};

  }





  //overloading this function with a variation for getting specific MongoDB "_id"s
  static async getItem(DesiredObjectId) {
    let query;
    let cursor;

    try {
      cursor = await allItems.find(DesiredObjectId);
    } catch (e) {
      console.error(
        `Unable to issue the getItem(id) find command in itemDAO.js, ${e}`
      );
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await item.countDocuments(query);

    return { itemList, totalNumItem };
  }

  static async getCart(DesiredObjectId) {
    let query;
    let cursor;

    try {
      cursor = await cart.find(DesiredObjectId);
    } catch (e) {
      console.error(
        `Unable to issue the getCart find command in cartDAO.js, ${e}`
      );
      return { cartList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const cartList = await displayCursor.toArray();
    const totalNumItem = await cart.countDocuments(query);

    return { cartList, totalNumItem };
  }

  static async getLunch(DesiredObjectId)
  {
    let query;
    let cursor;

    try{
      cursor = await lunch.find(DesiredObjectId);
      console.log('check2',lunch)
    }catch(e)
    {
      console.error(
        `Unable to issue the getLunchItem find command in lunchDAO.js, ${e}`
      );
      return {lunchList: [] , totalNumItem: 0}
    }
    console.log('check1',lunch)
    const displayCursor = cursor.limit(100).skip(0);
    const lunchList = await displayCursor.toArray();
    const totalNumItem = await lunch.countDocuments(query);
    console.log('check3',lunchList)
    console.log('check4',totalNumItem)
    return { lunchList, totalNumItem};
  }

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

  static async putItem(name, itemCategory, photo, price){
    console.log('itemDAO.js putItem Received data:', name, itemCategory, photo, price);
    let query;
    query = {name: name, itemCategory: itemCategory, price: price};
    let cursor;
    try{
      cursor = await allItems.insertOne(query);
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

}
