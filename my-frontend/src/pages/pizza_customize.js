import React from "react";
import styled from "styled-components";
import styles from "./pizza_customize.css";
import PizzaCombinationImage from "../images/Pizza Specialties/Pizza Combination.png"; 


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const moreStyles = {
  innerContainer: {
    paddingTop: '1%',
    paddingBottom: '1%',
    width: 'flex',
    maxWidth: '150px',
    minHeight: '',
    height: '25%',
    paddingLeft:'0%',
    paddingRight:'',
    justifyContent: 'center',
    fontSize:'120%'
  },
  button:{
		boxSizing:'border-box', 
		backgroundColor: "rgba(52, 52, 52, 0.08)",
		paddingTop:'10px', 
		paddingBottom:'10px',
    paddingRight:'10%',
    paddingLeft:'25%',
		color: "black",
		justifyContent:'center',
		border:'0px solid black'
	},
}

const Pizza_customize = () => {
  
  const priceCheesePersonal = '4.99'
  const priceCheeseSmall = '6.50'
  const priceCheeseMedium = '7.99'
  const priceCheeseLarge = '9.95'
  const priceCheeseXLarge = '15.99'

  const priceSinglePersonal = '5.99'
  const priceSingleSmall = '6.99'
  const priceSingleMedium = '8.99'
  const priceSingleLarge = '10.95'
  const priceSingleXLarge = '15.99'

  const priceTwoPersonal = '6.50'
  const priceTwoSmall = '7.99'
  const priceTwoMedium = '10.99'
  const priceTwoLarge = '13.99'
  const priceTwoXLarge = '16.95'

  const priceThreePersonal = '6.99'
  const priceThreeSmall = '8.99'
  const priceThreeMedium = '12.99'
  const priceThreeLarge = '15.99'
  const priceThreeXLarge = '18.95'

  const priceComboPersonal = '8.50'
  const priceComboSmall = '10.99'
  const priceComboMedium = '15.99'
  const priceComboLarge = '18.99'
  const priceComboXLarge = '22.99'

  //allows importing from database one by one if you import into above values if thats easier
  //2d array is necessary for determining price without a bunch of if/else statements
  const priceChart = [ // [row][column]=[topping][size] *remember index is numbered 0-4*
    [priceCheesePersonal, priceCheeseSmall, priceCheeseMedium, priceCheeseLarge, priceCheeseXLarge],
    [priceSinglePersonal, priceSingleSmall, priceSingleMedium, priceSingleLarge, priceSingleXLarge],
    [priceTwoPersonal   , priceTwoSmall   , priceTwoMedium   , priceTwoLarge   , priceTwoXLarge],
    [priceThreePersonal , priceThreeSmall , priceThreeMedium , priceThreeLarge , priceThreeXLarge],
    [priceComboPersonal , priceComboSmall , priceComboMedium , priceComboLarge , priceComboXLarge]
  ]




  const sizeList = [
    "P", "S", "M", "L", "XL"
  ];

  const toppingList = [
    "Cheese",            //why is cheese a topping?
    "Pepperoni", 
    "Salami", 
    "Ground Beef", 
    "Sausage", 
    "Linguica", 
    "Chicken", 
    "Ham", 
    "Onion", 
    "Bell pepper",
    "Cilantro", 
    "Pineapple", 
    "Tomato", 
    "Artichoke", 
    "Pepperoncini", 
    "Anchovies",
  ];
  const [selectedSize, setSelectedSize] = useState(0); //default size is personal

  const [selectedTopping, setSelectedTopping] = useState([]);
  
  const [price, setPrice] = useState(priceSelect(selectedSize, selectedTopping.length)) //initializes price properly

  const handleSizeClick = (index) => {
    setSelectedSize(index);
    setPrice(priceSelect(index, selectedTopping.length));
    //implement logic for finding price and call setPrice with the new price
      //logic in new function? woulld be neater
      //look into mutiple variable arrays
    //price needs displayed after size is chosen, then updating after every button
    //default size = personal?
    //so implement an update here with no conditions
    //and update in the toppings when selectedSize exists
  };

  const handleToppingClick = (index) => {
    // Check if the topping is already selected
    if (selectedTopping.includes(index)) {
      // If selected, remove it
      setSelectedTopping(prevSelected => prevSelected.filter((item) => item !== index));
      setPrice(priceSelect(selectedSize, selectedTopping.length - 1)); //this gets it done since it is only adding 1 thing at a time
    } else {
      // If not selected, add it
      setSelectedTopping((prevSelected) => [...prevSelected, index]);
      setPrice(priceSelect(selectedSize, selectedTopping.length + 1));
    }
  }; // This block of code is for selecting >1 possible toppings

  function priceSelect(size, toppings){
    if (toppings > 3){
      return priceChart[4][size];
    } else {
      return priceChart[toppings][size];
    }
  }


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

        <div className = "descriptionCustom" style={moreStyles.innerContainer}>
          <div className = "square rounded-pill" style={moreStyles.button}>
            <h4 style={{fontSize:'150%'}}>
              Price:
            </h4>
            <h5 style={{fontSize:'150%'}}>
              ${price}
            </h5>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pizza_customize;
