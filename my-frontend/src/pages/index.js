import React from 'react';
import homePizza from '../images/Other/homePizza.png';
import contactSign from '../images/Other/contactSign.png';
import '../App.css';

const Home = () => {
  const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  }

  const textContainer = {
    position: 'absolute',
    top: '70%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'left',
    zIndex: 2,
  }

  const homePizzaStyle = {
    position: 'absolute',
    right: 0,
    height: '100vh',
    width: 'auto',
    maxWidth: '100%',
  }

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative' }}>
        <img src={homePizza} alt='pizza' style={homePizzaStyle} />
      </div>
      <div style={textContainer}>
        <h1  className="homeHeader">
          Sam's Pizza && More
        </h1>
        <p className='subHeader'>
        <div style={{ paddingLeft: '50px' }}>BEST PRICE ! REAL TASTE !</div>
        <div style={{ paddingLeft: '100px'}}>
          <img src={contactSign} alt='telephone:' style={{ width: '80px', height: '60px', paddingRight: '20px'  }} />
          (209) 460-0210
          </div>
        <div style={{ paddingLeft: '250px' }}>OPEN MON TO SUN</div>
        <div style={{ paddingLeft: '250px' }}>(11:00 AM - 9:00 PM)</div>
        </p>
      </div>
    </div>
  );
};

export { Home};

