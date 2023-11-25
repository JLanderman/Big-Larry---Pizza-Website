import paletteDAO from '../dao/paletteDAO.js';

const maxAgeMS = 1000 * 60 * 30; // 1000 * 60 * 30 = 30 mins

export default class paletteController {

  /*
   *   Data of the current website colors are grabbed
   *   @return json of the color palette
   */

  static async apiGetCurrentPalette(req, res, next) {
    // console.log(`apiGetCurrentPalette in controller`)
    const { currentPalette } = await paletteDAO.getCurrentPalette();
    let response = {
      palette: currentPalette,
    };
    res.json(response);
  }

  /*
   *   Last 10 palettes of colors used on the website are grabbed
   *   @return json of the last 10 color palettes used
   */
  
  static async apiGetLastTenPalettes(req, res, next) {
    // console.log(`apiGetLastTenPalettes in controller`)
    const { paletteList, totalNumPalettes } = await paletteDAO.getPalettes();
    let response = {
      palettes: paletteList,
      total_results: totalNumPalettes,
    };
    res.json(response);
  }

  /*
   *   Changes to the websites color are made here
   *   @param req.body... contains the name of the palette and the colors used including the current user and token for authentication
   *   @return success/failure
   */
  
  static async apiPutPalette(req, res, next) {
    const name = req.body.name;
    const colorArr = req.body.colorArr;
    const user = req.body.username;
    const auth = req.body.token;

    if (!name) return res.status(400).send("No palette name");
    if (!colorArr) return res.status(400).send("No color chosen");
    if (!user) return res.status(400).send("No user");
    if(!auth)return res.status(400).send("No Token");
    if (colorArr.length !== 8)return res.status(400).send('Color Palette too short');
    // console.log('apiPutPalette: Received data:', name, colorArr);
    let cursor;
      try {
        // Call the DAO method to insert the item into MongoDB
        cursor = await paletteDAO.putPalette(name, colorArr, user, auth);
        if(cursor === 'Unauthorized User'){
          res.status(400).send('Unauthorized User');
        }else if(cursor === 'Invalid Token'){
          res.status(400).send('Invalid Token');
        }else{
          res.status(201).json({ success: true, message: "Palette updated" });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while inserting the item" });
      }
  }
  
};
