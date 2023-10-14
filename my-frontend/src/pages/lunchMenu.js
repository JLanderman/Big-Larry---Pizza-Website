
import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/authContext';
import Cookies from 'js-cookie';


const Lunch = (props) => {
    const [items, setItems] = useState([]);

    const { auth} = useAuth(); 

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
        <div data-testid="lunch">
          <div className="d-flex justify-content-center">
          {
            auth ?
            <div><h1>MODIFY YOUR LUNCH AND DINNER </h1></div>
            : <div><h1 className="pb-5 pt-5">SAM'S LUNCH && DINNER </h1></div>
          }
          </div>
          <div className="row pt-5">  
            {!Array.isArray(items)
              ? items.item.map((currentItem) => {
                  return (                  
                        <div className="col-lg-4 pb-3 px-5" data-testid="lunchItem"> 
                       
                            <div >
                              <h3 className="food-title">{currentItem.name}</h3>
                            </div>
                            {auth
                              ?                              
                              <div >
                                <div>   
                                  <button className="border px-10 py- fs-5 rounded-4">Remove</button> 
                                  <h>   </h>
                                  <button className="border px-10 py- fs-5 rounded-4">Edit</button> 
                                </div>
                              </div>
                             : null
                            }
                          </div>
                  );
                })
              : retrieveItems}
          </div>




          <div className="d-flex justify-content-end pe-5 pt-5">
          {
            auth ? 
            <div><button className="border px-5 py-3 fs-2 rounded-4">Add New Item</button></div>
            : null
          }
          </div>
        </div>     
      );
    };

    export { Lunch }
    export default Lunch;



