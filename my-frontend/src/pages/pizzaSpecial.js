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
		border:'2px solid black',
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
		DataService.getPizzaSpecial()
		  .then((response) => {
			setItems(response.data);
		  })
		  .catch((e) => {
			console.log(e);
		  });
	  };
  
	  return (
		  <div>
			<h1 className="card" style={{paddingLeft:'40%', paddingTop:'1%', paddingBottom:'1%', borderBottom:'1px solid black', background: 'transparent', borderColor: 'transparent'}}>Sam's Pizza Specialties</h1>
			<div className="row">
			  {!Array.isArray(items)
				? items.item.map((currentItem) => {
					return (
							<div className="col-lg-2 pb-1" style={{paddingTop:'10px'}}>
									<div className ="card" style={{ maxWidth: 300, maxHeight: 225,  background: 'transparent', borderColor: 'transparent'}}>
										<div className = "card-body" style={{maxWidth:500, maxHeight:500}}>
											<div style={{display:'flex', flexDirection:'column', textAlign: 'center', paddingTop:'1%', paddingBottom:'2%'}}>
												<Link to={`/details/${currentItem._id}`}>
												<img
													style={{width: 150, height: 150, border:'1px solid gray', borderRadius: '20%', background: 'white', objectfit: 'contain', textAlign: 'center'}}
													src={currentItem.photo}
													alt={"Photo of " + currentItem.name}
												/>
												</Link>
												<p style = {{paddingTop: '5%', textAlign: 'center'}}>
													{currentItem.name}
												</p>
											</div>
										</div>
									</div>
							</div>
					);
				  })
				: retrieveItems}
		</div>
		<div style={{ paddingLeft:'45%', paddingTop:'25%', paddingBottom:'2%', paddingRight:'45%'}}>
	  		<NavLink to='/pizza_customize' activeStyle style={styles.button}>Customize Pizza</NavLink>
		</div>
	  </div>
	);
  };
  
  export default Cart;