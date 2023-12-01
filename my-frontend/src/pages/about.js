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
				<div className='aboutRowOne' style={{ border: '0px solid black' }}>
					<div className='aboutColumnPictures' style={{ border: '0px solid black' }}>
						<img src={delivery} alt='Delivery' className="deliveryStyle" />
						<br />
						<img src={doorDash} alt='DoorDash' className="doorDashStyle" />
						<br />
						<img src={pickUp} alt='Pick Up' className="pickUpStyle" />
					</div>
					<div className='aboutColumnMap'>
						<iframe data-testid="map"
						    title="Map of Sam's Pizza Location" // Add a descriptive and unique title here
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201307.39219125203!2d-121.61092758178711!3d37.96713979021768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80900d97b50e941b%3A0xb3c866d49e7af7e!2sSam&#39;s%20Pizza!5e0!3m2!1sen!2sus!4v1701041068882!5m2!1sen!2sus"
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade">
						</iframe>
					</div>

					<div className='aboutColumnAddress' style={{ width: '100%' }}>
						<p className="addressStyle" >
							{addressNewLine.split('\n').map((line, index) => (
								<React.Fragment key={index}>
									{line}
									{index < addressNewLine.split('\n').length - 1 && <br />}
								</React.Fragment>
							))} {zipCode}

							{//<img src={storeFront} alt='Storefront' className="deliveryStyle" />
							}
						</p>
					</div>
				</div>

				<div className='aboutColumnCenter'>
					<h1 className="aboutHeader">
						WHO ARE WE?
					</h1>
					<p className="aboutText" data-testid="aboutText">
						SAM'S PIZZA && MORE.......... is a local fast food restaurant that has been serving the community for about 10 years.
						We offer a variety of food choices such as pizza with many toppings, hamburger, fries, teriyaki bowls, egg rolls, milkshakes, smoothies, and much more. <br />
						We're dedicated to serve everyone with the best quality and reasonable price.
					</p>
				</div>
			</div>
		</div>
	);
};

export { About }
export default About;
