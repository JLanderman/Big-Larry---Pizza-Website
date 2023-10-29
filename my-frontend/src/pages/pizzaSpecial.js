import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/authContext";
import Cookies from 'js-cookie';


const url = 'https://testingschoolproject.s3.us-west-1.amazonaws.com/'

const PizzaSp = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);

	const {auth} = useAuth();
  
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
		  <div data-testid="pizzaSpecialties">
			<h1 className="card" style={{paddingLeft:'5%', paddingTop:'1%', paddingBottom:'1%', borderBottom:'1px solid black', background: 'transparent', borderColor: 'transparent'}}>Sam's Pizza Specialties (Large Size Only)</h1>
			<div className="row">
			  {!Array.isArray(items)
				? items.item.map((currentItem) => {

					let temp
					if(currentItem.name !== 'Lets Customize'){
						temp=`/details/${currentItem._id}`
					}else{
						temp=`/pizza_customize`
					}

					return (
						<div className="col-lg-3 pb-5" style={{display:'flex', flexDirection:'column', textAlign: 'center', paddingTop:'10px', paddingBottom:'2%'}}>
							<Link to={temp} style={{color: 'black', textDecoration: 'none'}}>
								<img
									style={{width: 'auto', height: 275, borderRadius: '5%', objectfit: 'cover', imageResolution: " dppx"}}
									src={url + currentItem.photo}
									alt={"Photo of " + currentItem.name}
								/>
								<p style = {{paddingTop: '5%', textAlign: 'center', fontSize: 25}}>
									{currentItem.name}
									<br />
									{currentItem.price ? `$${(currentItem.price / 100).toFixed(2)}` : null}
								</p>
							</Link>

							{
								auth  && (currentItem.name !== 'Lets Customize')?
								<div>
									<button className="border px-10 py- fs-5 rounded-4" >Remove</button>
									<h> </h>
									<button className="border px-10 py- fs-5 rounded-4">Edit</button>
								</div>
								
								:null
							}

						</div>
					);
				  })
				: retrieveItems}
				
		</div>
	  </div>

	);

	
  };
  
  export { PizzaSp }
  export default PizzaSp;