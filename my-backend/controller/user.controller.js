import UserDAO from '../dao/UserDAO.js';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
const maxAgeMS = 1000 * 60 * 30; // 1000 * 60 * 30 = 30 mins

export default class UserController {
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

  static async apiGetUserbyToken(req, res, next){
    try{
      let signedToken = req.body.token;
      const verified = await decodeJwt(signedToken, process.env.JWT_SECRET);
      res.status(200).json({username: verified.user.username});
      return res;
    } catch(e) {
      console.error(`Token failed, ${e}`)
    }
  }

  static async apiEditUser(req, res){
    const username = req.body.username;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;

    if (!username) return res.status(400);
    if (!newUsername) return res.status(400);
    if (!newPassword) return res.status(400);


    try{
      await UserDAO.editUserLogin(username, newUsername, newPassword); //attempt to edit user login
      console.log('Change Success')
    }catch(e){
      console.error(`Failed to edit user in user controller, ${e}`);
    }
  }
};
