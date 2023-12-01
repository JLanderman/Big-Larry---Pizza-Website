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

const SpDeals = (props) => {
	// react hook, keeps track of items
	const [items, setItems] = useState([]);
	const { auth } = useAuth();
	const navigate = useNavigate();

	const handleRemoveItem = async (_id) => {
		const token = Cookies.get('x-auth-token');
    	const user = await UserService.getUserbyToken(token);
		const confirmation = window.confirm(`Are you sure you want to remove this item from the menu?`);

		if (confirmation) {
			// User confirmed, proceed with deletion
			DataService.deleteItem(_id, user, token)
			.then((response) => {
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
	};

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
				console.error(e);
			});
	};

	return (
		<div data-testid="specialDeals">
			<h1 style={{ textAlign: 'center', paddingTop: '1%', paddingBottom: '1%', borderBottom: '1px solid black', background: 'transparent', borderColor: 'transparent' }}>Special Deals</h1>
			<div className="row" style={{ width: '100%', paddingLeft: '2%' }}>
				{!Array.isArray(items)
					? items.item.map((currentItem) => {
						return (
							<div data-testid={`testItem${currentItem._id}`} key={currentItem._id} className="col-sm-6  col-md-4 col-lg-3 pb-5" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', paddingTop: '10px', paddingBottom: '2%' }}>
								<Link to={`/details/${currentItem._id}`} style={{ color: 'black', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
									<div style={{ width: 'min(100%, 225px)', height: 225, aspectRatio: 'initial', borderRadius: '5%', objectfit: 'scale down', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
										<img
											style={{ width: 'auto',  maxWidth: 'min(100%, 225px)', maxHeight: 225, aspectRatio: 'initial', borderRadius: '5%', objectfit: 'cover' }}
											src={url + currentItem.photo}
											alt={"Photo of " + currentItem.name}
										/>
									</div>
									<p style={{ paddingTop: '5%', textAlign: 'center', fontSize: 25 }}>
										{currentItem.name}
										<br />
										{currentItem.price ? `$${(currentItem.price / 100).toFixed(2)}` : null}
										{currentItem.price_chicken ? `Chicken: $${(currentItem.price_chicken / 100).toFixed(2)}` : null}
										<br />
										{currentItem.price_veggie ? `Veggie: $${(currentItem.price_veggie / 100).toFixed(2)}` : null}
									</p>
								</Link>
								{auth ?
									<div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }} data-testid={`authTestItem${currentItem._id}`}>
										<button data-testid={`removeTestItem${currentItem._id}`} // Remove item
											className="border px-10 py- fs-3 rounded-4"
											onClick={() => handleRemoveItem(currentItem._id)}
										>
											Remove
										</button>
										<button data-testid={`editTestItem${currentItem._id}`} // Redirect to edit page
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
				<div className="d-flex justify-content-end pe-5 pt-5">{
					auth ? (
						<div>
							<button className="border px-5 py-3 fs-2 rounded-4" data-testid = "addItemButton"
								onClick={(e) => navigate(`/ItemFormLarge/`)}>
								Add New Item
							</button>
						</div>
					) : null
				}</div>
			</div>
		</div>
	);
};

export { SpDeals }
export default SpDeals;