import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const Lunch= (props) => {
    const [items, setItems] = useState([]);
  

    useEffect(() => {
      retrieveItems();
    }, []);
  
    const retrieveItems = () => {
      DataService.getAllLunch()
        .then((response) => {
          setItems(response.data); 
        })
        .catch((e) => {
          console.log(e);
        });
    };
    return (
        <div>
          <div className="d-flex justify-content-center">
            <h1 className="pb-5 pt-5">SAM'S LUNCH && DINNER </h1>
          </div>
        
          <div className="row pt-5">
            {!Array.isArray(items)
              ? items.item.map((currentItem) => {
                  return (                  
                        <div className="col-lg-4 pb-3 px-5">
                           <h3 className="food-title">{currentItem.name}</h3>
                        </div>
                  );
                })
              : retrieveItems}
          </div>
          <div className="d-flex justify-content-end pe-5 pt-5">
            <button className="border px-5 py-3 fs-2 rounded-4">Add To Cart</button>
          </div>
        </div>     
      );
    };

    export default Lunch;



