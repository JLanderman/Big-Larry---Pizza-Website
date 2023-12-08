import React, { useState, useEffect } from "react";
import DataService from "../services/itemData";
import Cookies from "js-cookie";
import UserService from "../services/UserData";
import { useAuth } from '../contexts/authContext';
import './pizza_customize.css';

const Pizza_customize = () => {
  const token = Cookies.get('x-auth-token');
  const [toppingPrices, setToppingPrices] = useState([]);
  const [selectedToppingCategory, setSelectedToppingCategory] = useState(null);
  const { auth } = useAuth();


  useEffect(() => {
    const fetchToppingPrices = async () => {
      try {
        const response = await DataService.getAllToppingsPrices();
        console.log(response);
        setToppingPrices(response);
      } catch (error) {
        console.error("Error fetching topping prices:", error);
      }
    };
  
    fetchToppingPrices();
  }, [token]);
  

  const sizeList = ["P", "S", "M", "L", "XL"];
  const sizeLabels = ["price_p", "price_s", "price_m", "price_l", "price_xl"];
  const displaySizeLabels = ["Personal", "Small", "Medium", "Large", "X-Large"];

  const toppingList = [
    "Cheese", "Pepperoni", "Salami", "Ground Beef", "Sausage", "Linguica",
    "Chicken", "Ham", "Onion", "Bell pepper", "Cilantro", "Pineapple",
    "Tomato", "Artichoke", "Pepperoncini", "Anchovies",
  ].map(topping => topping + " ");

  const toppingLabels = [
    "Cheese",
    "1 Topping",
    "2 Toppings",
    "3 Toppings",
    "4 Toppings",
    "Xtra-Topping",
  ];

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState([]);
  const [price, setPrice] = useState(priceSelect(selectedSize, selectedTopping.length));


  const handleToppingClick = (index) => {
    const selectedToppingName = toppingList[index];

    setSelectedTopping([selectedToppingName]);

    let toppingCategory = "";
    if (selectedTopping.length === 1) {
      toppingCategory = "topping_1";
    } else if (selectedTopping.length === 4) {
      toppingCategory = "comboVeggieAllMeat";
    } else {
      toppingCategory = `xTopping${selectedTopping.length}Cheese`;
    }

    setSelectedToppingCategory(toppingCategory);

    setPrice(priceSelect(selectedSize, selectedToppingName === "Cheese" ? 0 : 1));
  };

  const handleUpdate = async () => {
    const user = await UserService.getUserbyToken(token);
    const selectedSizeLabel = sizeLabels[selectedSize];
    const updatedPrice = parseFloat(price);

    let mappedToppingCategory = "";
    switch (selectedToppingCategory) {
      case "1 Topping":
        mappedToppingCategory = "topping_1";
        break;
      case "2 Toppings":
        mappedToppingCategory = "topping_2";
        break;
      case "3 Toppings":
        mappedToppingCategory = "topping_3";
        break;
      case "4 Toppings":
        mappedToppingCategory = "comboVeggieAllMeat";
        break;
      case "Xtra-Topping":
        mappedToppingCategory = "xToppingxCheese";
        break;
      default:
        mappedToppingCategory = selectedToppingCategory;
    }

    DataService.updateCustomToppingPrice(
      mappedToppingCategory,
      selectedSizeLabel,
      updatedPrice,
      user,
      token
    )
      .then((response) => {
        console.log("Topping updated successfully:", response);
        setSelectedTopping([]);
        setSelectedSize(null);
        setPrice(priceSelect(null, 0));
        setSelectedToppingCategory(null);

        // refresh page to update price
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating topping price:", error);
      });
  };

  function priceSelect(size, toppings) {
    if (!toppingPrices || toppingPrices.length === 0 || size === null) {
      return 0;
    }

    const sizeString = typeof size === "string" ? sizeLabels[size] : sizeLabels[size];

    if (toppings > 3) {
      return toppingPrices[4]?.prices?.[`price_${sizeString.toLowerCase()}`] || 0;
    } else {
      return toppingPrices[toppings]?.prices?.[`price_${sizeString.toLowerCase()}`] || 0;
    }
  }

  const renderUpdateForm = () => {
    if (auth) {
      return (
        <div>
          <h2 style={{ color: "red" }}>Update Topping Price</h2>
          <div>
            <label>Select Topping Category:</label>
            <select onChange={(e) => setSelectedToppingCategory(e.target.value)} value={selectedToppingCategory || ''}>
              <option value="" disabled>Select Topping Category</option>
              {toppingLabels.map((label, index) => (
                <option key={index} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select size:</label>
            <select onChange={(e) => setSelectedSize(parseInt(e.target.value))} value={selectedSize !== null ? selectedSize : ''}>
              <option value="" disabled>Select Size</option>
              {displaySizeLabels.map((label, index) => (
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
    <div data-testid="container">
      <div className="titleCustom">
        <h1>Topping Options</h1>
      </div>
      <div className="pageContainer" >
        {toppingList.map((size, index) => (
          <span key={index} className="pizzaToppingButtonCustom" onClick={() => handleToppingClick(index)} data-testid={`clickTopping${size}`}>
            {size}
          </span>
        ))}
      </div>

      <div className="titleCustom">
        <div>
          <div>
            <h1>Your Choice of Pizza</h1>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>
                <div
                  className="diagonalHeader"
                  style={{
                    display: "grid",
                    gridTemplateAreas: "'. a' 'b .'",
                    position: "relative",
                  }}
                >
                  <span style={{ gridArea: "a", color: "red", fontSize: "90%" }}>Size</span>
                  <span style={{ gridArea: "b", color: "red", fontSize: "90%" }}>Topping</span>
                  <div
                    className="diagonalLine"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ width: "100%", height: "100%" }}
                    >
                        <line
                          x1="0"
                          y1="0"
                          x2="100"
                          y2="100"
                          style={{
                            stroke: "var(--clr-txt)",
                            strokeWidth: 1,
                          }}
                        />
                    </svg>
                  </div>
                </div>
              </th>
              {displaySizeLabels.map((label, sizeIndex) => (
                <th key={sizeIndex} style={{ border: "0px solid", minWidth: "100px" }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {toppingPrices.map((topping, index) => (
              <tr data-testid="row"
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
          </tbody>
        </table>
      </div>

      {renderUpdateForm()}
    </div>
  );
};

export { Pizza_customize };
export default Pizza_customize;
