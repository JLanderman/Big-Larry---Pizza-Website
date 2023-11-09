import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const picUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const Details = () => {
  let [menuItem, setMenuItem] = useState();
  let params = useParams();

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
    <div className="detailsContainer" >
      {menuItem && menuItem.name ? // Load menu item
        <>
          <h1 className="detailsHeader">{menuItem.name}</h1>
          <div className="detailsGrid">
            <div className="detailsFlexContainer">
              <div className="detailsPictureContainer">
                {menuItem.photo ?
                  <img className="detailsPicture" src={picUrl + menuItem.photo}></img>
                  : <div>No picture for item</div>
                }
              </div>
            </div>

            <div className="detailsFlexContainer">
              <div className="detailsItemDetails">
                {menuItem.price ?
                  <h2>Price: ${(menuItem.price / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.price_chicken ?
                  <h2>Chicken: ${(menuItem.price_chicken / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.price_veggie ?
                  <h2>Veggie: ${(menuItem.price_veggie / 100).toFixed(2)}</h2>
                  : null
                }
                {menuItem.info ?
                  <p>{menuItem.info}</p>
                  : <span>No description available.</span>
                }
              </div>
            </div>
          </div>
        </>

        : null // Item still loading
      }
    </div>
  );
};

export { Details }
export default Details;
