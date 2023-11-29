import argon2 from 'argon2'
import crypto from 'crypto'
import {decodeJwt} from 'jose';
let users;

export default class UserDAO {
  /*
   *   Database is put into the variable for querying
   */
  static async injectDB(conn) {
    if (users) return;
    users = await conn.db(process.env.ITEM_NS).collection("users");
  }

  /*
   *   Verify username and password for logging in. Rehash password for security
   *   @param username and password used for verifying credentials access
   *   @return user logging in or failure
   */

  static async login(username, password){

    const user = await users.findOne({username: username})
    
    try{ // Find match in db
      if(!user){
        return user;
      }else if(await argon2.verify(user.password, password)){
        const newPswrdHash = await UserDAO.hashUser(password);
        await users.updateOne({username: username}, {$set: {password: newPswrdHash}});
        return user;
      }
    }
    catch (e){
        console.error(
          `Unable to issue the login() find command in userDAO.js, ${e}`
        );
        return;
    };
  }

  /*
   *   Hashes the users password
   *   @param user password
   *   @return hash of user password
   */

  static async hashUser(userCredential){
    const newSalt = crypto.randomBytes(16).toString('hex');
    const newHash = await argon2.hash(userCredential, newSalt);
    return newHash;
  }

  /*
   *   Edits the user based on user data (username or password)
   *   @param username used for identifying user. newUsername/password used as replacement info
   *   @return success or failure
   */

  static async editUserLogin(username, newUsername, newPassword, token){
    try{
      const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);

      if(!token || username != tokenUsername.user.username){
        return 'Unauthorized User';
      }
    }catch(e){
      return 'Invalid Token';
    }

    const curUser = await users.findOne({username: username});
    if(!newUsername){
      newUsername = curUser.username;
    }

    if(!newPassword){
      newPassword = curUser.password;
    }

    const newPswrdHash = await UserDAO.hashUser(newPassword)

    let query1, query2;
    query1 = {username: username}
    query2 = {username: newUsername, password: newPswrdHash}

    try{

        await users.updateOne(query1, {$set: query2});
        return 'Change Success';
    }catch(e){
      console.error(
        `Unable to issue user edit, ${e}`
      );
      return true;
    }
  }
}
