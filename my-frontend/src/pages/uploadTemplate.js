
import React, { useState, useRef } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import UserService from "../services/UserData";


function ItemFormLarge() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = Cookies.get('x-auth-token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }

    const user = await UserService.getUserbyToken(token);

    if(name ==='' || category ==='' || price ==='' || description ==='' || selectedFile.name ===''){
    alert('Please fill in all required fields before submitting.');
    return;
  }

  // Create a FormData object to append form fields and file
  const formData = new FormData();
  formData.append('name', name);
  formData.append('itemCategory', category);
  formData.append('price', price*100);
  formData.append('description', description);
  //formData.append('image', selectedFile);
  // just use filename for now
  if (selectedFile) {
    formData.append('photo', selectedFile.name);
  }
  else{
    formData.append('photo', null);
  }
  formData.append('user', user)
  formData.append('token', token)
  // Send the formData to your server for processing
  //check for empty data?
	try {
	const res = await DataService.putItemFront(formData);
	console.log('Item uploaded successfully');
	} catch (error) {
	console.error('Error uploading item:', error);
	}


	//// THIS CODE IS FOR TESTING. IT WILL THROW THE ////
	//// UPLOADED VALUES INTO THE CONSOLE (f12) SO YOU CAN ////
	//// DOUBLE CHECK TO MAKE SURE THE PROPER VALUES ARE BEING READ ////
	//// CONTROL + BACKSLASH TO UNCOMMENT ENTIRE SECTION ////
	//
	// console.log('Name:', formData.get('name'));
  // console.log('Category:', formData.get('category'));
  // console.log('Price:', formData.get('price'));
  // console.log('Description:', formData.get('description'));
  // console.log('File Name:', selectedFile ? selectedFile : 'N/A');
	

    // Reset form fields and selected file
	if (fileInputRef.current) {
		fileInputRef.current.value = '';
	}
    setName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setSelectedFile(null);
	
  };

  return (
    <div>
		<div> <br></br><br></br><br></br> This is for Pizza Specials, Combo Specials, and Special Deals</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select an option</option>
          <option value= "pizzaSpecial">Pizza Specialty</option>
          <option value= "comboSpecial">Combo Specialty</option>
          <option value= "specialDeal">Special Deal</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ItemFormLarge;
