import argon2 from 'argon2'
import crypto from 'crypto'
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

    const user = await users.findOne({username: username})
    
    try{ // Find match in db

      if(await argon2.verify(user.password, password)){
        const newPswrdHash = await UserDAO.hashUser(password);
        await users.updateOne({username: username}, {$set: {password: newPswrdHash}});
        return user
      }
    }
    catch (e){
        console.error(
          `Unable to issue the login() find command in userDAO.js, ${e}`
        );
        return;
    };
  }

  static async hashUser(userCredential){
    const newSalt = crypto.randomBytes(16).toString('hex');
    const newHash = await argon2.hash(userCredential, newSalt);
    return newHash;
  }

  static async editUserLogin(username, newUsername, newPassword){
    const newPswrdHash = await UserDAO.hashUser(newPassword)

    let query1, query2;
    query1 = {username: username}
    query2 = {username: newUsername, password: newPswrdHash}

    try{
        await users.updateOne(query1, {$set: query2});
    }catch(e){
      console.error(
        `Unable to issue user edit, ${e}`
      );
      return;
    }
  }
}
