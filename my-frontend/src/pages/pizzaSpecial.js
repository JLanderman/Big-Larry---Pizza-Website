import React, { useEffect } from "react";
import DataService from "../services/itemData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/authContext";
import UserService from "../services/UserData";
import Cookies from 'js-cookie';


const url = process.env.REACT_APP_IMAGE_BASE_URL;

const PizzaSp = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);
	const { auth } = useAuth();
	const navigate = useNavigate();

	const handleRemoveItem = async (_id) => {
		const token = Cookies.get('x-auth-token');
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
		<div data-testid="pizzaSpecialties" >
			<h1 style={{ textAlign: 'center', paddingTop: '1%', paddingBottom: '1%', borderBottom: '1px solid black', background: 'transparent', borderColor: 'transparent' }}>Sam's Pizza Specialties (Large Size Only)</h1>
			<div className="row" style={{ width: '100%', paddingLeft: '2%' }}>
				{!Array.isArray(items)
					? items.item.map((currentItem) => {
						let temp
						if (currentItem.name !== 'Lets Customize') {
							temp = `/details/${currentItem._id}`
						} else {
							temp = `/pizza_customize`
						}

						return (
							<div key={currentItem._id} className="col-lg-3 pb-5" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', paddingTop: '10px', paddingBottom: '2%' }}>
								<Link to={temp} style={{ color: 'black', textDecoration: 'none' }}>
									<img
										style={{ width: 'auto', height: 275, borderRadius: '5%', objectfit: 'cover', imageResolution: " dppx" }}
										src={url + currentItem.photo}
										alt={"Photo of " + currentItem.name}
									/>
									<p style={{ paddingTop: '5%', textAlign: 'center', fontSize: 25 }}>
										{currentItem.name}
										<br />
										{currentItem.price ? `$${(currentItem.price / 100).toFixed(2)}` : null}
									</p>
								</Link>
								{auth && (currentItem.name !== 'Lets Customize') ?
									<div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
										<button
											className="border px-10 py- fs-3 rounded-4"
											onClick={() => handleRemoveItem(currentItem._id)}
										>
											Remove
										</button>
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
					: null
				}

				<div className="d-flex justify-content-end pe-5 pt-5">{
					auth ? (
						<div>
							<Link to="/ItemFormLarge">
								<button className="border px-5 py-3 fs-2 rounded-4">Add New Item</button>
							</Link>
						</div>
					) : null
				}</div>
			</div>
		</div>
	);
};

export { PizzaSp }
export default PizzaSp;