/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {NavLink,} from '../components/Navbar/NavbarElements';
import { Button } from "react-bootstrap";

const styles={
	button:{
		boxSizing:'border-box', 
		backgroundColor: "var(--clr-menu-light)",
		paddingTop:'10px', 
		paddingBottom:'10px',
		color: "blue",
		justifyContent:'center',
		border:'2px solid black'
	}
}

const Cart = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);
  
	// tells react hooks that it needs to do something after render.
	useEffect(() => {
	  retrieveItems();
	}, []);
  
	const retrieveItems = () => {
	  DataService.getAllCart()
		.then((response) => {
		  setItems(response.data);
		})
		.catch((e) => {
		  console.log(e);
		});
	};

	return (
	  <div>
		
		<h2 className="card" style={{paddingLeft:'5%', paddingTop:'1%', paddingBottom:'0%', border:'0px solid black', backgroundColor: 'transparent'}}>Cart</h2>
		<h3 className="card" style={{paddingLeft:'5%', paddingTop:'0%', paddingBottom:'1%', border:'0px solid black', backgroundColor: 'transparent'}}>Sam's Pizza & More</h3>
		
		<div>
		  {!Array.isArray(items)
			? items.item.map((currentItem) => {
				const quantity = 1;
				return (

							<div style={{display:'flex', flexDirection:'row', paddingLeft:'5%'}}>
								<p className="card-text">
									<h5>
										<Link to={`/details/${currentItem._id}`}>
										{currentItem.name}
										</Link>
									</h5>
									<strong style={{paddingTop:'', color: 'var(--clr-menu-dark)'}}>${currentItem.price / 100}</strong>
								</p>

								<div className="me-auto"></div>

								<div className="ml-auto" style={{}}>
									{quantity === 1 ? (
										<Button >Trash Can</Button>
									) : <Button >-</Button>}
								</div>
								<div className="ml-auto" style={{paddingLeft:'1%',paddingRight:'1%'}}>
									<div>{quantity}</div>
								</div>
								<div className="ml-auto" style={{paddingRight:'40%'}}>
									<Button>+</Button>
								</div>

							</div>
				);

			  })
			: retrieveItems}
		</div>
		<h3>
		<NavLink to='/mainmenu' style={{paddingLeft:'5%', color:"black"}}>+Add More Items</NavLink> 
		</h3>
		<div style={{paddingLeft:'5%'}}>
        <input type="text" id="SpecialInstructions" placeholder="Add special instructions?" autoComplete="off" style={{border:'0px solid black', backgroundColor: 'transparent'}}></input>
      </div>
		<div style={{ paddingLeft:'40%', paddingTop:'2%', paddingBottom:'2%', paddingRight:'45.6%'}}>
	  		<NavLink to='/payment' className="square rounded-pill" activeStyle style={styles.button}>Checkout</NavLink>
		</div>
	  </div>
	  
	);
  };
  
  export default Cart;
  