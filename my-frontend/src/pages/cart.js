import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {NavLink,} from '../components/Navbar/NavbarElements';

const styles={
	button:{
		boxSizing:'border-box', 
		backgroundColor: "var(--clr-menu-dark)",
		paddingTop:'10px', 
		paddingBottom:'10px',
		color: "var(--clr-menu-light)",
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
		<h1 className="card" style={{paddingLeft:'40%', paddingTop:'1%', paddingBottom:'1%', borderBottom:'1px solid black'}}>Shopping Cart</h1>
		<div className="column">
		  {!Array.isArray(items)
			? items.item.map((currentItem) => {
				return (
					<div>
						<div className="col-lg-8 pb-1" style={{paddingLeft:'30%', paddingTop:'10px'}}>
							<div className="card" style={{border:'1px solid black'}}>
								<div style={{display:'flex', flexDirection:'row', paddingLeft:'5%', paddingTop:'2%', paddingBottom:'2%'}}>
									<Link to={`/details/${currentItem._id}`}>
									<img
										style={{ maxWidth: 250, maxHeight: 250, border:'2px solid gray'}}
										src={currentItem.photo}
										alt={"Photo of " + currentItem.name}
									/>
									</Link>
									<div style={{display:'flex', flexDirection:'column', padding:'20px', paddingLeft:'40px'}}>
										<p className="card-text">
											<h5 className="card-title">{currentItem.name}</h5>
											<strong>Info: </strong>{currentItem.info}
											<br />
											<strong style={{paddingTop:'20px'}}>Price: </strong>${currentItem.price / 100}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			  })
			: retrieveItems}
		</div>
		<div style={{ paddingLeft:'46%', paddingTop:'2%', paddingBottom:'2%', paddingRight:'46%'}}>
	  		<NavLink to='/payment' activeStyle style={styles.button}>Checkout</NavLink>
		</div>
	  </div>
	);
  };
  
  export default Cart;
  