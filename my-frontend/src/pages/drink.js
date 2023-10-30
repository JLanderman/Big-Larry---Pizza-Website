
import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';



const Drink= (props) => {
    const [items, setItems] = useState([]);

    const { auth} = useAuth(); 


    useEffect(() => {
      retrieveItems();
    }, []);

    
    const retrieveItems = () => {
      DataService.getAllDrink()
        .then((response) => {
          setItems(response.data); 
        })
        .catch((e) => {
          console.log(e);
        });
      };

    const drinkByType = {};
    if(!Array.isArray(items)){
      items.item.map((currentItem => {
        if(!drinkByType[currentItem.drinktype]){
          drinkByType[currentItem.drinktype] = [];
        }
        drinkByType[currentItem.drinktype].push(currentItem);
      }))
    }
    return (

        <div data-testid="drinks">
          <div className="d-flex justify-content-center">
          {
            auth ?
            <div className="text-danger fw-bold"><h1>Modify Your Drink</h1></div>
            : <div><h1 data-testid="BeveragesHeader" className="pb-5 pt-5 text-danger fw-bold">Beverages</h1></div>
          }
          </div>

          <div className="text-danger ps-5">
            
            <div>
            {
              Object.keys(drinkByType).map((type) => (
                
                <div key ={type}>
                  <h2>{type}</h2>
                    <div className="row" style={{width: '100%'}}>
                    {
                    drinkByType[type].map((currentItem) =>(
                      <div key={currentItem.id} className="col-6 text-dark fs-5 fw-normal">
                        
                          <div>{currentItem.name}</div>  
                        
                              {auth
                                ?                              
                                <div >
                                  <div>   
                                    <button className="border px-10 py- fs-5 rounded-4">Remove</button> 
                                    <h>   </h>
                                    <Link to={`/TextForm/${currentItem._id}`}>
                                      <button className="border px-10 py- fs-5 rounded-4">Edit</button>
                                    </Link> 

                                  </div>
                                </div>
                              : null
                              } 
                          {drinkByType[type][0].drinktype === 'Ice Cream  &  Other' ? (<p className="fw-semibold fs-5 text-primary"> ${currentItem.price}</p>): ('')}
                      </div> 
                    )) 
                  }
                  </div>
                  <div>
                      {drinkByType[type][0].price.length == 1 ? (<p className="fw-semibold fs-5 text-primary"> ${drinkByType[type][0].price[0]}</p>): ('')}
                      {drinkByType[type][0].price.length == 2 ? (<p className="fw-semibold fs-5 text-primary">Small: ${drinkByType[type][0].price[0]}  Large: ${drinkByType[type][0].price[1]}</p>): ('')}
                      {drinkByType[type][0].price.length == 3 ? (<p className="fw-semibold fs-5 text-primary"> Small: ${drinkByType[type][0].price[0]}    Medium: ${drinkByType[type][0].price[1]}  Large: ${drinkByType[type][0].price[2]}</p>): ('')}
                
                      
                  </div>
                  
                </div> 
              ))
            }
            </div>
          </div>

          <div className="d-flex justify-content-end pe-5 pt-5">
          {
            auth ? (
              <div>
                <Link to="/TextForm">
                  <button className="border px-5 py-3 fs-2 rounded-4">Add New Item</button>
                </Link>
              </div>
            ) : null
          }
          </div>
        </div>     
      );
    };
    
    
 

    export { Drink };
    export default Drink;
