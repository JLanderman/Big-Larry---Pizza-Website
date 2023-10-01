import React from 'react';
import delivery from '../images/Other/delivery.png';
import pickUp from '../images/Other/pickUp.png';
import grayElipse from '../images/Other/grayElipseAbout.svg';
import '../App.css';


					
const About = () => {

  return (
	<div>
		<div className="aboutContainerStyle">
			<div className='aboutColumnPictures'>
				<img src={delivery} alt='Delivery' className="deliveryStyle" style={{ zIndex: 1 }} />
				<br />
				<img src={pickUp} alt='Pick Up' className="pickUpStyle" style={{ zIndex: 1 }} />
			</div>
			<div className='aboutColumnCenter'>
				<h1  className="aboutHeader">
					WHO ARE WE?
				</h1>
				<p className="aboutText">
					SAM'S PIZZA && MORE.......... is a local fast food restaurant that has been serving the community for about 20 years. 
					We offer a variety of food choices such as pizza with many toppings, fried foods, juicy drinks, and more. <br />
					We're dedicated to serve everyone with the best quality and reasonable price.
				</p>
			</div>
			<div className='aboutColumnAddress'>
				<p className="addressStyle">1852 Country Club Blvd<br />Stockton CA 95212</p>
			</div>
		</div>
		<div className='grayElipseContainer'>
			<img src={grayElipse} alt='GrayElipse' className="grayElipseStyle"/>
	 	</div>
	</div>
	);
};

export default About;
