import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/itemData";

const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const Details = () => {
  let [menuItem, setMenuItem] = useState();
  let params = useParams();

  // const [selectedSize, setSelectedSize] = useState(null);

  // const handleSizeClick = (index) => {
  //   setSelectedSize(index);
  // };
    
// eslint-disable-next-line
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

  return (
    <div className="detailsContainer" data-testid="container">
      {menuItem && menuItem.name ? // Load menu item
        <div data-testid="itemDetails">
          <h1 className="detailsHeader" data-testid="itemName">{menuItem.name}</h1>
          <div className="detailsGrid">
            <div className="detailsFlexContainer">
              <div className="detailsPictureContainer">
                {menuItem.photo ?
                  <img className="detailsPicture" src={picUrl + menuItem.photo} alt=""></img>
                  : <div>No picture for item</div>
                }
              </div>
            </div>

            <div className="detailsFlexContainer">
              <div className="detailsItemDetails">
                {menuItem.price ?
                  <h2 data-testid="itemPrice">Price: ${(menuItem.price / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.price_chicken ?
                  <h2 data-testid="itemChickenPrice">Chicken: ${(menuItem.price_chicken / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.price_veggie ?
                  <h2 data-testid="itemVeggiePrice">Veggie: ${(menuItem.price_veggie / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.info ?
                  <p data-testid="itemInfo">{menuItem.info}</p>
                  : <span>No description available.</span>
                }
              </div>
            </div>
          </div>
        </div>

        : null // Item still loading
      }
    </div>
  );
};

export { Details }
export default Details;
