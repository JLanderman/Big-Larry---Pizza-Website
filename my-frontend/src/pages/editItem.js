import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const picUrl = 'https://testingschoolproject.s3.us-west-1.amazonaws.com/'

const EditItem = () => {
  let [menuItem, setMenuItem] = useState();
  const [category, setCategory] = useState('');
  let params = useParams();

  // const [selectedSize, setSelectedSize] = useState(null);

  // const handleSizeClick = (index) => {
  //   setSelectedSize(index);
  // };

  useEffect(() => {
    retrieveMenuItem();
  }, []);

  const retrieveMenuItem = () => {
    let url = `http://localhost:5000/pizza/items?_id=${params.id}`;
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
                  <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center'}}>
                    <img className="detailsPicture" src={picUrl + menuItem.photo}></img>
                  </div>
                  : <div>No picture for item</div>
                }
                <button className="detailsButton">
                  Upload Picture
                </button>
                <button className="detailsButton">
                  Remove Picture
                </button>
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
              <button className="detailsButton delete">
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
