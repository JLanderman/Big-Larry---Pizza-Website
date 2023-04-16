import React from 'react';
import styled from 'styled-components';

const styles = {
  container: {
    backgroundColor: '#D9D9D9',
    margin: '10vh 15vw',
    padding: '50px',
    height: '60vh',
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minWidth: '250px'
  },
  innerContainer: {
    paddingTop: '20px',
    width: '100%',
    minHeight: '40px',
    height: '100%'
  },
  linkContainer: {
    width: '100%',
    height: '40%',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '40px',
    height: '40%'
  },
  button: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '40px',
    height: '40%',
    backgroundColor: 'dimgray',
    border: 'none',
    cursor: 'pointer'
  }
}

const Link = styled.a`
color: blue;
alignItems: center;
cursor: pointer;
&:hover {
  opacity: 60%;
	text-decoration: underline;
}
`;

const Login = () => {
  return (
    <form style={styles.container}>
      <div style={styles.innerContainer}>
        <label htmlFor="email" style={styles.text}>Email</label><br/>
        <input type="email" name="email" style={styles.input}></input>
      </div>
      <div style={styles.innerContainer}>
        <label htmlFor="password">Password</label><br/>
        <input type="password" name="password" style={styles.input}></input>
      </div>
      <div style={styles.innerContainer}>
        <button name='login' style={styles.button}><text style={{color: 'white'}}>Log in</text></button>
      </div>
      <div style={styles.linkContainer}>
        <Link>Forgot Password?</Link>
        <Link>Sign up</Link>
      </div>
    </form>
  );
};
  
export default Login;
