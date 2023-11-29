//This page is for the uploading/editing menu items that are text only / lack pictures
//Drinks have their own page, so this page is explicity for items on the lunch & dinner menu

import React, { useState, useEffect } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import UserService from "../services/UserData";


function TextForm() {
  const [name, setName] = useState('');
  const category = 'lunch/Dinner';
  const [price, setPrice] = useState('');
  const [priceSmall, setPriceSmall] = useState('');
  const [priceLarge, setPriceLarge] = useState('');
  const [hasMultiplePrices, setHasMultiplePrices] = useState(false);
  const token = Cookies.get('x-auth-token');

  let existingName;

  let [menuItem, setMenuItem] = useState();
  let params = useParams();
  
  useEffect(() => {
      retrieveMenuItem();
  }, [params.id]);
  
  const retrieveMenuItem = () => {
    if (params.id) {
      let url = process.env.REACT_APP_API_BASE_URL+`/items?_id=${params.id}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        setMenuItem(data[0]);
        console.log(menuItem);

        if (data[0].price_small !== undefined && data[0].price_large !== undefined) {
          setHasMultiplePrices(true);
        } else {
          setHasMultiplePrices(false);
        }

        })
        .catch((e) => 
        {
          console.log(e);
    });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // don't allow empty submission
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }

    const user = await UserService.getUserbyToken(token);

    if (name === '') {
      // Display an error message or alert the user
      alert('Please fill in all the name before submitting.');
      return; // Exit the function without further processing
    }
    
    if (price === '' && !hasMultiplePrices) {
      alert('Please fill in the price before submitting.');
      return;
    }

    if ((priceSmall === '' || priceLarge === '') && hasMultiplePrices) {
      alert('Please fill in both price fields before submitting.');
      return;
    }    

    //API to my knowledge doesn't handle removing the old price lines, so it might 
    //just be easier to make a new item if the user wants to go from 1 price to 2 prices
    if ((!hasMultiplePrices && menuItem?.price_small && menuItem?.price_large) ||
        (hasMultiplePrices && !menuItem?.price_small && !menuItem?.price_large)) {
      alert('You cannot change the price structure for an existing item. If you want a single price item to have two prices, or a two price item to have one price, then please create a new item with the right price structure and delete this one.');
      return;
    }

    
  // Check if price is not a number when there's a single price
  if (!hasMultiplePrices && isNaN(price)) {
    alert('Please enter a valid price.');
    return;
  }

  // Check if both prices are numbers when there are multiple prices
  if (hasMultiplePrices && (isNaN(priceSmall) || isNaN(priceLarge))) {
    alert('Please enter valid prices for both small and large sizes.');
    return;
  }

    //Create a FormData object to append form fields and file
    const formData = new FormData();

    formData.append('newName', name);
    formData.append('newCat', category);
    if (!hasMultiplePrices) {
      // If single price
      formData.append('newPrice', price * 100);
    } else {
      // If multiple prices
      formData.append('price_small', priceSmall * 100);
      formData.append('price_large', priceLarge * 100);
    }
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

    // Reset form fields

    setName('');
    setPrice('');
    setPriceSmall('');
    setPriceLarge('');
	
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
      
          <h3>Category:</h3>
        <h3>This item is a Lunch & Dinner menu item</h3>
        <br></br>

        <h3>
          {menuItem && menuItem.name
            ? hasMultiplePrices
              ? `Current Small Price: ${menuItem.price_small / 100}
                , Current Large Price: ${menuItem.price_large / 100}`
              : `Current Price: ${menuItem.price / 100}`
            : 'Price'}
        </h3>
        {!hasMultiplePrices ? (
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Small Price"
              value={priceSmall}
              onChange={(e) => setPriceSmall(e.target.value)}
            />
            <input
              type="text"
              placeholder="Large Price"
              value={priceLarge}
              onChange={(e) => setPriceLarge(e.target.value)}
            />
          </>
        )}
        <br />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="multiplePricesCheckbox"
            checked={hasMultiplePrices}
            onChange={(e) => setHasMultiplePrices(e.target.checked)}
          />
          <label htmlFor="multiplePricesCheckbox">Multiple prices?</label>
        </div>

        <br></br>

        <button type="submit">{existingName ? "Update Item" : "Submit"}</button>

      </form>
    </div>
  );
}
export { TextForm }
export default TextForm;
