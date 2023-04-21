import React from 'react';

const styles = {
  container: {
    backgroundColor: '#D9D9D9',
    margin: '10vh 15vw',
    padding: '50px',
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '250px',
    textAlign: 'center',
  },
  innerContainer: {
    paddingTop: '20px',
    width: '100%',
    minHeight: '40px',
    height: '100%'
  },
  baseText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '40px',
    height: '30%',
    backgroundColor: 'dimgray',
    border: 'none',
    cursor: 'pointer'
  }
}

const Payment = () => {
  return (
    <form style={styles.container}>
      <div style={styles.innerContainer}>
        <text style={styles.baseText}> {'Money Processing Details'}<br/><br/><br/><br/></text>
        
        <button name='Finish' style={styles.button}><text style={{color: 'white'}}>Finish</text></button>
      </div>
    </form>
  );
};
  
export default Payment;