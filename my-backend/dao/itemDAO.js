let item;

export default class ItemDao {
  /*
   *   database is put into the variable item for querying
   */
  static async injectDB(conn) {
    if (item) {
      return;
    }
    item = await conn.db(process.env.ITEM_NS).collection("menuItems");
  }

  static async getItem() {
    let query;

    let cursor;

    try {
      cursor = await item.find(query);
    } catch (e) {
      console.error(`Unable to issue find command in itemDAO.js, ${e}`);
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await item.countDocuments(query);

    return { itemList, totalNumItem };
  }

  //overloading this function with a variation for getting specific MongoDB "_id"s
  static async getItem(DesiredObjectId) {
    let query;
    let cursor;

    try {
      cursor = await item.find(DesiredObjectId);
    } catch (e) {
      console.error(`Unable to issue find command in itemDAO.js, ${e}`);
      return { itemList: [], totalNumItem: 0 };
    }

    const displayCursor = cursor.limit(100).skip(0);
    const itemList = await displayCursor.toArray();
    const totalNumItem = await item.countDocuments(query);

    return { itemList, totalNumItem };
  }
}
