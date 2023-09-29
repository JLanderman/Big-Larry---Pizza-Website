
import React, { useState } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";


function TextForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const token = Cookies.get('x-auth-token'); 

  let updatedCategory;
  let updatedSubCategory;


  const handleSubmit = async (e) => {
    e.preventDefault();

    //lunch/Dinner has no subcategory, but is a category itself. 
    if (subCategory === 'lunch/Dinner'){
      updatedCategory = 'lunch/Dinner';
      updatedSubCategory = '';
    }
    //if a drink was selected, set drink to be the category
    else if(subCategory != ''){
      updatedCategory = 'drink';
      updatedSubCategory = subCategory;
    }

    //Create a FormData object to append form fields and file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', updatedCategory);
    formData.append('subCategory', updatedSubCategory);
    formData.append('price', price*100);

  // Send the formData to your server for processing
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
