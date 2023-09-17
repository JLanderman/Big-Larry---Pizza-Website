import React from 'react';
import { Button } from "react-bootstrap";
import debit from '../images/Other/debit card.jpg';
import masterCard from '../images/Other/MasterCard_Logo.svg.png';
import payPal from '../images/Other/paypal.jpg';
import visa from '../images/Other/VISA-logo.png';
import ceditCard from '../images/Other/credit-cardlogo.jpg';

const styles = {
  container: {
    backgroundColor: "transparent",
    margin: '10vh 15vw',
    paddingRight: '10%',
    border: '0px solid black',
    display: 'flex',
    flexDirection: 'row',
    maxHeight:'150px',
  },
  smallImage: {
    
    resizeMode: 'contain',
    height: 'auto',
    width: '110%',
  },
  wideImage: {
    
    resizeMode: 'contain',
    height: 'auto',
    width: '20%',
  },
  smallButton: {
    boxSizing: 'border-box',
    maxWidth: '10%',
    maxHeight: '10%',
    backgroundColor: "transparent",
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden'
  },
  wideButton: {
    boxSizing: 'border-box',
    backgroundColor: "white",
    padding: '1%',
    paddingLeft: '2%',
    paddingRight: '2%',
    minHeight: '40px',
    height: '30%',
    backgroundColor: "white",
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  }
}

const Payment = () => {
  return (
    <div>
    <div style={styles.container}>
    <Button style={styles.smallButton}>
        <img src={debit} style={styles.smallImage}/>
    </Button>
      <div style={{padding: '5%'}}></div>
      <Button style={styles.smallButton}>
      <img src={ceditCard} style={styles.smallImage}/>
      </Button>
      <div style={{padding: '5%'}}></div>
      <Button style={styles.smallButton}>
      <img src={payPal} style={styles.smallImage}/>
      </Button>
    </div>
    <div style={{paddingLeft: '15%',paddingRight: '65%', display:'flex', flexDirection:'column'}}>
      <Button style={styles.wideButton}>+Add New Card</Button>
      <div style={{padding: '5%'}}></div>
      <Button style={styles.wideButton}>
        <div>Mastercard</div>
        <img src={masterCard} style={styles.wideImage}/>
        </Button>
      <div style={{padding: '5%'}}></div>
      <Button style={styles.wideButton}>
        <div>Visa</div>
        <img src={visa} style={styles.wideImage}/>
        </Button>
    </div>
    </div>
  );
};
  
export default Payment;