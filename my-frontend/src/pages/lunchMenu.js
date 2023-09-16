
import React, { useEffect } from "react";
import DataService from "../services/itemData";
import {Link} from "react-router-dom";
import { useState } from "react";

const Lunch= (props) => {
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
          <div className="row">
            {!Array.isArray(items)
              ? items.item.map((currentItem) => {
                  return (
                   
                        <div >
                          <h3 className="food-title">{currentItem.name}</h3>
                        </div>
                  );
                })
              : retrieveItems}
          </div>
        </div>
       
      );
    };

    export default Lunch;



