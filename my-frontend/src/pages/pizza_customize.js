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
    paddingLeft: '0%',
    paddingRight: '',
    justifyContent: 'center',
    fontSize: '120%'
  },
  button: {
    boxSizing: 'border-box',
    backgroundColor: "rgba(52, 52, 52, 0.08)",
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '10%',
    paddingLeft: '25%',
    color: "black",
    justifyContent: 'center',
    border: '0px solid black'
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

  const priceExtraPersonal = '1.00'
  const priceExtraSmall = '1.50'
  const priceExtraMedium = '2.00'
  const priceExtraLarge = '2.50'
  const priceExtraXLarge = '3.00'

  //2d array is necessary for determining price without a bunch of if/else statements
  const priceChart = [ // [row][column]=[topping][size]
    [priceCheesePersonal, priceCheeseSmall, priceCheeseMedium, priceCheeseLarge, priceCheeseXLarge],
    [priceSinglePersonal, priceSingleSmall, priceSingleMedium, priceSingleLarge, priceSingleXLarge],
    [priceTwoPersonal, priceTwoSmall, priceTwoMedium, priceTwoLarge, priceTwoXLarge],
    [priceThreePersonal, priceThreeSmall, priceThreeMedium, priceThreeLarge, priceThreeXLarge],
    [priceComboPersonal, priceComboSmall, priceComboMedium, priceComboLarge, priceComboXLarge],
    [priceExtraPersonal, priceExtraSmall, priceExtraMedium, priceExtraLarge, priceExtraXLarge]
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

  function priceSelect(size, toppings) {
    if (toppings > 3) {
      return priceChart[4][size];
    } else {
      return priceChart[toppings][size];
    }
  }


  return (
    <div>
      <div className="titleCustom">
        <div>
          <div><h1 style={{color:'red'}}>Topping Options</h1> </div>
        </div>
      </div>
      <div className="toppingButtonsCustom" style={{maxWidth: '80%',minWidth:'610px'}}>
        {toppingList.map((size, index) => (
          <span className="pizzaToppingButtonCustom">
            {size}
          </span>
        ))}
      </div>

      <div className="titleCustom">
        <div>
          <div data-testid="pizzaCustom"><h1 style={{color:'red'}}>Your Choice of Pizza</h1> </div>
        </div>
      </div>
      <div style={{ border: '0px solid', paddingLeft: '20%' }}>
        <table style={{ border: '0px solid', width:'85%', maxWidth: '950px'}}>
          <tr style={{ borderBottom: '1px solid', padding: '5px', fontSize: '120%', }}>
            <th style={{ borderRight: '1px solid', minWidth: '100px' }}>
              <div className="diagonalHeader" style={{display: 'grid', gridTemplateAreas: "'. a' 'b .'"}}>
                <span style={{gridArea:'a', color: 'red', fontSize: '90%'}}>
                  Size
                </span>
                <span style={{gridArea:'b', color: 'red', fontSize: '90%'}}>
                  Topping
                </span>
              </div>
            </th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingLeft: '10px' }}>Personal</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>Small</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>Medium</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>Large</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>X-Large</th>
          </tr>
          <tr style={{ padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', minHeight: '1000px', minWidth: '100px' }}>Cheese</th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px',paddingLeft: '10px' }}>$ {priceChart[0][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[0][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[0][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[0][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[0][4]}</th>
          </tr>
          <tr style={{ padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', minWidth: '100px' }}>1 topping</th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px', paddingLeft: '10px' }}>$ {priceChart[1][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[1][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[1][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[1][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[1][4]}</th>
          </tr>
          <tr style={{ padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', minWidth: '100px' }}>2 topping</th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px', paddingLeft: '10px' }}>$ {priceChart[2][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[2][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[2][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[2][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[2][4]}</th>
          </tr>
          <tr style={{ padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', minWidth: '100px' }}>3 topping</th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px', paddingLeft: '10px' }}>$ {priceChart[3][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[3][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[3][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[3][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[3][4]}</th>
          </tr>
          <tr style={{ padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', flexWrap: 'wrap', textAlign: "left" }}>
              4 or more toppings
              <br></br>
              <h5 style={{fontSize: '90%'}}>(Combo/All Meat/Veggie)</h5>
            </th>

            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px', paddingLeft: '10px' }}>$ {priceChart[4][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[4][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[4][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[4][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[4][4]}</th>
          </tr>
          <tr style={{ borderTop: '1px solid', padding: '5px', fontSize: '120%', textAlign: "left" }}>
            <th style={{ borderRight: '1px solid', minWidth: '100px' }}>Xtra-Topping</th>
            <th style={{ border: '0px solid', minWidth: '110px', paddingTop: '10px', paddingLeft: '10px' }}>$ {priceChart[5][0]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[5][1]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[5][2]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[5][3]}</th>
            <th style={{ border: '0px solid', minWidth: '100px' }}>$ {priceChart[5][4]}</th>
          </tr>
        </table>
      </div>

    </div>
  );
};

export { Pizza_customize }
export default Pizza_customize;
