import React from "react";
import { Container, Div } from "./FooterElements";
import { NavLink } from "../Navbar/NavbarElements";
import { useAuth } from '../../contexts/authContext';
import Cookies from 'js-cookie';
import { phoneNum, address } from "../../data/global";

const Footer = () => {
  const { auth, setAuth, loggedIn, setLoggedIn } = useAuth();
  const logout = () => {
    Cookies.remove('x-auth-token');
    setAuth(false);
    setLoggedIn(false);
  };
  return (
    <Container data-testid="footer">
      <Div>
        <span style={{ color: 'var(--clr-txt-light)' }} data-testid="footerPhoneNumber">{phoneNum}</span>
        <br />
        <span style={{ color: 'var(--clr-txt-light)' }} data-testid="footerAddress">{address}</span>
      </Div>
      <Div style={{ display: 'flex', paddingRight: '1%', marginRight: '-5%' }}>
        <Div>
          <NavLink to="https://www.facebook.com/bestfoodcountryclub/">
            Facebook
          </NavLink>

        </Div>
        <Div>
          {loggedIn
            ? <NavLink to="/" onClick={() => { logout() }}>LOG OUT</NavLink>
            : <NavLink to="/login">SIGN IN</NavLink>
          }
        </Div>
      </Div>
    </Container>
  );
};

export default Footer;
