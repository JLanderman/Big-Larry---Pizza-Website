let users;

export default class UserDAO {
  /*
   *   Database is put into the variable for querying
   */
  static async injectDB(conn) {
    if (users) return;
    users = await conn.db(process.env.ITEM_NS).collection("users");
  }

  static async login(username, password){
    let query = {
        username: username,
        password: password
    };
    
    try{ // Find match in db
      const user = await users.findOne(query) 
      return user;
    } 
    catch (e){
        console.error(
          `Unable to issue the login() find command in userDAO.js, ${e}`
        );
        return;
    };
  }
}
