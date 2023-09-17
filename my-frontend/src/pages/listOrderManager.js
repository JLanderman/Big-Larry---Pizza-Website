import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListOrderManager = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {
    DataService.getAll()
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <style>
        {`
          .item-container {
            display: flex;
            justify-content: space-between; /* Adjust this property */
            margin-bottom: 10px;
          }

          .item-name {
            flex: 1;
          }

          .item-price {
            /* Remove margin-left property to move prices closer to item names */
          }
        `}
      </style>
      <div className="row">
        {!Array.isArray(items)
          ? items.item.map((currentItem) => {
              return (
                <div className="item-container" key={currentItem._id}>
                  <div className="item-name">
                    <h3 className="food-title">{currentItem.name}</h3>
                    <p className="food-price">${currentItem.price / 100}</p>
                    <p className="food-description">{currentItem.info}</p>
                  </div>
                </div>
              );
            })
          : retrieveItems}
      </div>
    </div>
  );
};

export default ListOrderManager;