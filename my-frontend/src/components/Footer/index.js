import React from "react";
import { Container, Div } from "./FooterElements";
import { NavLink } from "../Navbar/NavbarElements";
import { useAuth } from '../../contexts/authContext';
import Cookies from 'js-cookie';
import { phoneNum, address } from "../../data/global";
import './Footer.css';

const Footer = () => {
  const {setAuth, loggedIn, setLoggedIn } = useAuth();
  const logout = () => {
    Cookies.remove('x-auth-token');
    setAuth(false);
    setLoggedIn(false);
  };
  return (
    <Container data-testid="footer">
      <Div className="address">
        <span className="text" data-testid="footerPhoneNumber">{phoneNum}</span>
        <br />
        <span className="text" data-testid="footerAddress">{address}</span>
      </Div>
      <Div className="fbLink">
        <Div>
          <NavLink to="https://www.facebook.com/bestfoodcountryclub/">
            Facebook
          </NavLink>

        </Div>
        <Div className="login">
          {loggedIn
            ? <NavLink to="/" onClick={() => { logout() }} data-testid="logout">LOG OUT</NavLink>
            : <NavLink to="/login">SIGN IN</NavLink>
          }
        </Div>
      </Div>
    </Container>
  );
};

export default Footer;
