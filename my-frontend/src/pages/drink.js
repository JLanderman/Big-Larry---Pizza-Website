
import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import '../App.css';
import UserService from "../services/UserData";
import Cookies from 'js-cookie';


const Drink= (props) => {
    const [items, setItems] = useState([]);

    const { auth} = useAuth();
    const token = Cookies.get('x-auth-token');

    const handleRemoveItem = async (_id) => {
      const user = await UserService.getUserbyToken(token);
      const confirmation = window.confirm(`Are you sure you want to remove this item from the menu?`);
      console.log('package id:', _id);

      if (confirmation) {
        if (confirmation) {
          // User confirmed, proceed with deletion
          DataService.deleteItem(_id, user, token).then((response) => {
            if (response.status === 200) {
              console.log('Item deleted successfully');
              window.location.reload(); // Refresh the page
            } else {
              console.error('Failed to delete item');
            }
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          }); // Call your deleteItem function with the _id
        }
      }
    };

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
          <div className="drinksContainer">
            
          <div className="text-danger ps-5">
            
            <div>
            {
              Object.keys(drinkByType).map((type) => (
                
                <div key ={type}>
                  <h2>{type}</h2>
                    <div className="row" style={{width: '100%'}}>
                    {
                    drinkByType[type].map((currentItem) =>(
                      <div key={currentItem._id} className="col-6 fs-5 fw-normal">
                        
                          <div className="drinkText">{currentItem.name}</div>  
                        
                              {auth
                                ?                              
                                <div >
                                  <div style={{ display: 'flex', gap: '3px' }}>   
                                  <button
                                    className="border px-10 py- fs-5 rounded-4"
                                    onClick={() => handleRemoveItem(currentItem._id)}
                                  >
                                    Remove
                                  </button>
                                    <h>   </h>
                                    <Link to={`/DrinkForm/${currentItem._id}`}>
                                      <button className="border px-10 py- fs-5 rounded-4">Edit</button>
                                    </Link> 

                                  </div>
                                </div>
                              : null
                              } 
                          {drinkByType[type][0].drinktype === 'Ice Cream  &  Other' ? (<p className="drinkPrice"> ${currentItem.price}</p>): ('')}
                      </div> 
                    )) 
                  }
                  </div>
                  <div>
                      {drinkByType[type][0].price.length == 1 ? (<p className="drinkPrice"> ${drinkByType[type][0].price[0]}</p>): ('')}
                      {drinkByType[type][0].price.length == 2 ? (<p className="drinkPrice">Small: ${drinkByType[type][0].price[0]} &nbsp;&nbsp;&nbsp; Large: ${drinkByType[type][0].price[1]}</p>): ('')}
                      {drinkByType[type][0].price.length == 3 ? (<p className="drinkPrice"> Small: ${drinkByType[type][0].price[0]}   &nbsp;&nbsp;&nbsp; Medium: ${drinkByType[type][0].price[1]} &nbsp;&nbsp;&nbsp; Large: ${drinkByType[type][0].price[2]}</p>): ('')}
                
                      
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
                <Link to="/DrinkForm/">
                  <button className="border px-5 py-3 fs-2 rounded-4">Add New Item</button>
                </Link>
              </div>
            ) : null
          }
          </div>
          
        </div>
        </div>     
      );
    };
    
    
 

    export { Drink };
    export default Drink;
