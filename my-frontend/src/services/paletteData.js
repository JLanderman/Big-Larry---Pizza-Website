import http from "../http-common";


class PaletteService {
    getLatestPalette() {
        return http.get(`/palettes/current`);
    }
    
    getLastTenPalettes() {
        // console.log(`getLastTenPalettes in paletteData.js`)
        return http.get(`/palettes`);
    }
    
    
    async putPaletteFront(name, colorArr, username, token) {
        let res;
        // console.log(`putPaletteFront params (${name}, ${JSON.stringify(colorArr)})`);
        
        try {
            res = await http.post("/palettes/add", {
              name,
              colorArr,
              username: username,
              token: token
            });
      
          // Check if the response contains a 'success' property
          if (res.data && res.data.success) {
            return res.data; // Return the response data
          } else {
            // Return an error response if 'success' is not present
            return { success: false, message: "Palette upload failed" };
          }
        } catch (error) {
          console.error(error);
        }
      }
    
    
};
const paletteServiceInstance = new PaletteService();
export default paletteServiceInstance;
