import React from 'react';
import homePizza from '../images/Pizza Specialties/Pizza Pepperoni.png';
import contactSign from '../images/Other/contactSign.png';
import '../App.css';
import { phoneNum } from '../data/global';

const Home = () => {

  return (
    <div className="homeContainerStyle">
      <div className="homeTextContainer">
        <h1 className="homeHeader" data-testid="homeHeader">
          Sam's Pizza && More
        </h1>
        <div className='homeSubHeader'>
          <div className='homeFirstLine'>BEST PRICE ! REAL TASTE !</div>
          <div className='homeSecondLine'>
            <img src={contactSign} alt='telephone:' style={{ width: '1.75em', height: '1em', paddingRight: '0.75em' }} />
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
