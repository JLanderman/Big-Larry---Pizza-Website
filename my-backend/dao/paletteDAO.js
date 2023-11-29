import {decodeJwt} from 'jose';
let savedPalettes;

export default class PaletteDao {

    /*
   *   Currently saved color palettes are injected into a variable from the database
   */

    static async injectDB(conn) {
        if (savedPalettes) {
          return;
        }
        savedPalettes = await conn.db(process.env.ITEM_NS).collection("customPalettes");
    }

    /*
   *   Returns the current color palette of the website
   *   @return current color paletter of website
   */
    
    static async getCurrentPalette() {
        let query, cursor;
        // console.log(`getCurrentPalette in DAO`)
        try {
            cursor = await savedPalettes.find(query);
        } catch (e) {
            console.error(
                `Unable to issue the getCurrentPalette() find command in paletteDAO.js, ${e}`
            );
            return { currentPalette: [] };
        }
        //sorting by id desc since mongodb id has datetime built in
        const displayCursor = cursor.limit(1).skip(0).sort({_id:-1});
        const currentPalette = await displayCursor.toArray();
        // console.log(`currentPalette = ${currentPalette}`)
        return { currentPalette };
    }

    /*
   *   Retrieves all color palettes saved in database
   *   @return all saved color palettes
   */
      
    static async getPalettes() {
        let query, cursor;
        try {
            cursor = await savedPalettes.find(query);
        } catch (e) {
            console.error(
                `Unable to issue the getPalette() find command in paletteDAO.js, ${e}`
            );
            return { paletteList: [], totalNumPalettes: 0 };
        }
        const displayCursor = cursor.limit(10).skip(0).sort({_id:-1});
        
        const paletteList = await displayCursor.toArray();
        const totalNumPalettes = await savedPalettes.countDocuments(query);
        // console.log(`paletteList = ${paletteList}, totalNumPalettes = ${totalNumPalettes}`)
        return { paletteList, totalNumPalettes };
    }
    
    /*
   *   Color palette is implemented onto the website and stored in database
   *   @return fail
   */
    
    static async putPalette(paletteName, colorArr, username, token) {
        try{
            const tokenUsername = await decodeJwt(token, process.env.JWT_SECRET);
      
            if(!token || username != tokenUsername.user.username){
              return 'Unauthorized User';
            }
          }catch(e){
            return 'Invalid Token';
          }

        // console.log('paletteDAO.js putPalette Received data:', paletteName, colorArr);
        let query, cursor;
        query = {name: paletteName, colorArr: colorArr};
        try{
            cursor = await savedPalettes.insertOne(query);
        } catch(e) {
            console.error('Unable to put palette');
        }
    }

}
