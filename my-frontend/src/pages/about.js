import React from 'react';
import delivery from '../images/Other/delivery.png';
import pickUp from '../images/Other/pickUp.png';
import grayElipse from '../images/Other/grayElipseAbout.svg';
import '../App.css';


					
const About = () => {
	const containerStyle = {
		position: 'relative',
		minHeight: '100vh',
		overflow: 'hidden',
		}
	  
	  
		const deliveryStyle = {
		  position: 'absolute',
		  top:0,
		  left: 0,
		  height: '20%', // Make the image span the full viewport height
		  width: 'auto', // Maintain the aspect ratio
		  zIndex: 1,
		  //   maxWidth: '100%',
		}

		const pickUpStyle = {
			position: 'absolute',
			top: '25%',
			left: '3%',
			height: '10%', // Make the image span the full viewport height
			width: 'auto', // Maintain the aspect ratio
			zIndex: 1,
		  }
		
	  
		const grayElipseStyle = {
			position: 'absolute',
			bottom: -200,
			right: -200,
			width: '120%',
			height: 'auto', /* Maintain the aspect ratio */
			zIndex: 0,
		  }

  return (
    <div style={containerStyle}>
		<img src={grayElipse} alt='pizza'  style={grayElipseStyle}/>
        <img src={delivery} alt='pizza' style={deliveryStyle} />
        <img src={pickUp} alt='pizza' style={pickUpStyle} />
		<p className='addressStyle'>1852 Country Club Blvd<br />Stockton CA 95212</p>
		<h1  className="aboutHeader">
			WHO ARE WE?
		</h1>
		<p className='aboutText'>
			SAM'S PIZZA && MORE.......... is a local fast food restaurant that has been serving the community for about 20 years. 
			We offer a variety of food choices such as pizza with many toppings, fried foods, juicy drinks, and more. <br />
			We're dedicated to serve everyone with the best quality and reasonable price.
		</p>
	</div>
		);
};

export default About;
