import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/itemData";
import UserService from "../services/UserData";
import Cookies from 'js-cookie';


const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const EditItem = () => {
  let [menuItem, setMenuItem] = useState();
  const [category, setCategory] = useState('');
  let params = useParams();
  const token = Cookies.get('x-auth-token');

  const handleRemoveItem = async (_id) => {
    const user = await UserService.getUserbyToken(token);
		const confirmation = window.confirm(`Are you sure you want to remove this item from the menu?`);
		console.log('package id:', _id);
  
		if (confirmation) {
		  if (confirmation) {
			// User confirmed, proceed with deletion
			DataService.deleteItem(_id, user, token).then((response) => {
			  if (response.status === 200) {
				console.log('Item deleted successfully');
				window.location.reload(); // Refresh the page
			  } else {
				console.error('Failed to delete item');
			  }
			})
			.catch((error) => {
			  console.error('Error deleting item:', error);
			}); // Call your deleteItem function with the _id
		  }
		}
	  };
  // const [selectedSize, setSelectedSize] = useState(null);

  // const handleSizeClick = (index) => {
  //   setSelectedSize(index);
  // };

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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="detailsContainer" data-testid="details">
      {menuItem && menuItem.name ? // Load menu item
        <>
          <h1 className="detailsHeader">Modifying "{menuItem.name}"</h1>
          <div className="detailsGrid">
            <div className="detailsFlexContainer">
              <div className="detailsPictureContainer">
                {menuItem.photo ? // Render item picture
                  <img className="detailsPicture" src={picUrl + menuItem.photo}></img>
                  : <div>No picture for item</div>
                }
                <div className="detailsButtonRow">
                  <button className="detailsButton">
                    Upload Picture
                  </button>
                  <button className="detailsButton">
                    Remove Picture
                  </button>
                </div>
              </div>
            </div>

            <div className="detailsFlexContainer">
              <div className="detailsItemDetails">
                <div>
                  {menuItem.name ? // Render name
                    <h2>Curent Name: {menuItem.name}</h2>
                    : null
                  }
                  <h2>New Name: <input type="text"></input></h2>
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
                  <h2>New Price: $ <input type="text"></input></h2>
                </div>
                <br />

                {menuItem.price_chicken ? // Render chicken price if item has it
                  <>
                    <div>
                      <h2>Chicken: ${(menuItem.price_chicken / 100).toFixed(2)}</h2>
                      <h2>New Chicken: $</h2>
                      <input type="text"></input>
                    </div>
                    <br />
                  </>
                  : null
                }

                {menuItem.price_veggie ? // Render veggie price if item has it
                  <>
                    <div>
                      <h2>Veggie: ${(menuItem.price_veggie / 100).toFixed(2)}</h2>
                      <h2>New Veggie: $ </h2>
                      <input type="text"></input>
                    </div>
                    <br />
                  </>
                  : null
                }

                <div>
                  {menuItem.info ? // Render description
                    <>
                      <h2>Old Description:</h2>
                      <p>{menuItem.info}</p>
                    </>
                    : null
                  }
                  <h2>New Description:</h2>
                  <textarea className="detailsEditDescription"></textarea>
                </div>
              </div>
            </div>
            <div className="detailsButtonContainer">
              <button className="detailsButton delete"
              onClick={() => handleRemoveItem(menuItem._id)}>
                DELETE ITEM
              </button>
            </div>
            <div className="detailsButtonContainer">
              <button className="detailsButton save">
                SAVE CHANGES
              </button>
            </div>
          </div>
        </>

        : <span>Loading item...</span> // No item
      }
    </div>
  );
};

export { EditItem }
export default EditItem;
