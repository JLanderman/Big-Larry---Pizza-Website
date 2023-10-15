import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/authContext';
import '../App.css';
import Cookies from 'js-cookie';


const Lunch= (props) => {
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
// I left this previous code in case I broke something. If it didn't, it should be removed ASAP. -Skyler
        // <div>
        //   <div className="d-flex justify-content-center">
        //   {
        //     auth ?
        //     <div><h1>MODIFY YOUR LUNCH AND DINNER </h1></div>
        //     : <div><h1 className="pb-5 pt-5">SAM'S LUNCH & DINNER </h1></div>
        //   }
        //   </div>
        //   <div className="row pt-5">  
        //     {!Array.isArray(items)
        //       ? items.item.map((currentItem) => {
        //           return (                  
        //                 <div className="col-lg-4 pb-3 px-5">
                       
        //                     <div >
        //                       <h3 className="food-title">{currentItem.name}</h3>
        //                     </div>
        //                     {auth
        //                       ?                              
        //                       <div >
        //                         <div>   
        //                           <button>Remove</button> 
        //                           <h>  </h>
        //                           <button>Edit</button> 
        //                         </div>
        //                       </div>
        //                      : null
        //                     }
        //                   </div>
        //           );
        //         })
        //       : retrieveItems}
        //   </div>
        <div>
          <div className="lunchHeader">
            <h1 className="text-center">Sam's Lunch & Dinner</h1>
          </div>
          <div>
            <div className="row px-4">
              {!Array.isArray(items)
                ? items.item.map((currentItem) => {
                    return (
                      <>
                      <div className="col-lg-4" key={currentItem.id}>
                        <div className="lunchText">
                          <h3 className="food-title">{currentItem.name}</h3>
                        </div>
                      </div><div className="col-lg-4" key={currentItem.id}>
                          <div className="lunchText">
                            {currentItem.price_small ? (
                              <h4>Small: ${(currentItem.price_small / 100).toFixed(2)}</h4>
                            ) : (
                              <h4>${(currentItem.price / 100).toFixed(2)}</h4>
                            )}
                          </div>
                        </div><div className="col-lg-4" key={currentItem.id}>
                          <div className="lunchText">
                            {currentItem.price_large && <h4>Large: ${(currentItem.price_large / 100).toFixed(2)}</h4>}
                          </div>
                        </div>
                      </>
                    );
                  })
                : retrieveItems}
            </div>
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

    export default Lunch;



