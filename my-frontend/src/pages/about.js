import React from 'react';
import delivery from '../images/Other/delivery.png';
import pickUp from '../images/Other/pickUp.png';
import doorDash from '../images/Other/doordash.png';
import '../App.css';
import { addressNewLine, zipCode } from '../data/global';


					
const About = () => {

  return (
	<div>
		<div className="aboutContainerStyle" data-testid="about">
			<div className='aboutRowOne'>
				<div className='aboutColumnPictures'>
					<img src={delivery} alt='Delivery' className="deliveryStyle" />
					<br />
					<img src={doorDash} alt='DoorDash' className="doorDashStyle" />
					<br />
					<img src={pickUp} alt='Pick Up' className="pickUpStyle" />
				</div>
				<div className='aboutColumnAddress'>
				<p className="addressStyle">
					{addressNewLine.split('\n').map((line, index) => (
						<React.Fragment key={index}>
						{line}
						{index < addressNewLine.split('\n').length - 1 && <br />}
						</React.Fragment>
					))} {zipCode}
				</p>
				</div>
			</div>
			<div className='aboutColumnCenter'>
				<h1  className="aboutHeader">
					WHO ARE WE?
				</h1>
				<p className="aboutText" data-testid="aboutText">
					SAM'S PIZZA && MORE.......... is a local fast food restaurant that has been serving the community for about 10 years. 
					We offer a variety of food choices such as pizza with many toppings, fried foods, teriyaki bowls, milkshakes, smoothies, and more. <br />
					We're dedicated to serve everyone with the best quality and reasonable price.
				</p>
			</div>
		</div>
	</div>
	);
};

export { About }
export default About;
