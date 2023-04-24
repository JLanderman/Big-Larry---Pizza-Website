import React from "react";
import styled from "styled-components";
import styles from "./details.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  let [menuItem, setMenuItem] = useState();
  let params = useParams();

  useEffect(() => {
    retrieveMenuItem();
  }, []);

  const retrieveMenuItem = () => {
    let url = `http://localhost:5000/pizza/items?_id=${params.id}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMenuItem(data[0]);
      })
      .catch((e) => 
      {
        console.log(e);
      });
  };

  return (
    <div>


      <div className = "myContainer">
      
        <div className = "picture"
        >
          <div>{menuItem ? 

          <img 
          className = "itemPicture" src ={menuItem.photo}></img> : 
        <p>Loading Name</p>}</div>

        </div>

        <div className = "description">
        <div>
          
        <div>{menuItem ? <h1>{menuItem.name}</h1> : <p>Loading Name</p>}</div>
        <div>{menuItem ? <p>{menuItem.info}</p> : <p> Loading information</p>}</div>
        </div>
        <div className = "buttonContainer">
        <select name = "menu" id = "menu-select">
          <option value= "1">1</option>
          <option value= "2">2</option>
          <option value= "3">3</option>
        </select>
        < button className="myButton">
           Add to card
        </button>
        </div>
        </div>
       
      
      </div>

     

     






    </div>
  );
};

export default Details;
