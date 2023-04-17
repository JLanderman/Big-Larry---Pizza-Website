import React from 'react';

const imgMyimageexample = require('https://shorturl.at/lJLNX');
const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${'https://shorturl.at/lJLNX'})`,
  backgroundSize: 'cover'   //<---- This is important
};

const Home = () => {
return (
	<div className="cComponent" style={divStyle} >
        <h1 style={{ color: 'white' }}>Thank you for visiting Sam's Pizza & More! </h1>
      </div>

);
};

const Cart = () => {
return (
	<div>
		<h2>
			Hello World!
		</h2>
		<h1>
			Welcome Cart Page
		</h1>
	</div>
);
};

export { Home, Cart };