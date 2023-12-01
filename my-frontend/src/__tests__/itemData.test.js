import MockAdapter from 'axios-mock-adapter';
import DataService from '../services/itemData';
import http from '../http-common';

// Create a new instance of the mock adapter
const mock = new MockAdapter(http);

describe('DataService', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  it('should get all items successfully', async () => {
    const responseData = [/* Mock response data for all items */];
    mock.onGet('/items').reply(200, responseData);

    const response = await DataService.getAll();
    expect(response.status).toBe(200);
  });

  it('should get an item by ID successfully', async () => {
    const itemId = 'item_id_here'; 
    const responseData = {/* Mock response data for item by ID */};
    mock.onGet(`/items?_id=${itemId}`).reply(200, responseData);

    const response = await DataService.getItemById(itemId);
    expect(response.status).toBe(200);
  });

  it('should get all lunch items successfully', async () => {
    const responseData = [/* Mock response data for lunch items */];
    mock.onGet('/lunchItems').reply(200, responseData);

    const response = await DataService.getAllLunch();
    expect(response.status).toBe(200);
  });

  it('should get pizza special successfully', async () => {
    const responseData = {/* Mock response data for pizza special */};
    mock.onGet('/pizzaSpecial').reply(200, responseData);

    const response = await DataService.getPizzaSpecial();
    expect(response.status).toBe(200);
  });

  it('should get combo special successfully', async () => {
    const responseData = {/* Mock response data for combo special */};
    mock.onGet('/comboSpecial').reply(200, responseData);

    const response = await DataService.getComboSpecial();
    expect(response.status).toBe(200);
  });

  it('should get special deals successfully', async () => {
    const responseData = {/* Mock response data for special deals */};
    mock.onGet('/specialDeals').reply(200, responseData);

    const response = await DataService.getSpecialDeals();
    expect(response.status).toBe(200);
  });

  it('should fetch custom toppings data', async () => {
    const topping = 'Cheese'; // Replace with a valid topping
    const mockResponse = { /* Mock response for custom toppings */ };
    mock.onPost('/customToppings').reply(200, mockResponse);

    const response = await DataService.getCustomToppings(topping);

    expect(response.data).toEqual(mockResponse);
  });

  it('should update custom topping price', async () => {
    const topping = 'Cheese'; // Replace with a valid topping
    const size = 'price_l'; // Replace with a valid size
    const price = '5.99'; // Replace with a valid price
    const username = 'testuser'; // Replace with a valid username
    const token = 'testtoken'; // Replace with a valid token
    const mockResponse = { /* Mock response for update success */ };
    mock.onPost('/customToppings/update').reply(200, mockResponse);

    const response = await DataService.updateCustomToppingPrice(topping, size, price, username, token);

    expect(response.data).toEqual(mockResponse);
  });

  it('should fetch all topping prices successfully', async () => {
    const responseData = [/* Mock response data for all toppings prices */];
    mock.onGet('/allToppingsPrices').reply(200, responseData);

    const response = await DataService.getAllToppingsPrices();
    expect(response).toEqual(responseData); // Change the assertion based on the expected response data structure
  });

  it('should handle an error while fetching toppings prices', async () => {
    const errorMessage = new Error("Request failed with status code 500");
    mock.onGet('/allToppingsPrices').reply(500);
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    await DataService.getAllToppingsPrices();
    expect(consoleError).toHaveBeenCalledWith(errorMessage);
    consoleError.mockRestore();
  });
  

  it('should delete an item successfully', async () => {
    const itemId = 'item_id'; // Replace 'item_id' with an actual ID for testing
    const username = 'testuser'; // Change to the username for testing
    const token = 'testtoken'; // Change to the token for testing
    const responseData = {/* Mock response data for item deletion */};
    mock.onPost('/allItems/deleteItem').reply(200, responseData);

    const response = await DataService.deleteItem(itemId, username, token);
    expect(response.status).toBe(200);
  });

  it('should handle an error while deleting an item', async () => {
    const errorMessage = new Error("Request failed with status code 500");
    mock.onPost('/allItems/deleteItem').reply(500);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    await DataService.deleteItem('mockId', 'mockUser', 'mockToken');
    expect(consoleError).toHaveBeenCalledWith(errorMessage);
    consoleError.mockRestore();
    
  });

  it('should fetch all drink items successfully', async () => {
    const responseData = [/* Mock response data for all drink items */];
    mock.onGet('/drink').reply(200, responseData);

    const response = await DataService.getAllDrink();
    expect(response.status).toBe(200);
  });

  it('should handle an error while fetching drinks', async () => {
    const errorMessage = new Error("Request failed with status code 500");
    mock.onGet('/drink').reply(500);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    await DataService.getAllDrink();
    expect(consoleError).toHaveBeenCalledWith(errorMessage);
    consoleError.mockRestore();
  });

  it('should update an item successfully', async () => {
    // Mock form data and base64String (replace these with actual test data)
    const formData = new FormData();
    const base64String = 'mockBase64String'; // Replace with a base64 string for testing

    // Set up the mock response and expected data
    const mockResponse = { success: true };
    mock.onPost('/allItems/updateItem').reply(200, mockResponse);

    // Execute the method being tested
    const response = await DataService.updateItem(formData, base64String);

    // Perform assertions
    expect(response).toEqual(mockResponse); // Adjust the assertion based on the expected response structure
  });

    it('should create an item successfully', async () => {
    // Mock form data and base64String (replace these with actual test data)
    const formData = new FormData();
    const base64String = 'mockBase64String'; // Replace with a base64 string for testing

    // Set up the mock response and expected data
    const mockResponse = { success: true };
    mock.onPost('/allItems').reply(200, mockResponse);

    // Execute the method being tested
    const response = await DataService.createItem(formData, base64String);

    // Perform assertions
    expect(response).toEqual(mockResponse); // Adjust the assertion based on the expected response structure
    // Add further assertions for success cases, error handling, etc.
  });

  it('should handle unsuccessful item creation', async () => {
    const formData = new FormData();
    const base64String = 'mockBase64String';
    const mockResponse = {
      success: false,
      message: 'Item upload failed',
    };
    mock.onPost('/allItems').reply(200, mockResponse);

    const response = await DataService.createItem(formData, base64String);

    expect(response).toEqual(mockResponse);
  });

  it('should handle an error during item creation', async () => {
    const formData = new FormData();
    const base64String = 'mockBase64String';
    const errorMessage = new Error("Request failed with status code 500");
    mock.onPost('/allItems').reply(500);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

      await DataService.createItem(formData, base64String);
      expect(consoleError).toHaveBeenCalledWith(errorMessage);
      consoleError.mockRestore();
      });

  it('should handle null subCategory in formData', async () => {
    const formData = new FormData();
    formData.append('subCategory', 'null');
    const base64String = 'mockBase64String';
    const mockResponse = { success: true };
    mock.onPost('/allItems').reply(200, mockResponse);

    const response = await DataService.createItem(formData, base64String);

    expect(response).toEqual(mockResponse);
  });

  it('should handle errors during updateItem', async () => {
    const formData = new FormData();
    const base64String = 'mockBase64String';
    const errorMessage = new Error("Request failed with status code 500");
    mock.onPost('/allItems/updateItem').reply(500);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
  
      await DataService.updateItem(formData, base64String);
      expect(consoleError).toHaveBeenCalledWith(errorMessage);
      consoleError.mockRestore();
      });
  
  it('should handle errors during createItem', async () => {
    const formData = new FormData();
    const base64String = 'mockBase64String';
    const errorMessage = new Error("Request failed with status code 500");
    mock.onPost('/allItems').reply(500);
  
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

      await DataService.createItem(formData, base64String);
      expect(consoleError).toHaveBeenCalledWith(errorMessage);
      consoleError.mockRestore();
      });
  
});