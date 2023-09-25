import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import UserService from "../services/UserData";
import { decodeJwt } from 'jose';
import Cookies from "js-cookie";
import { useAuth } from "../contexts/authContext";

const styles = {
  container: {
    backgroundColor: "var(--clr-menu)",
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
    backgroundColor: "var(--clr-menu-dark)",
    border: 'none',
    cursor: 'pointer'
  },
  centerText: {
    textAlign: 'center',
  },
}

const Link = styled.a`
color: var(--clr-link);
alignItems: center;
cursor: pointer;
&:hover {
  opacity: 60%;
	text-decoration: underline;
}
`;

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
      if (res.status == 200) { // successful login
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
      console.error(`handleSubmit failed in login.js, ${e}`);
      navigate('/');
    };

    setBadLogin(true); // unsuccessful login
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={styles.container}>
      <div style={styles.innerContainer}>
        <label htmlFor="username" style={styles.text}>Username</label><br />
        <input
          type="text"
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
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}>
        </input>
      </div>
      <div style={styles.innerContainer}>
        <button name='login'
          style={styles.button}>
          <span style={{ color: "var(--clr-menu-light)" }}>Log in</span>
        </button>
        {badLogin
          ? <div
            className="text-danger"
            style={styles.centerText}>
            That combination of user and password was not found.
          </div>
          : null
        }
      </div>
      <div style={styles.linkContainer}>
        <Link>Forgot Password?</Link>
        <Link>Sign up</Link>
      </div>
    </form>
  );
};

export default Login;
