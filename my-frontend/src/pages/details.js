import React from "react";
import styled from "styled-components";
import styles from "./details.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const picUrl = 'https://testingschoolproject.s3.us-west-1.amazonaws.com/'

const Details = () => {
  let [menuItem, setMenuItem] = useState();
  let params = useParams();

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (index) => {
    setSelectedSize(index);
  };

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
      .catch((e) => 
      {
        console.log(e);
      });
  };

  return (
    <div data-testid="details">
      <div className = "title">
        <div>
          <div><h1>Item Details</h1> </div>
        </div>
      </div>

      <div className = "myContainer">
        <div className = "picture">
          <div>{menuItem ? 
            <img 
            className = "itemPicture" src ={picUrl + menuItem.photo}></img> : 
            <p>Loading Name</p>}
          </div>
        </div>

        <div className = "description">
          <div>
            <div>{menuItem && menuItem.name ? <h1>{menuItem.name}</h1> : <p>Loading Name</p>}</div>
            <div>{menuItem && menuItem.info ? <h4><p>{menuItem.info}</p></h4> : null}</div>
            <div>{menuItem && menuItem.price ? <h2><p>${(menuItem.price / 100).toFixed(2)}</p></h2> : null}</div>
            <div>{menuItem && menuItem.price_chicken ? <p>Chicken: ${(menuItem.price_chicken / 100).toFixed(2)}</p> : null}</div>
            <div>{menuItem && menuItem.price_veggie ? <p>Veggie: ${(menuItem.price_veggie / 100).toFixed(2)}</p> : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Details }
export default Details;
