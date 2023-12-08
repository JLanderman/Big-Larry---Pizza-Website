import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
import DataService from "../services/itemData";
import Cookies from 'js-cookie';
import UserService from "../services/UserData";
import { useNavigate } from 'react-router-dom';


const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const EditItem = () => {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState();
  const [category, setCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, SetnewDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { auth } = useAuth();
  let base64String;

  // Redirect if not logged in
  useEffect(() => {
    if (!auth) navigate('/');
  });

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

  let params = useParams();
  const token = Cookies.get('x-auth-token');

  const handleSubmit = async () => {
    if (!token) {
      // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
      alert('You need to be logged in to submit the form.');
      return;
    }

    const user = await UserService.getUserbyToken(token);
    if (newName === '' || category === '' || newPrice === '' || newDescription === '') {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    if (isNaN(newPrice)) {
      alert('Please enter a valid numeric value for the price.');
      return;
    }

    if (selectedFile) await readFileAsDataURL(selectedFile);

    const formData = new FormData();
    formData.append('currName', menuItem.name);
    formData.append('currCat', menuItem.itemCategory);
    formData.append('newName', newName || menuItem.name);
    formData.append('newCat', category || menuItem.itemCategory);
    formData.append('newPrice', newPrice * 100 || menuItem.price);
    formData.append('description', newDescription === "" ? menuItem.info : newDescription)
    formData.append('user', user);
    formData.append('token', token);

    try { // Send the formData to server for processing
      const photoName = (selectedFile&&selectedFile.name)? selectedFile.name : null;
      formData.append('newPhoto', photoName || menuItem.photo);
      await DataService.updateItem(formData, base64String); //call to the api
      console.log('Item updated successfully');
      // Determine the destination page based on the selected category
      let destinationPage;
      switch (category) {
        case 'pizzaSpecial':
          destinationPage = '/pizzaSpecial';
          break;
        case 'comboSpecial':
          destinationPage = '/comboSpecial';
          break;
        case 'specialDeal':
          destinationPage = '/specialDeals';
          break;
        default:
          destinationPage = '/mainmenu';
      }

      // Navigate to the destination page
      navigate(destinationPage);
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  useEffect(() => {
    retrieveMenuItem();
    // eslint-disable-next-line
  }, [params.id]);

  const retrieveMenuItem = () => {
    DataService.getItemById(params.id)
      .then((res) => {
        setMenuItem(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setNewPhoto(file);
  };

  function splitText(text) {
    let firstChar = text.charAt(0).toUpperCase();
    const split = text.substring(1).split(/(?=[A-Z])/);
    let textResult = firstChar + split.join(" ");

    return textResult;
  }

  return (
    <div className="detailsContainer" data-testid="container">
      {menuItem && menuItem.name ? // Load menu item
        <div data-testid="itemDetails">
          <h1 className="detailsHeader">Modifying "{menuItem.name}"</h1>
          <div className="detailsGrid">
            <div className="detailsFlexContainer">
              <div className="detailsPictureContainer">
                {
                  newPhoto ? (
                    <img className="detailsPicture" src={URL.createObjectURL(newPhoto)} alt="Selected Preview" />
                  ) : menuItem && menuItem.photo ? (
                    //Render item picture if it exists
                    <img className="detailsPicture" src={picUrl + menuItem.photo} alt="Item" />
                  ) : (
                    <div>No picture for item </div>
                  )}

                <div className="detailsButtonRow">
                  <input data-testid="file"
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button className="detailsButton" type="button" onClick={() => fileInputRef.current.click()}>
                    Upload File
                  </button>

                </div>
              </div>
            </div>


            {/*item detail part*/}
            <div className="detailsFlexContainer" >
              <div className="detailsItemDetails">
                <div>
                  {menuItem.name ? // Render name
                    <h2 data-testid="currentName">Curent Name: {menuItem.name}</h2>
                    : null
                  }
                  <h2>New Name: <input type="text" id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} data-testid="newName"/></h2>
                </div>
                <br />

                <div>
                  <h2>Current Category: {splitText(menuItem.itemCategory)}</h2>
                  <h2>New Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} data-testid="newCat">
                      <option value="">Select an option</option>
                      <option value="pizzaSpecial">Pizza Specialty</option>
                      <option value="comboSpecial">Combo Specialty</option>
                      <option value="specialDeal">Special Deal</option>
                    </select>
                  </h2>
                </div>
                <br />
                <div>
                  {menuItem.price ? // Render price
                    <h2 data-testid="currentPrice">Current Price: ${(menuItem.price / 100).toFixed(2)}</h2>
                    : null
                  }
                  <h2>New Price: $ <input type="text" id="newPrice" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} data-testid="newPrice" /></h2>
                </div>
                <br />


                <div>
                  {menuItem.info ? // Render description
                    <>
                      <h2>Old Description:</h2>
                      <p data-testid="currentInfo">{menuItem.info}</p>
                    </>
                    : null
                  }
                  <h2>New Description:</h2>
                  <textarea className="detailsEditDescription" id="newDecription" value={newDescription} onChange={(e) => SetnewDescription(e.target.value)} data-testid="newDescription"></textarea>
                </div>
              </div>
            </div>
            <div className="detailsButtonContainer">

            </div>
            <div className="detailsButtonContainer">
              <button className="detailsButton save" onClick={handleSubmit} data-testid="submit">
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>

        : <span>Loading item...</span > // No item
      }
    </div>
  );
};

export { EditItem }
export default EditItem;
