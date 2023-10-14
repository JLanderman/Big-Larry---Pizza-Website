import React from 'react';
import delivery from '../images/Other/delivery.png';
import pickUp from '../images/Other/pickUp.png';
import grayElipse from '../images/Other/grayElipseAbout.svg';
import '../App.css';
import { addressNoComma, zipCode } from '../data/global';


					
const About = () => {

  return (
	<div>
		<div className="aboutContainerStyle" data-testid="about">
			<div className='aboutColumnPictures'>
				<img src={delivery} alt='Delivery' className="deliveryStyle" style={{ zIndex: 1 }} />
				<br />
				<img src={pickUp} alt='Pick Up' className="pickUpStyle" style={{ zIndex: 1 }} />
			</div>
			<div className='aboutColumnCenter'>
				<h1  className="aboutHeader">
					WHO ARE WE?
				</h1>
				<p className="aboutText" data-testid="aboutText">
					SAM'S PIZZA && MORE.......... is a local fast food restaurant that has been serving the community for about 20 years. 
					We offer a variety of food choices such as pizza with many toppings, fried foods, juicy drinks, and more. <br />
					We're dedicated to serve everyone with the best quality and reasonable price.
				</p>
			</div>
			<div className='aboutColumnAddress'>
				<p className="addressStyle">{addressNoComma} {zipCode}</p>
			</div>
		</div>
		<div className='grayElipseContainer'>
			<img src={grayElipse} alt='GrayElipse' className="grayElipseStyle"/>
	 	</div>
	</div>
	);
};

export { About }
export default About;
