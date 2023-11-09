import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "./pizza_customize.css";
import PizzaCombinationImage from "../images/Pizza Specialties/Pizza Combination.png";
import DataService from "../services/itemData";
import Cookies from "js-cookie";

const Pizza_customize = () => {
  const token = Cookies.get('x-auth-token');
  const [toppingPrices, setToppingPrices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchToppingPrices = async () => {
      try {
        const response = await DataService.getAllToppingsPrices();
        setToppingPrices(response);
      } catch (error) {
        console.error("Error fetching topping prices:", error);
      }
    };

    fetchToppingPrices();

    // Check if there is a token and set isAdmin accordingly
    setIsAdmin(!!token); // !!token will be true if token is present, otherwise false
  }, [token]);

  const sizeList = ["P", "S", "M", "L", "XL"];
  const sizeLabels = ["price_p", "price_s", "price_m", "price_l", "price_xl"]; // Modified labels for sizes

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
    "Cilantro",
    "Pineapple",
    "Tomato",
    "Artichoke",
    "Pepperoncini",
    "Anchovies",
  ];

  const toppingLabels = [
    "Cheese",
    "1 Topping",
    "2 Toppings",
    "3 Toppings",
    "4 Toppings",
    "Xtra-Topping",
  ];

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedTopping, setSelectedTopping] = useState([]);
  const [price, setPrice] = useState(priceSelect(sizeLabels[selectedSize], selectedTopping.length));

  const handleSizeClick = (index) => {
    setSelectedSize(index);
    setPrice(priceSelect(sizeLabels[index], selectedTopping.length));
  };

  const handleToppingClick = (index) => {
    if (selectedTopping.includes(index)) {
      setSelectedTopping((prevSelected) => prevSelected.filter((item) => item !== index));
      setPrice(priceSelect(sizeLabels[selectedSize], selectedTopping.length - 1));
    } else {
      setSelectedTopping((prevSelected) => [...prevSelected, index]);
      setPrice(priceSelect(sizeLabels[selectedSize], selectedTopping.length + 1));
    }
  };

  const handleUpdate = () => {
    const selectedToppingCategory = toppingLabels[selectedTopping.length];
    const selectedSizeLabel = sizeLabels[selectedSize];
    const updatedPrice = parseFloat(price);
  
    // Call the updateCustomToppingPrice function with separate parameters
    DataService.updateCustomToppingPrice(
      selectedToppingCategory,
      selectedSizeLabel, // Pass the size directly without the 'price_' prefix
      updatedPrice
    )
      .then((response) => {
        console.log("Topping updated successfully:", response);
        // Reset form fields after successful update
        setSelectedTopping([]);
        setSelectedSize(0);
        setPrice(priceSelect(sizeLabels[0], 0));
      })
      .catch((error) => {
        console.error("Error updating topping price:", error);
      });
  };
  
  function priceSelect(size, toppings) {
    if (!toppingPrices || toppingPrices.length === 0) {
      //console.error("Topping prices not available");
      return 0;
    }

    const sizeString = typeof size === "string" ? size : String(size);

    if (toppings > 3) {
      return toppingPrices[4]?.prices?.[`price_${sizeString.toLowerCase()}`] || 0;
    } else {
      return toppingPrices[toppings]?.prices?.[`price_${sizeString.toLowerCase()}`] || 0;
    }
  }

  // Render the update form only if the user is an admin
  const renderUpdateForm = () => {
    if (isAdmin) {
      return (
        <div>
          <h2 style={{ color: "red" }}>Update Topping Price</h2>
          <div>
            <label>Select Topping Category:</label>
            <select onChange={(e) => setSelectedTopping(parseInt(e.target.value))}>
              {toppingLabels.map((label, index) => (
                <option key={index} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Size:</label>
            <select onChange={(e) => setSelectedSize(parseInt(e.target.value))}>
              {sizeLabels.map((label, index) => (
                <option key={index} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Enter Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <button onClick={handleUpdate}>Update Price</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="titleCustom">
        <div>
          <div>
            <h1 style={{ color: "red" }}>Topping Options</h1>
          </div>
        </div>
      </div>
      <div className="toppingButtonsCustom" style={{ maxWidth: "80%", minWidth: "610px" }}>
        {toppingList.map((size, index) => (
          <span key={index} className="pizzaToppingButtonCustom" onClick={() => handleToppingClick(index)}>
            {size}
          </span>
        ))}
      </div>

      <div className="titleCustom">
        <div>
          <div data-testid="pizzaCustom">
            <h1 style={{ color: "red" }}>Your Choice of Pizza</h1>
          </div>
        </div>
      </div>
      <div style={{ border: "0px solid", paddingLeft: "20%" }}>
        <table style={{ border: "0px solid", width: "85%", maxWidth: "950px" }}>
          <tr style={{ borderBottom: "1px solid", padding: "5px", fontSize: "120%" }}>
            <th style={{ borderRight: "1px solid", minWidth: "100px" }}>
              <div
                className="diagonalHeader"
                style={{ display: "grid", gridTemplateAreas: "'. a' 'b .'" }}
              >
                <span style={{ gridArea: "a", color: "red", fontSize: "90%" }}>Size</span>
                <span style={{ gridArea: "b", color: "red", fontSize: "90%" }}>Topping</span>
              </div>
            </th>
            {sizeLabels.map((label, sizeIndex) => (
              <th key={sizeIndex} style={{ border: "0px solid", minWidth: "100px", paddingLeft: "10px" }}>
                {label}
              </th>
            ))}
          </tr>
          {toppingPrices.map((topping, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index === 4 ? "1px solid" : "0px",
                padding: "5px",
                fontSize: "120%",
              }}
            >
              <th style={{ borderRight: "1px solid", minWidth: "100px" }}>
                {toppingLabels[index]}
                {index === 4 && (
                  <div style={{ fontSize: "80%", marginTop: "5px" }}>(combo/allmeat/veggie)</div>
                )}
              </th>
              {sizeList.map((size, sizeIndex) => (
                <th key={sizeIndex} style={{ border: "0px solid", minWidth: "100px" }}>
                  {topping.prices[`price_${size.toLowerCase()}`]}
                </th>
              ))}
            </tr>
          ))}
        </table>
      </div>

      {/* Render the update form */}
      {renderUpdateForm()}
    </div>
  );
};

export { Pizza_customize };
export default Pizza_customize;
