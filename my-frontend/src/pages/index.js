import React from 'react';
import homePizza from '../images/Pizza Specialties/Pizza Pepperoni.png';
import contactSign from '../images/Other/contactSign.png';
import '../App.css';
import { phoneNum } from '../data/global';

const Home = () => {

  return (
    <div className="homeContainerStyle">
      <div className="homeTextContainer">
        <h1 className="homeHeader">
          Sam's Pizza & More
        </h1>
        <div className='homeSubHeader'>
          <div>BEST PRICE ! REAL TASTE !</div>
          <div className='homePhoneNumber'>
            <img src={contactSign} alt='telephone:' style={{ height: '1em', paddingRight: '0.25em' }} />
            {phoneNum}
          </div>
        </div>
      </div>
      <div className='homePizzaColumn'>
        <img src={homePizza} alt='pizza' className="homePizzaStyle" />
        <div>OPEN MON TO SUN</div>
        <div>(11:00 AM - 9:00 PM)</div>
      </div>
    </div>
  );
};

export { Home };
