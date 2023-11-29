//This page is for the uploading/editing drink items with text only/ no pictures.
//This page is explicitly for drink items. Lunch & Dinner items have their own page

import React, { useState, useEffect } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import UserService from "../services/UserData";

function DrinkForm() {
  const [name, setName] = useState('');
  const category = 'drink';
  //const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');
  const [hasTwoPrices, setHasTwoPrices] = useState(false);
  const [hasThreePrices, setHasThreePrices] = useState(false);
  //const [formattedPrice, setFormattedPrice] = useState('');
  const token = Cookies.get('x-auth-token');


  let updatedSubCategory;
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

        if (data[0].price !== undefined) {
          const parsedPrices = data[0].price.map(parseFloat);
          if (parsedPrices.length === 1) {
            setPrice(parsedPrices[0].toFixed(2));
          } else if (parsedPrices.length === 2) {
            setPrice(parsedPrices[0].toFixed(2));
            setPrice2(parsedPrices[1].toFixed(2));
            setHasTwoPrices(true);
          } else if (parsedPrices.length === 3) {
            setPrice(parsedPrices[0].toFixed(2));
            setPrice2(parsedPrices[1].toFixed(2));
            setPrice3(parsedPrices[2].toFixed(2));
            setHasThreePrices(true);
          }
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

    if (name === '' || subCategory === '' || price === '') {
      // Display an error message or alert the user
      alert('Please fill in all required fields before submitting.');
      return; // Exit the function without further processing
    }
    
    if ((hasTwoPrices && (price2 === '' || !parseFloat(price2))) || 
        (hasThreePrices && (price2 === '' || price3 === '' || !parseFloat(price2) || !parseFloat(price3)))) {
      // Alert when two or three prices are enabled but some fields are empty or not numbers
      alert('Please fill in all the available price fields with valid numbers.');
      return; // Exit the function without further processing
    }

    //Create a FormData object to append form fields and file
    const formData = new FormData();

    formData.append('newName', name);
    formData.append('newCat', category);
    formData.append('subCategory', updatedSubCategory);
    if (hasTwoPrices) {
      const prices = [price, price2];
      formData.append('price', JSON.stringify(prices));
    } else if (hasThreePrices) {
      const prices = [price, price2, price3];
      formData.append('price', JSON.stringify(prices));
    } else {
      const prices = [price];
      formData.append('price', JSON.stringify(prices));
    } //turns the prices back into one string array
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
    //setCategory('');
    setSubCategory('');
    setPrice('');
    setPrice2('');
    setPrice3('');	
  };

  return (
    <div data-testid="drinkUpload">
		  <div> <br /><br /><br /></div>
      <div className="centered-text">
        {menuItem && menuItem.name ? (
          <h1>Currently editing "{menuItem.name}"</h1>
        ) : (
          <h1>Adding a new menu item</h1>
        )}
      </div>
      {menuItem && menuItem.name && (
        <div>
          <div className="centered-text">
            <p>IMPORTANT: If you want to change the price for a drink category, you must change the price for the first item that appears in that!</p>
          </div>
          <div className="centered-text">
            <p>Otherwise, if you change a price it will not be reflected on the menu!</p>
          </div>
        </div>
      )}
      <div><br /><br /><br /></div>

      <form onSubmit={handleSubmit} className="vertical-center">
        {menuItem && menuItem.name ? <h3>Current item name: {menuItem.name}</h3> : <h3>Name</h3>}
        <input
          type="text"
          placeholder={menuItem && menuItem.name ? "Item Name" : "Item Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        {menuItem && (menuItem.drinktype) ? (
          <h3>
            Current category: {menuItem.drinktype}
          </h3>
        ) : (
          <h3>Category</h3>
        )}
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select an option</option>
          <option value= "Cold Drink">Cold Drink</option>
          <option value= "2-Litter Soda">Liter Bottles</option>
          <option value= "Shaved Ice">Shaved Ice</option>
          <option value= "Milk Shakes">Milk Shake</option>
          <option value= "Smoothies">Smoothie</option>
          <option value= "Freeze/Float">Freeze/Float</option>
          <option value= "Ice Cream  &  Other">Ice Cream or Other Drink</option>
        </select>
        <br></br>


        <h3>
          {menuItem && menuItem.name
        ? hasTwoPrices
          ? `Current Prices: $${menuItem.price[0]}, $${menuItem.price[1]}` // Assuming price[0] and price[1] hold the two prices
          : hasThreePrices
          ? `Current Prices: $${menuItem.price.join(', $')}`
          : `Current Price: $${menuItem.price[0]}` // Displaying the single price
        : 'Price(s)'}
        </h3>
        <input
          type="text"
          placeholder="Small / Only Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {hasTwoPrices && (
          <input
            type="text"
            placeholder="Large Price"
            value={price2}
            onChange={(e) => setPrice2(e.target.value)}
          />
        )}
        {hasThreePrices && (
          <>
            <input
              type="text"
              placeholder="Medium Price"
              value={price2} // Assuming this should be price2 for medium price
              onChange={(e) => setPrice2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Large Price"
              value={price3}
              onChange={(e) => setPrice3(e.target.value)}
            />
          </>
        )}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="twoPricesCheckbox"
            checked={hasTwoPrices}
            onChange={() => {
              setHasTwoPrices(!hasTwoPrices);
              setHasThreePrices(false);
            }}
          />
          <label htmlFor="twoPricesCheckbox">Two prices?</label>

          <input
            type="checkbox"
            id="threePricesCheckbox"
            checked={hasThreePrices}
            onChange={() => {
              setHasThreePrices(!hasThreePrices);
              setHasTwoPrices(false);
            }}
          />
          <label htmlFor="threePricesCheckbox">Three prices?</label>
        </div>
        <br></br>
        <button type="submit">{existingName ? "Update Item" : "Submit"}</button>
      </form>
    </div>
  );
}

export { DrinkForm }
export default DrinkForm;
