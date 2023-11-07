import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/authContext";

const url = process.env.REACT_APP_IMAGE_BASE_URL;

const SpDeals = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);
	const {auth} = useAuth();
	const navigate = useNavigate();


  
	// tells react hooks that it needs to do something after render.
	useEffect(() => {
	  retrieveItems();
	}, []);
  
	const retrieveItems = () => {
		DataService.getSpecialDeals()
		  .then((response) => {
			setItems(response.data);
		  })
		  .catch((e) => {
			console.log(e);
		  });
	  };
  
	  return (
		  <div>
			<h1 className="card" style={{paddingLeft:'40%', paddingTop:'1%', paddingBottom:'1%', borderBottom:'1px solid black', background: 'transparent', borderColor: 'transparent'}} data-testid="specialDeals">Special Deals</h1>
			<div className="row" style={{width: '100%'}}>
			  {!Array.isArray(items)
				? items.item.map((currentItem) => {
					return (
						<div className="col-lg-3 pb-5" style={{display:'flex', flexDirection:'column', textAlign: 'center', paddingTop:'10px', paddingBottom:'2%'}}>
							<Link to={`/details/${currentItem._id}`} style={{color: 'black', textDecoration: 'none'}}>
								<img
									style={{width: 'auto', height: 225, borderRadius: '5%', objectfit: 'cover'}}
									src={url + currentItem.photo}
									alt={"Photo of " + currentItem.name}
								/>
								<p style = {{paddingTop: '5%', textAlign: 'center', fontSize: 25}}>
									{currentItem.name}
									<br />
									{currentItem.price ? `$${(currentItem.price / 100).toFixed(2)}` : null}
									{currentItem.price_chicken ? `Chicken: $${(currentItem.price_chicken / 100).toFixed(2)}` : null}
									<br />
									{currentItem.price_veggie ? `Veggie: $${(currentItem.price_veggie / 100).toFixed(2)}` : null}
								</p>
							</Link>
							{ auth ?
								<div>
									<button className="border px-10 py- fs-3 rounded-4">Remove</button>
									<h> </h>
									<button // Redirect to edit page
										className="border px-10 py- fs-3 rounded-4" 
										onClick={(e) => navigate(`/editItem/${currentItem._id}`)}>
										Edit
									</button>
								</div>
								: null
							}

						</div>
						
				);
			  })
			: null}
		</div>
	  </div>
	);
  };
  
  export default SpDeals;