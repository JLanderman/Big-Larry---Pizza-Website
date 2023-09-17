let item;
let cart;
let lunch;


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

  }

  static async getItem() {
    let query;

    let cursor;

    try {
      cursor = await item.find(query);
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
      cursor = await item.find(DesiredObjectId);
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

  
}
