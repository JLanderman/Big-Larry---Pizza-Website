
import React, { useState } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";


function TextForm() {
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  // eslint-disable-next-line
  const token = Cookies.get('x-auth-token'); 

  let updatedCategory;
  let updatedSubCategory;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // don't allow empty submission
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }
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


  // Send the formData to your server for processing
  try {
    console.log('Name:', formData.get('name'));
    console.log('itemCategory:', formData.get('itemCategory'));
    console.log('subCategory:', formData.get('subCategory'));
    console.log('price:', formData.get('price'));
    
    const res = await DataService.putItemFront(formData);
    console.log('Item uploaded successfully');
    // Handle success (e.g., show a success message to the user)
  } catch (error) {
    console.error('Error uploading item:', error);
    // Handle the error (e.g., show an error message to the user)
  }
  //add a check for empty data?
	// try {
	// 	const res = await DataService.addItem(formData, token);
	// 	console.log('Item uploaded successfully');
	//   } catch (error) {
	// 	console.error('Error uploading item:', error);
	//   }


	//// THIS CODE IS FOR TESTING. IT WILL THROW THE ////
	//// UPLOADED VALUES INTO THE CONSOLE (f12) SO YOU CAN ////
	//// DOUBLE CHECK TO MAKE SURE THE PROPER VALUES ARE BEING READ ////
	//// CONTROL + BACKSLASH TO UNCOMMENT ENTIRE SECTION ////
	//
	// console.log('Name:', formData.get('name'));
  // console.log('Category:', formData.get('category'));
  // console.log('Sub category:', formData.get('subCategory'));
  // console.log('Price:', formData.get('price'));


    // Reset form fields and selected file

    setName('');
    setCategory('');
    setSubCategory('');
    setPrice('');
	
  };

  return (
    <div>
		<div> <br></br><br></br><br></br> This is for Lunches and Drinks</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select an option</option>
          <option value= "lunch/Dinner">Lunch & Dinner</option>
          <option value= "cold drink">Cold Drink</option>
          <option value= "liter">Liter Bottles</option>
          <option value= "shake">Milk-Shake</option>
          <option value= "smoothie">Smoothie</option>
          <option value= "other">Other Drink</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TextForm;
