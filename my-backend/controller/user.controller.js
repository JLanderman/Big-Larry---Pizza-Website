import UserDAO from '../dao/UserDAO.js';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
const maxAgeMS = 1000 * 60 * 30; // 1000 * 60 * 30 = 30 mins

export default class UserController {

  /*
   *   Creates token for the admin logging in
   *   @param user recieves the user that needs to have the token signed to
   *   @return signed token
   */

  static createToken = async (user) => { // create and return new JSON Web Token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';
    const now = new Date().getTime(); // current time, in ms, since 1/1/1970, UTC
    const jwt = await new SignJWT({ user })
      .setProtectedHeader({ alg })
      .setIssuedAt(now)
      .setExpirationTime(now + maxAgeMS)
      .sign(secret);
    return jwt;
  };

  /*
   *   Creates token for the admin logging in
   *   @param req.body... recieves the user name and password to sign into admin part of website
   *   @return user data
   */

  static async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) return res.status(400).send("A username is required.");
    if (!password) return res.status(400).send("A password is required.");

    try {
      const user = await UserDAO.login(username, password); // attempt login
      if (!user) return res.status(401).send("Access denied. Could not authenticate user.");

      const data = { // user data from DB
        username: user.username,
        isAdmin: user.isAdmin
      }

      const jwt = await UserController.createToken(data); // sign token
      res.status(200).json({token: jwt});
      return res;
    } catch (e) { 
      console.error(`Failed to login user in user controller, ${e}`)
    };
  };

  /*
   *   Recieves the token from the user
   *   @param req.body.token recieves the signed token for processing
   *   @return username of user
   */

  static async apiGetUserbyToken(req, res, next){
    try{
      let signedToken = req.body.token;
      const verified = await decodeJwt(signedToken, process.env.JWT_SECRET);
      res.status(200).json({username: verified.user.username});
      return res;
    } catch(e) {
      console.error(`Token failed, ${e}`)
      res.status(400).send("Token Failed")
    }
  }

  /*
   *   Edits the selected user
   *   @param req.body... recieves the current user, token, and the new username/password for authentication and changing user info
   *   @return success/failure
   */

  static async apiEditUser(req, res){
    const username = req.body.username;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    const auth = req.body.token;

    if (!username) return res.status(400).send("No username");
    if (!newUsername) return res.status(400).send("No username");
    if (!newPassword) return res.status(400).send("No password");
    if(!auth)return res.status(400).send("No Token");

    try{
      const checkSuccess = await UserDAO.editUserLogin(username, newUsername, newPassword, auth); //attempt to edit user login
      if(checkSuccess === "Unauthorized User"){
        res.status(400).send("Unauthorized User");
      }else if(checkSuccess === "Invalid Token"){
        res.status(400).send("Invalid Token");
      }else if(checkSuccess === "Change Success"){
        res.status(200).send("Change Success");
      }else{
        res.status(400).send("Change Error");
      }
    }catch(e){
      console.error(`Failed to edit user in user controller, ${e}`);
    }
  }
};
