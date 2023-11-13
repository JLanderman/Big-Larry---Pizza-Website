//This page is for the uploading/editing drink items.

import React, { useState, useEffect } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import UserService from "../services/UserData";

function DrinkForm() {
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [formattedPrice, setFormattedPrice] = useState('');
  const token = Cookies.get('x-auth-token');

  //const { itemId } = useParams();

  let updatedCategory;
  let updatedSubCategory;
  let existingName;

  let [menuItem, setMenuItem] = useState();
  let params = useParams();
  
  useEffect(() => {
    retrieveMenuItem();
  }, []);
  
  const retrieveMenuItem = () => {
    let url = process.env.REACT_APP_API_BASE_URL+`/items?_id=${params.id}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
      setMenuItem(data[0]);
      console.log(menuItem);
      })
      .catch((e) => 
      {
        console.log(e);
      });
  };

  const handlePriceChange = (e) => {
    const newValue = e.target.value;

    // Use a regular expression to match the expected format "x.xx, y.yy, z.zz"
    const regex = /^\d+\.\d+(,\s*\d+\.\d+)*$/;

    if (regex.test(newValue)) {
      // If the input matches the format, set the state with the raw value
      setFormattedPrice(newValue);
    } else {
      // Otherwise, set an empty value (or handle it differently)
      setFormattedPrice('');
    }
  };
  
  const formatPrice = (price) => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ');
  };

  const formatPriceArray = (priceArray) => {
    return priceArray.map((price) => `${price}`).join(', ');
  };

  React.useEffect(() => {
    setFormattedPrice(formatPrice(price));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // don't allow empty submission
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }

    const user = await UserService.getUserbyToken(token);

    if (name === '' || (subCategory === '' && category !== 'lunch/Dinner') || price === '') {
      // Display an error message or alert the user
      alert('Please fill in all required fields before submitting.');
      return; // Exit the function without further processing
    }
    
    //lunch/Dinner has no subcategory, but is a category itself. 
    if (subCategory === 'lunch/Dinner'){
      updatedCategory = 'lunch/Dinner';
      updatedSubCategory = '';
    }
    //if a drink was selected, set drink to be the category
    else if(subCategory !== ''){
      updatedCategory = 'drink';
      updatedSubCategory = subCategory;
    }

    //Create a FormData object to append form fields and file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemCategory', updatedCategory);
    formData.append('subCategory', updatedSubCategory);
    formData.append('price', price*100);
    formData.append('user', user);
    formData.append('token', token);


  // Send the formData to your server for processing
  try {
    console.log('Name:', formData.get('name'));
    console.log('itemCategory:', formData.get('itemCategory'));
    console.log('subCategory:', formData.get('subCategory'));
    console.log('price:', formData.get('price'));
    
    if (menuItem) {
      //Add neccessary values to the formdata for updating
      formData.append('currentName', menuItem.name);
      formData.append('currentItemCategory', menuItem.category); //this might need some work
    

      // If existingName has a value, use the updateMenuItemTextOnly API
      const res = await DataService.updateMenuItemTextOnly(formData);
      console.log('Item updated successfully');
      // Handle success for update
    } else {
      // If existingName is empty, use the putItemFront API
      const res = await DataService.putItemFront(formData);
      console.log('Item uploaded successfully');
      // Handle success for upload
    }
  } catch (error) {
    console.error('Error uploading/updating item:', error);
    // Handle the error (e.g., show an error message to the user)
  }

    // Reset form fields and selected file

    setName('');
    setCategory('');
    setSubCategory('');
    setPrice('');
	
  };

  return (
    <div data-testid="drinkUpload">
      <div><h1>DRINKS</h1></div>
		  <div> <br></br><br></br><br></br></div>
      <div className="centered-text">
          {menuItem && menuItem.name ? <h1>Currently editing "{menuItem.name}"</h1> : <h1>Adding a new menu item</h1>} 
      </div>
      <div> <br></br><br></br><br></br></div>

      <form onSubmit={handleSubmit} className="vertical-center">
        {menuItem && menuItem.name ? <h3>Current item name: {menuItem.name}</h3> : <h3>Name</h3>}
        <input
          type="text"
          placeholder={menuItem && menuItem.name ? "New Item Name" : "Item Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        {menuItem && (menuItem.drinktype || menuItem.category === 'lunch/Dinner') ? (
          <h3>
            Current category: {menuItem.drinktype || 'lunch/Dinner'}
          </h3>
        ) : (
          <h3>Category</h3>
        )}
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select an option</option>
          <option value= "lunch/Dinner">Lunch & Dinner</option>
          <option value= "Cold Drink">Cold Drink</option>
          <option value= "2-Litter Soda">Liter Bottles</option>
          <option value= "Shaved Ice">Shaved Ice</option>
          <option value= "Milk Shakes">Milk Shake</option>
          <option value= "Smoothies">Smoothie</option>
          <option value= "Freeze/Float">Freeze/Float</option>
          <option value= "Ice Cream  &  Other">Other Drink</option>
        </select>
        <br></br>
        {menuItem && menuItem.name ? (
          <h3>
            Currently Price(s):{" "}
            {menuItem.category === "lunch/Dinner"
              ? menuItem.price 
              : Array.isArray(menuItem.price)
              ? formatPriceArray(menuItem.price)
              : menuItem.price / 100}
          </h3>
        ) : (
          <h3>Price(s)</h3>
        )}

        <input
          type="text"
          placeholder="X.XX,Y.YY,Z.ZZ" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br></br>
        <button type="submit">{existingName ? "Update Item" : "Submit"}</button>
      </form>
    </div>
  );
}

export { DrinkForm }
export default DrinkForm;
