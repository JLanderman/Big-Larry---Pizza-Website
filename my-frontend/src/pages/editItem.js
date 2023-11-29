import React ,{ useRef }from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/itemData";
import Cookies from 'js-cookie';
import UserService from "../services/UserData";


const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const EditItem = () => {
  const [menuItem, setMenuItem] = useState();
  const [category, setCategory] = useState("");
  const [newName , setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, SetnewDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  let base64String;
  let reader = new FileReader();
  reader.onload = function () {
    base64String = reader.result;    
    base64String.toString();
    console.log(base64String);
  }

  let params = useParams();
  const token = Cookies.get('x-auth-token');

    const handleSaveChange = async () =>{

      if (!token) {
        // User is not authenticated, handle accordingly (e.g., redirect to the login page or show an alert)
        alert('You need to be logged in as an Admin to submit the form.');
        return;
      }
      reader.readAsDataURL(selectedFile);
      const user = await UserService.getUserbyToken(token);
      const formData = new FormData();
      formData.append('currName', menuItem.name);
      formData.append('currCat', menuItem.itemCategory);
      formData.append('newName', newName || menuItem.name);
      formData.append('newCat', category || menuItem.itemCategory);
      formData.append('newPrice', newPrice || menuItem.price);
      formData.append('description', newDescription === "" ? menuItem.info: newDescription)
      formData.append('user', user);
      formData.append('token', token);

      try {
        setTimeout(function(){
          const photoName = selectedFile.name;
          formData.append('newPhoto', photoName || menuItem.photo);
          DataService.updateItem(formData, base64String); //call to the api
          console.log('Item uploaded successfully');
        },50);
        } catch (error) {
        console.error('Error uploading item:', error);
        };
    };

  useEffect(() => {
    retrieveMenuItem();
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

  const fileInputRef = useRef(null);

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // You can perform any file-related logic here
    console.log('Selected file:', file);
    setSelectedFile(file);
    setNewPhoto(file);
  };

  return (
    <div className="detailsContainer" data-testid="container">
      {menuItem && menuItem.name ? // Load menu item
        <div data-testid="itemDetails">
          <h1 className="detailsHeader">Modifying "{menuItem.name}"</h1>
          <div className="detailsGrid">
            <div className="detailsFlexContainer">
              <div className="detailsPictureContainer">
                {
                  newPhoto? (
                    <img className="detailsPicture" src = {URL.createObjectURL(newPhoto)} alt="Selected Preview"/>
                  ): menuItem && menuItem.photo ? (
                    //Render item picture if it exists
                    <img className="detailsPicture" src ={picUrl + menuItem.photo} alt ="Item" />
                  ):(
                    <div>No picture for item </div>
                  )}
              
                <div className="detailsButtonRow">
                <input type="file" id="file" name="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange}/>
                <button className="detailsButton" type="button" onClick={chooseFile}>
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
                  <h2>New Name: <input type="text" id ="newName" value={newName} onChange={(e) =>setNewName(e.target.value)} /></h2>
                </div>
                <br />

                <div>
                  <h2>Current Category: {menuItem.itemCategory}</h2>
                  <h2>New Category: 
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value= "">Select an option</option>
                    <option value= "pizzaSpecial">Pizza Specialty</option>
                    <option value= "comboSpecial">Combo Specialty</option>
                    <option value= "specialDeal">Special Deal</option>
                  </select>
                  </h2>
                </div>
                <br />
                <div>
                  {menuItem.price ? // Render price
                    <h2 data-testid="currentPrice">Current Price: ${(menuItem.price / 100).toFixed(2)}</h2>
                    : null
                  }
                  <h2>New Price: $ <input type="text" id="newPrice" value={newPrice} onChange={(e) =>setNewPrice(e.target.value)}/></h2>
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
                  <textarea className="detailsEditDescription" id="newDecription" value={newDescription} onChange={(e) => SetnewDescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
            <div className="detailsButtonContainer">
             
            </div>
            <div className="detailsButtonContainer">
              <button className="detailsButton save" onClick={handleSaveChange}>
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
