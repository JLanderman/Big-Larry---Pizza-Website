import http from "../http-common";

// This file is where all the API requests go.

class DataService {
  getAll() {
    return http.get(`/items`);
  }

  getItemById(id) {
    return http.get(`/items?_id=${id}`)
  }

  getAllLunch() {
    return http.get(`/lunchItems`);
  }

  getPizzaSpecial() {
    return http.get('/pizzaSpecial');
  }

  getComboSpecial() {
    return http.get('/comboSpecial');
  }

  getSpecialDeals() {
    return http.get('/specialDeals');

  }

  getCustomToppings(topping) {
    return http.post(`/customToppings`, { topping });
    // Pass the topping as a query parameter
    //The current toppings available are: Cheese, topping_1, topping_2, topping_3, comboVeggieAllMeat, xToppingxCheese
    //Outputs all price data from a given topping category
  }

  updateCustomToppingPrice(topping, size, price, username, token) {
    return http.post(`/customToppings/update`, { topping, size, price, username: username, token: token });
    // Pass the topping, size, and price as a query parameter
    //The current toppings available are: Cheese, topping_1, topping_2, topping_3, comboVeggieAllMeat, xToppingxCheese
    //The current sizes are price_p, price_s, price_m, price_l, price_xl

    //Assuming the new price is being passed in in the format of X.XX; 
    //i.e. a dollar amount.The api will handle turning it into an integer
  }

  getAllToppingsPrices = async () => {
    try {
      const response = await http.get('/allToppingsPrices');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  async deleteItem(_id, username, token) {
    try{
      const response = await http.post('/allItems/deleteItem', { _id, username: username, token: token });
      return response;
    } catch (error){
      console.error(error);
    }
  }

  getAllDrink = async () => {
    try{
    const response = await http.get('/drink');
    return response;
    } catch (error) {
      console.error(error);
    }
  };

  async updateItem(formData, base64String) {
    console.log("In itemData updateItem. formData:", formData);
    let res;
    let newPrice, newSubCat, rawPrice;
    const curName = formData.get('currName');  //needed for finding item in database
    const curItemCat = formData.get('currCat');    //needed for finding item in database
    const newName = formData.get('newName');
    const newItemCat = formData.get('newCat');
    const newPhoto = formData.get('newPhoto');
    const newPhotoData = base64String;
    const price_large = formData.get('price_large');
    const price_small = formData.get('price_small');
    const username = formData.get('user');
    const token = formData.get('token');
    const newDescription = formData.get('description') === '' ? null : formData.get('description'); //if description is empty, set to null

    //formdata  converts all entries to strings, so here we are reassigning a propper null value if necessary
    if (formData.get('subCategory') === 'null') {
      newSubCat = null;
    } else {
      newSubCat = formData.get('subCategory');
    }
    
    if (newItemCat === "drink" && newSubCat !== "Ice Cream  &  Other") {
      rawPrice = formData.get('price').split(',');
      // Clean up each element in the array
      newPrice = rawPrice.map((price) =>
        price.replace(/[[\]"\s]/g, '')
      );
    } else if (newSubCat === "Ice Cream  &  Other") {
      rawPrice = formData.get('price');
        // Clean up
      newPrice = rawPrice.replace(/[[\]"\s]/g, '');
    } else {
      newPrice = formData.get('newPrice');
    }
    console.log("Price: " + newPrice);
    /* logs for testing 
    console.log('Current Name:', curName);  //logs for testing
    console.log('Current itemCategory:', curItemCat);
    console.log('New Name:', newName);
    console.log('New itemCategory:', newItemCat);
    console.log('newPhoto:', newPhoto);
    console.log('newPrice:', newPrice);
    console.log('newPriceLarge:', price_large);
    console.log('newPriceSmall:', price_small);
    console.log('Description:', newDescription);*/

    try {
      res = await http.post("/allItems/updateItem", {      //call to api
        curName,
        curItemCat,
        newName,
        newItemCat,
        newSubCat,
        newPhoto,
        newPhotoData,
        newPrice,
        price_large,
        price_small,
        newDescription,
        username: username,
        token: token
      });


      // Check if the response contains a 'success' property
      if (res.data && res.data.success) {
        return res.data; // Return the response data
      } else {
        // Return an error response if 'success' is not present
        return { success: false, message: "Item upload failed" };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createItem(formData, base64String) {  //still testing

    let res;
    let newPrice, newSubCat, rawPrice;
    const newName = formData.get('newName');
    const newItemCat = formData.get('newCat');
    const newPhoto = formData.get('newPhoto');
    const newPhotoData = base64String;
    const price_large = formData.get('price_large');
    const price_small = formData.get('price_small');
    const newDescription = formData.get('description');
    const username = formData.get('user');
    const token = formData.get('token');
    console.log("Create Item / Item Data:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    //formdata  converts all entries to strings, so here we are reassigning a propper null value if necessary
    if (formData.get('subCategory') === 'null') {
      newSubCat = null;
    } else {
      newSubCat = formData.get('subCategory');
    }

    //only drinks need prices as an array, this seperates the user input into an array
    if (newItemCat === "drink" && newSubCat !== "Ice Cream  &  Other") {
      rawPrice = formData.get('price').split(',');
      // Clean up each element in the array
      newPrice = rawPrice.map((price) =>
        price.replace(/[[\]"\s]/g, '')
      );
    } else if (newSubCat === "Ice Cream  &  Other") {
      rawPrice = formData.get('price');
        // Clean up
      newPrice = rawPrice.replace(/[[\]"\s]/g, '');
    } else {
      newPrice = formData.get('newPrice');
    }

    /* logs for testing
    console.log('New Name:', newName);
    console.log('New itemCategory:', newItemCat);
    console.log('New subCategory:', newSubCat);
    console.log('newPhoto:', newPhoto);
    console.log('newPrice:', newPrice);
    console.log('newPriceLarge:', price_large);
    console.log('newPriceSmall:', price_small);
    console.log('Description:', newDescription);*/

    try {
      res = await http.post("/allItems", {      //call to api
        newName,
        newItemCat,
        newSubCat,
        newPhoto,
        newPhotoData,
        newPrice,
        price_large,
        price_small,
        newDescription,
        username: username,
        token: token
      });


      // Check if the response contains a 'success' property
      if (res.data && res.data.success) {
        return res.data; // Return the response data
      } else {
        // Return an error response if 'success' is not present
        return { success: false, message: "Item upload failed" };
      }
    } catch (error) {
      console.error(error);
    }

  }
};
const dataServiceInstance = new DataService();
export default dataServiceInstance;