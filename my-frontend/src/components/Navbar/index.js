import React from "react";
import { Nav, NavLink, Bars, NavMenu, SamsAndMore } from "./NavbarElements";
import searchSvg from '../../images/Other/searchIcon.svg';
import { useAuth } from '../../contexts/authContext';
import Cookies from 'js-cookie';

const SearchStyle = {
  width: '2.5rem',
  height: 'auto', /* Maintain the aspect ratio */
  zIndex: 0,
}
/* currently listOrderManager linked here, will change as is integrated with admin login */
const Navbar = () => {
  const { auth, setAuth, loggedIn, setLoggedIn } = useAuth();

  const logout = () => {
    Cookies.remove('x-auth-token');
    setAuth(false);
    setLoggedIn(false);
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          SAM'S PIZZA & MORE
        </NavLink>
        <Bars />

        <NavMenu>
          <NavLink to="/about">
            ABOUT
          </NavLink>
          <NavLink to="/mainmenu">
            MENU
          </NavLink>
          <NavLink to="/cart">
            CART
          </NavLink>
          {loggedIn
            ? <NavLink to="/" onClick={() => { logout() }}>LOG OUT</NavLink>
            : <NavLink to="/login">SIGN IN</NavLink>
          }
          <NavLink to="/listOrderManager">
            List Order Manager
          </NavLink>
          <NavLink to="/">
            <img src={searchSvg} alt='Search' style={SearchStyle} />
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
