import paletteDAO from '../dao/paletteDAO.js';

const maxAgeMS = 1000 * 60 * 30; // 1000 * 60 * 30 = 30 mins

export default class paletteController {

  static async apiGetCurrentPalette(req, res, next) {
    // console.log(`apiGetCurrentPalette in controller`)
    const { currentPalette } = await paletteDAO.getCurrentPalette();
    let response = {
      palette: currentPalette,
    };
    res.json(response);
  }
  
  static async apiGetLastTenPalettes(req, res, next) {
    // console.log(`apiGetLastTenPalettes in controller`)
    const { paletteList, totalNumPalettes } = await paletteDAO.getPalettes();
    let response = {
      palettes: paletteList,
      total_results: totalNumPalettes,
    };
    res.json(response);
  }
  
  static async apiPutPalette(req, res, next) {
    const name = req.body.name;
    const colorArr = req.body.colorArr;
    // console.log('apiPutPalette: Received data:', name, colorArr);
      try {
        // Call the DAO method to insert the item into MongoDB
        await paletteDAO.putPalette(name, colorArr);
        res.status(201).json({ success: true, message: "Item inserted successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while inserting the item" });
      }
    
  }
  
};
