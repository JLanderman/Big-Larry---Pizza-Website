import React from 'react';
import pizzaGuy from '../images/Other/PizzaGuy_HQ_1.0.png';
import contactSign from '../images/Other/contactSign.png';
import '../App.css';
import { phoneNum } from '../data/global';

const Home = () => {

  return (
    <div className="homeContainerStyle">
      <div className="homeTextContainer">
        <h1 className="homeHeader" data-testid="homeHeader">
          Sam's Pizza & More
        </h1>
        <div className='homeSubHeader'>
          <div className='homeFirstLine'>BEST PRICE ! REAL TASTE !</div>
          <div className='homeSecondLine' data-testid="homeSecondLine">
            <img src={contactSign} alt='Telephone:' style={{ width: '1.75em', height: '1em', paddingRight: '0.75em' }} />
            {phoneNum}
          </div>
        </div>
      </div>
      <div className='homePizzaColumn'>
        <img src={pizzaGuy} alt='PizzaGuy' className="homePizzaStyle" data-testid="homePizza" />
        <div>OPEN MON TO SUN</div>
        <div>(11:00 AM - 9:00 PM)</div>
      </div>
    </div>
  );
};

export { Home };
