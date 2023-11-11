import React ,{ useRef }from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/itemData";
import UserService from "../services/UserData";
import Cookies from 'js-cookie';


const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const EditItem = () => {
  const [menuItem, setMenuItem] = useState();
  const [category, setCategory] = useState("");
  const [newName , setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, SetnewDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  let params = useParams();
  const token = Cookies.get('x-auth-token');

    const handleSaveChange = () =>{
      const updatedData = {
        name: newName || menuItem.name,
        itemCategory : category || menuItem.itemCategory,
        price: newPrice || menuItem.price,
        info: newDescription ||  menuItem.info,
        photo: newPhoto || menuItem.photo
      };


      DataService.updateItem(menuItem._id, updatedData)
      .then((response) =>{
        if(response.status === 200)
        {
          console.log('Item updated sucessfully');
        }
        else{
          console.error('Failed to update item');
        }
      })
      .catch((error) =>{
        console.error('Error updating the item:', error);
      });
    };

  useEffect(() => {
    retrieveMenuItem();
  }, []);

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
                    <h2>Curent Name: {menuItem.name}</h2>
                    : null
                  }
                  <h2>New Name: <input type="text" id ="newName" value={newName} onChange={(e) =>setNewName(e.target.value)} /></h2>
                </div>
                <br />

                <div>
                  <h2>Current Category: {menuItem.itemCategory}</h2>
                  <h2>New Category: 
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value= "pizzaSpecial">Pizza Specialty</option>
                    <option value= "comboSpecial">Combo Specialty</option>
                    <option value= "specialDeal">Special Deal</option>
                  </select>
                  </h2>
                </div>
                <br />
                <div>
                  {menuItem.price ? // Render price
                    <h2>Current Price: ${(menuItem.price / 100).toFixed(2)}</h2>
                    : null
                  }
                  <h2>New Price: $ <input type="text" id="newPrice" value={newPrice} onChange={(e) =>setNewPrice(e.target.value)}/></h2>
                </div>
                <br />


                <div>
                  {menuItem.info ? // Render description
                    <>
                      <h2>Old Description:</h2>
                      <p>{menuItem.info}</p>
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
