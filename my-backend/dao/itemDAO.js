let item

export default class ItemDao{

    /*
    *   database is put into the variable item for querying
    */
    static async injectDB(conn){
        if(item){
            return
        }
        item = await conn.db(process.env.ITEM_NS).collection("menuItems")
    }

    /*
    *   items are listed and the total number of items in the database are outputted
    */
    static async getItem(){
        let query
        let cursor

        cursor = await item.find(query)
        const displayCursor = cursor.limit(100).skip(0)
        const itemList = await displayCursor.toArray()
        const totalNumItem = await item.countDocuments(query)

        return {itemList, totalNumItem}
    }
}