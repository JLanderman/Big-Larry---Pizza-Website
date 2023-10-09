import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'js-cookie';
import { useAuth } from "../contexts/authContext";

const url = 'https://testingschoolproject.s3.us-west-1.amazonaws.com/'

const ComboSp = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);

	const {auth} = useAuth();


  
	// tells react hooks that it needs to do something after render.
	useEffect(() => {
	  retrieveItems();
	}, []);
  
	const retrieveItems = () => {
		DataService.getComboSpecial()
		  .then((response) => {
			setItems(response.data);
		  })
		  .catch((e) => {
			console.log(e);
		  });
	  };
  
	  return (
		  <div>
			<h1 className="card" style={{paddingLeft:'40%', paddingTop:'1%', paddingBottom:'1%', borderBottom:'1px solid black', background: 'transparent', borderColor: 'transparent'}}>Combo Sets</h1>
			<div className="row">
			  {!Array.isArray(items)
				? items.item.map((currentItem) => {
					return (
						<div className="col-lg-3 pb-5" style={{display:'flex', flexDirection:'column', textAlign: 'center', paddingTop:'10px', paddingBottom:'2%'}}>
							<Link to={`/details/${currentItem._id}`} style={{color: 'black', textDecoration: 'none'}}>
								<img
									style={{width: 'auto', height: 225, borderRadius: '20%', objectfit: 'cover'}}
									src={url + currentItem.photo}
									alt={"Photo of " + currentItem.name}
								/>
								<p style = {{paddingTop: '5%', textAlign: 'center', fontSize: 25}}>
									{currentItem.name}
								</p>
							</Link>

							{
								auth ?
								<div>
									<button>Remove</button>
									<h> </h>
									<button>Edit</button>
								</div>: null
							}
						</div>
					);
			  	})
			: retrieveItems}
		</div>
	  </div>
	);
  };
  
  export default ComboSp;