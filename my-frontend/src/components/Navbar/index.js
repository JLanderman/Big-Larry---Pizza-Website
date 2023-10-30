import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu} from "./NavbarElements";
import searchSvg from '../../images/Other/searchIcon.svg';
import { useAuth } from '../../contexts/authContext';
import Cookies from 'js-cookie';
import HamburgerMenu from "../HamburgerMenu";

const SearchStyle = {
  width: '2.5rem',
  height: 'auto',
  zIndex: 0,
}
/* currently listOrderManager linked here, will change as is integrated with admin login */
const Navbar = () => {
  const { auth, setAuth, loggedIn, setLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for menu visibility
  
  const toggleMenu = () => {
    console.log("In toggleMenu")
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    Cookies.remove('x-auth-token');
    setAuth(false);
    setLoggedIn(false);
  };

  return (
    <>
      <Nav data-testid="navbar">
        <NavLink to="/">
          SAM'S PIZZA & MORE
        </NavLink>
        <HamburgerMenu onClick={toggleMenu} />
        <NavMenu>
          {auth
            ? <NavLink to="/admin">ADMIN</NavLink>
            : null
          }
          {auth
            ? <NavLink to="/admin/editUserCred">Edit Username/Password</NavLink>
            : null
          }
          <NavLink to="/about">
            ABOUT
          </NavLink>
          <NavLink to="/mainmenu" data-testid="menuLink">
            MENU
          </NavLink>
          {loggedIn
            ? <NavLink to="/" onClick={() => { logout() }}>LOG OUT</NavLink>
            : <NavLink to="/login">SIGN IN</NavLink>
          }
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;