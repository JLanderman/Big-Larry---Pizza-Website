import React, { useState, useRef } from 'react';
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import UserService from "../services/UserData";
import pizzaGuy from '../images/Other/PizzaGuy_HQ_1.0.png';

function ItemFormLarge() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const token = Cookies.get('x-auth-token');

  let base64String;
  
   // Helper function to wait for reading to finish
  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        base64String = reader.result.toString();
        resolve(base64String);
      };
      reader.readAsDataURL(file); // This is an asynchronous function
    });
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleFileChangeText = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
    setSelectedFile(file);
    setFileUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }

    const user = await UserService.getUserbyToken(token);
    if (name === '' || category === '' || price === '' || description === '' || selectedFile === null) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    if (isNaN(price)) {
      alert('Please enter a valid numeric value for the price.');
      return;
    }

    // Create a FormData object to append form fields and file
    const formData = new FormData();
    formData.append('newName', name);
    formData.append('newCat', category);
    formData.append('newPrice', price * 100);
    formData.append('description', description);
    //formData.append('image', selectedFile);
    // just use filename for now
    formData.append('newPhoto', selectedFile.name);
    await readFileAsDataURL(selectedFile); // Waits for base64String

    formData.append('user', user)
    formData.append('token', token)

    try { // Send the formData to server for processing
      await DataService.createItem(formData, base64String);
      console.log('Item uploaded successfully');
    } catch (error) {
      console.error('Error uploading item:', error)
    }

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
    setFileUploaded(false);
  };

  return (
    <div className="detailsContainer" data-testid="uploadContainer">
      <form onSubmit={handleSubmit} data-testid="form">
        <h1 className="detailsHeader">Adding New Item to Menu</h1>

        <div className="detailsGrid">
          <div className="detailsFlexContainer">
            <div className="detailsPictureContainer">
              {/* Use the static image */}
              {uploadedImage ? (
                <img className="detailsPicture" src={uploadedImage} alt="Uploaded" data-testid="uploaded" />
              ) : (
                <img className="detailsPicture" src={pizzaGuy} alt="Pizza Guy" />
              )}
              <div className="detailsButtonRow">
                <input data-testid="file"
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChangeText}
                />
                <button className="detailsButton" type="button" onClick={() => fileInputRef.current.click()}>
                  {fileUploaded ? 'Picture Uploaded' : 'Upload File'}
                </button>
              </div>
            </div>
          </div>

          {/* Item detail part */}
          <div className="detailsFlexContainer">
            <div className="detailsItemDetails">
              {/* Add input fields for item details */}
              <div>
                {<h2 data-testid="currentName">Item Name:</h2>}
                <h2><input type="text" placeholder="Item Name" data-testid="name"
                  value={name} onChange={handleNameChange} /></h2>
              </div>

              <br />

              <div>
                <h2>Item Category:</h2>
                <h2>
                  <select value={category} onChange={handleCategoryChange} data-testid="category">
                    <option value="">Select an option</option>
                    <option value="pizzaSpecial">Pizza Specialty</option>
                    <option value="comboSpecial">Combo Specialty</option>
                    <option value="specialDeal">Special Deal</option>
                  </select>
                </h2>
              </div>
              <br />
              <br />
              <div>
                <h2 data-testid="currentPrice">Item Price:</h2>
                <h2> $ <input type="text" placeholder="Price" value={price} data-testid="price"
                  onChange={handlePriceChange} /></h2>
              </div>
              <br />

              <div>
                <h2>Item Description:</h2>
                <textarea className="detailsEditDescription" placeholder="Item Description" data-testid="description"
                  value={description} onChange={handleDescriptionChange}></textarea>
              </div>

              <button type="submit" className="detailsButton save">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ItemFormLarge;
