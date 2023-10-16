import http from "../http-common";

// This file is where all the API requests go.

class DataService {
    getAll(){
        return http.get(`/items`);
    }

    getAllCart(){
        return http.get(`/cartItems`);
    }

    getAllLunch()
    {
        return http.get(`/lunchItems`);
    }

    getPizzaSpecial(){
        return http.get('/pizzaSpecial');
    }

    getComboSpecial(){
        return http.get('/comboSpecial');
    }

    getSpecialDeals(){
        return http.get('/specialDeals');

    }

    getCustomToppings(topping){
      return http.post(`/customToppings`, {topping}); 
      // Pass the topping as a query parameter
      //The current toppings available are: Cheese, topping_1, topping_2, topping_3, comboVeggieAllMeat, xToppingxCheese
      //Outputs all price data from a given topping category
    }

    updateCustomToppingPrice(topping, size, price){
      return http.post(`/customToppings/update`, {topping, size, price}); 
      // Pass the topping, size, and price as a query parameter
      //The current toppings available are: Cheese, topping_1, topping_2, topping_3, comboVeggieAllMeat, xToppingxCheese
      //The current sizes are price_p, price_s, price_m, price_l, price_xl

      //Assuming the new price is being passed in in the format of X.XX; 
      //i.e. a dollar amount.The api will handle turning it into an integer
    }

    async putItemFront(formData) {
      let res;
      const name = formData.get('name');
      const itemCategory = formData.get('itemCategory');
      const photo = formData.get('photo');
      const price = formData.get('price');

      console.log('Name:', formData.get('name'));
      console.log('itemCategory:', formData.get('itemCategory'));
      console.log('subCategory:', formData.get('subCategory'));
      console.log('price:', formData.get('price'));
      console.log('photo:', formData.get('photo'));
      
      try {
          res = await http.post("/allItems", {
            name,
            itemCategory,
            price,
          });

    
        // Check if the response contains a 'success' property
        if (res.data && res.data.success) {
          return res.data; // Return the response data
        } else {
          // Return an error response if 'success' is not present
          return { success: false, message: "Item upload failed" };
        }
      } catch (error) {
        console.error("Error:", error);
        throw { success: false, message: "An error occurred while making the API request" };
      }
    }
    /*
    // works with dummy data on uploadText
    async putItemFront(formData) {
      const name = formData.get('name');
      const itemCategory = formData.get('itemCategory');
      const photo = formData.get('photo');
      
      try {
        const res = await http.post("/allItems", {
          name,
          itemCategory,
          photo,
        });
    
        // Check if the response contains a 'success' property
        if (res.data && res.data.success) {
          return res.data; // Return the response data
        } else {
          // Return an error response if 'success' is not present
          return { success: false, message: "Item upload failed" };
        }
      } catch (error) {
        console.error("Error:", error);
        throw { success: false, message: "An error occurred while making the API request" };
      }
    }
    */
    getAllDrink(){
        return http.get('/drink');
    }
    
};

export default new DataService();