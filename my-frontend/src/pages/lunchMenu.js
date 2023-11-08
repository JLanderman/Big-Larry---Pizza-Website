import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/authContext';
import '../App.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';



const Lunch = (props) => {
    const [items, setItems] = useState([]);

    const { auth} = useAuth(); 

    const handleRemoveItem = (_id) => {
      const confirmation = window.confirm(`Are you sure you want to remove this item from the menu?`);
      console.log('package id:', _id);

      if (confirmation) {
        if (confirmation) {
          // User confirmed, proceed with deletion
          DataService.deleteItem(_id).then((response) => {
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
          <div className="lunchHeader">
          {
            auth ?
            <h1>MODIFY YOUR LUNCH AND DINNER </h1>
            : <h1 className="text-center">SAM'S LUNCH & DINNER</h1>
          }
          </div>
          <div>
            <div className="row px-4" data-testid="lunchItem" style={{width: '100%'}}>
              {!Array.isArray(items)
                ? items.item.map((currentItem) => {
                    return (
                      <>
                      <div className="col-lg-4" key={currentItem.id}>
                        <div className="lunchText">
                          <h3 className="food-title">{currentItem.name}</h3>
                        </div>
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
                                    <Link to={`/TextForm/${currentItem._id}`}>
                                      <button className="border px-10 py- fs-5 rounded-4">Edit</button>
                                    </Link> 

                                  </div>
                              </div>
                             : null
                            }
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
                : null}
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

    export { Lunch }
    export default Lunch;