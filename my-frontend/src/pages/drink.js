
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/authContext";
import Cookies from 'js-cookie';




const Drink_specialties = () =>{
    const coldDrink  = [
        "Coke",
        "Diet Coke ",
        "Sprite",       
        "RootBeer", 
        "Lemonade",
        "Orange"
    ];

    const litterDrink = [
        "Pepsi",
        "Diet-Peps", 
        "Mountain-Dew",
        "Mr.Pibn", 
        "Fanta"

    ];

    const shavedIce = [
        "Vannila", 
        "Strawberry", 
        "Cherry", 
        "Pine-apple", 
        "Kiwi", 
        "Blueberry", 
        "Rainbow"
    ]; 

    const milkShakes = [
        "Strawberry", 
        "Chocolate", 
        "Vannila", 
        "Oreo", 
        "Pine-apple", 
        "Banana", 
        "Cherry", 
        "Malt", 
        "Caramel", 
        "Cappuccio"
    ]; 

    const smoothies = [
        "Strawberry",
        "Banna", 
        "Mango", 
        "Green Tea", 
        "Green apple", 

    ];

    const otherDrink= [
        "Rootbeer Float", 
        "Sunday",
        "Banana-Boat", 
        "Ice-coffee", 
        "Thai Tea"
    ]; 

    const [cold_drink, set_coldDrink] = useState([null]);
    const [litter_drink, set_litterDrink] = useState ([null]); 
    const [shaved_ice, set_shavedIce] = useState([null]);
    const [milk_shakes, set_milkShakes] = useState([null]);
    const [smoothie_drink, set_smoothies] = useState([null]);
    const [other_drink, set_other] = useState([null]); 

    const {auth} = useAuth();


    const selectedButton1 = (clicked) =>{set_coldDrink(clicked)};
    const selectedButton2 = (clicked) =>{set_litterDrink(clicked)};
    const selectedButton3 =(clicked) =>{set_shavedIce(clicked)};
    const selectedButton4 =(clicked) =>{set_milkShakes(clicked)};
    const setectedButton5 =(clicked) =>{set_smoothies(clicked)};
    const selectedButton6 =(clicked) =>{set_other(clicked)};



    return(
        <div className="ps-5">           
        <h1>Beverages</h1> 
          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">Cold Drink</h4>            
            {coldDrink.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>

                  {
                    auth ?
                    <div> 
                      <button>Remove</button>
                      <h> </h>
                      <button>Edit</button>
                    </div>

                    : null
                  }
                </div>
              ))}
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
          </div>
          
          
          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">2-Litter Soda Choices</h4>            
            {litterDrink.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>
                  {
                    auth ?
                    <div>
                       <button>Remove</button>
                       <h> </h>
                       <button>Edit</button>
                    </div>
                    : null
                  }
                </div>
              ))}
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
          </div>

          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">Shaved Ice Choices</h4>            
            {shavedIce.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>
                  {
                    auth?
                    <div>
                      <button>Remove</button>
                      <h> </h>
                      <button>Edit</button>
                    </div>:
                    null
                  }
                </div>
              ))}
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
          </div>

          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">Milkshakes</h4>            
            {milkShakes.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>

                  {
                    auth ?
                    <div>
                      <button>Remove</button>
                      <h> </h>
                      <button>Edit</button>
                    </div>:
                    null
                  }
                </div>
              ))}
            
          </div>

          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">Smoothies</h4>            
            {smoothies.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>
                  {
                    auth ? 
                    <div>
                      <button>Remove</button>
                      <h> </h>
                      <button>Edit</button>
                    </div>: null
                  }
                </div>
              ))}
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
          </div>


          <div className="row pt-5 pb-4"> 
            <h4 className="text-danger fw-bold pb-1">Freeze/Float xx Ice-Cream  xx Recent Updated Drinks</h4>            
            {otherDrink.map((item, index) => (
                <div className="col" >
                  <h3 key={index}>{item}</h3>
                  {
                    auth ?
                    <div>
                      <button>Remove</button>
                      <h> </h>
                      <button>Edit</button>
                    </div>: null
                  }
                </div>
              ))}
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
          </div>


          <div className="d-flex justify-content-end pe-5 pt-5">



            {
              auth ? 
              <div>
              <button className="border px-5 py-3 fs-2 rounded-4">Add New Item </button>
              </div> : null
            }
          </div>

        </div>  
        
        
      
       
    );
    };
    export default Drink_specialties;
