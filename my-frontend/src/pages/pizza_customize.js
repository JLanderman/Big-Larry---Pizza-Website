import React from "react";
import styled from "styled-components";
import styles from "./pizza_customize.css";
import PizzaCombinationImage from "../images/Pizza Specialties/Pizza Combination.png"; 


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Pizza_customize = () => {
  

  const sizeList = [
    "P", "S", "M", "L", "XL"
  ];

  const toppingList = [
    "Cheese", 
    "Pepperoni", 
    "Salami", 
    "Ground Beef", 
    "Sausage", 
    "Linguica", 
    "Chicken", 
    "Ham", 
    "Onion", 
    "Bell pepper", 
    "Onion", 
    "Cilantro", 
    "Pineapple", 
    "Tomato", 
    "Artichoke", 
    "Pepperoncini", 
    "Anchovies",
    ""
  ];
  
  const [selectedSize, setSelectedSize] = useState([null]);

  const handleSizeClick = (index) => {
    setSelectedSize(index);
  };
  const [selectedTopping, setSelectedTopping] = useState([]);

  /*const handleToppingClick = (index) => {
    if (selectedTopping === index) {
      // If the clicked button is already selected, deselect it
      setSelectedTopping(null);
    } else {
      // Otherwise, select the clicked button
      setSelectedTopping(index);
    }
  };*///This block of code is for 1 topping only

  const handleToppingClick = (index) => {
    // Check if the topping is already selected
    if (selectedTopping.includes(index)) {
      // If selected, remove it
      setSelectedTopping((prevSelected) =>
        prevSelected.filter((item) => item !== index)
      );
    } else {
      // If not selected, add it
      setSelectedTopping((prevSelected) => [...prevSelected, index]);
    }
  }; // This block of code is for selecting >1 possible toppings




  return (
    <div>
      <div className = "titleCustom">
        <div> 
          <div><h1>Choose your size</h1> </div>
        </div>
      </div>
      <div className="sizeButtonsCustom">
        {sizeList.map((size, index) => (
          <button
            key={index}
            className={`pizzaSizeButtonCustom ${
              selectedSize === index ? "selected" : ""
            }`}
            onClick={() => handleSizeClick(index)}
          >
            {size}
          </button>
        ))}
      </div>
      <div className = "titleCustom">
        <div>
          <div><h1>Choose your toppings</h1> </div>
        </div>
      </div>
      <div className="toppingButtonsCustom">
        {toppingList.map((size, index) => (
          <button
            key={index}
            className={`pizzaToppingButtonCustom ${
              selectedTopping.includes(index) ? "selected" : ""
            }`}
            onClick={() => handleToppingClick(index)}
          >
            {size}
          </button>
        ))}
      </div>
      <div className = "myContainerCustom">
        <div className = "pictureCustom">
         <img src={PizzaCombinationImage} alt="Pizza CombinationCustom" />
        </div>

        <div className = "descriptionCustom">
        <div className = "buttonContainerCustom">
            <select name = "menu" id = "menu-select">
              <option value= "1">1</option>
              <option value= "2">2</option>
              <option value= "3">3</option>
            </select>
            < button className="myButtonCustom">
               Add to cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pizza_customize;
