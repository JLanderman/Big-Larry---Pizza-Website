//This page is for the uploading/editing menu items that are text only / lack pictures
//Drinks have their own page

import React, { useState, useEffect } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import UserService from "../services/UserData";


function TextForm() {
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [formattedPrice, setFormattedPrice] = useState('');
  const [newDescription, SetnewDescription] = useState('');
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
  
  /*
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
  };*/
  
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
    
    

    //Create a FormData object to append form fields and file
    const formData = new FormData();

    //lunch/Dinner has no subcategory, but is a category itself. 
    if (subCategory === 'lunch/Dinner'){
      updatedCategory = 'lunch/Dinner';
      updatedSubCategory = null;
    }
    //if a drink was selected, set drink to be the category
    else if(subCategory !== ''){
      updatedCategory = 'drink';
      updatedSubCategory = subCategory;
    } 

    formData.append('newName', name);
    formData.append('newCat', updatedCategory);
    formData.append('subCategory', updatedSubCategory);
    formData.append('newPrice', price*100); //input price with the decimal, this handles that
    formData.append('user', user);
    formData.append('token', token);

    


  // Send the formData to your server for processing
  try {
    
    for (const value of formData.values()) {  //logging for testing
      console.log(value);
    }
    
    if (menuItem) {
      // if editing
      formData.append('currName', menuItem.name);        //only append these if editings
      formData.append('currCat', menuItem.itemCategory); //api uses them to find item in database

      const res = await DataService.updateItem(formData);
      console.log('Item updated successfully'); // Handle success for update
      
    } else {
      // If creating
      const res = await DataService.createItem(formData);
      console.log('Item uploaded successfully'); // Handle success for upload
      
    }
  } catch (error) {
    // Handle the error (e.g., show an error message to the user)
    console.error('Error uploading/updating item:', error);    
  }



    // Reset form fields and selected file

    setName('');
    setCategory('');
    setSubCategory('');
    setPrice('');
	
  };

  return (
    
    <div data-testid="textUpload">
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
export { TextForm }
export default TextForm;
