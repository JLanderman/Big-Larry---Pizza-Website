import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import UserService from "../services/UserData";
import { decodeJwt } from 'jose';
import Cookies from "js-cookie";
import { useAuth } from "../contexts/authContext";
import pizzaSlicePNG from "../images/Other/PizzaSliceClipArt.png";
import pizzaSlice from "../images/Other/PizzaSliceClipArt.webp"

const styles = {
  container: {
    backgroundColor: "transparent",
    margin: '',
    padding: '3%',
    height: '',
    border: '0px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '250px'
  },
  innerContainer: {
    paddingTop: '1%',
    paddingBottom: '1%',
    width: '80%',
    minHeight: '',
    height: '25%',
    paddingLeft:'40%',
    paddingRight:'',
    justifyContent: 'center',
    fontSize:'120%'
  },
  input: {
    boxSizing: 'border-box',
    width: '50%',
    minWidth: '200px',
    maxWidth: '350px',
    minHeight: '40px',
    height: '40%',
    border: '0px solid black',    
    backgroundColor: 'rgb(210, 210, 210)',
    paddingLeft:'5%',
    paddingRight: '4%'
  },
  button:{
		boxSizing:'border-box', 
		backgroundColor: "rgba(52, 52, 52, 0.16)",
		paddingTop:'10px', 
		paddingBottom:'10px',
    paddingRight:'10%',
    paddingLeft:'10%',
		color: "black",
		justifyContent:'center',
		border:'0px solid black'
	},
  centerText: {
    paddingLeft:'0%',
    textAlign: 'left',
  },
  pictureGrid: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10%',
    alignItems: 'left',
    alignText: 'left',
    marginTop: '-10%',
		border:'0px solid black'
  }, 
  picture: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    height: '100%',
    width: '100%',
  },
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [badLogin, setBadLogin] = useState(false);
  const { setAuth, loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { // redirect logged in users
    if (loggedIn) navigate('/');
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await UserService.login(username, password); // await login result
      if (res.status === 200) { // successful login
        const token = res.data.token;
        const claims = decodeJwt(token);
        const expiration = new Date(claims.exp);

        Cookies.set('x-auth-token', token, {
          expires: expiration,
        });

        setLoggedIn(true);
        setBadLogin(false);

        if (claims.user.isAdmin) { // store admin status for user
          setAuth(true);
          navigate('/admin');
        }

        else navigate('/');
      }
    } catch (e) {
      console.error(e);
    };

    setBadLogin(true); // unsuccessful login
  };

  return (
    <div>
    <form onSubmit={(e) => handleSubmit(e)} style={styles.container}  data-testid="loginForm">
      <div style={{justifyContent: 'center', paddingLeft:'40%', paddingTop:'2%', paddingBottom:'3%'}}>
        <strong style={{fontSize:'150%'}}>Welcome to Sam's Side</strong> 
        <br></br>
        <span style={{paddingLeft:'5%', fontSize:'120%'}}> This page is for managers only.</span>
      </div>
      <div style={styles.innerContainer}>
        <label htmlFor="username" style={styles.text}>Username</label><br />
        <input
          type="text"
          className="square rounded-pill"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}>
        </input>
      </div>

      <div style={styles.innerContainer}>
        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          className="square rounded-pill"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}>
        </input>
      </div>

      <div style={styles.innerContainer}>
        <button name='login' className="square rounded-pill"
          style={styles.button}>
          <b>Sign-In</b>
        </button>
        {badLogin
          ? <div data-testid="badLogin"
            className="text-danger"
            style={styles.centerText}>
            The username or password is incorrect.
          </div>
          : null
        }
      </div>
    </form>
    <div style={styles.pictureGrid}>
        <picture>
          <source type="image/webp" srcSet={pizzaSlice} /*pictures are chosen in order*/ />
          <source type="image/png" srcSet={pizzaSlicePNG} />
          <img src={pizzaSlice} style={styles.picture} alt='pizzaSlice' />
        </picture>
      </div>
    </div>
  );
};

export { Login }
export default Login;
