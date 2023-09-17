import React from "react";
import { Nav, NavLink, Bars, NavMenu, SamsAndMore } from "./NavbarElements";
import searchSvg from '../../images/Other/searchIcon.svg';

const SearchStyle = {
  width: '2.5rem',
  height: 'auto', /* Maintain the aspect ratio */
  zIndex: 0,
  }

const Navbar = () => {
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
          <NavLink to="/login">
            SIGN IN
          </NavLink>
          <NavLink to="/login">
            <img src={searchSvg} alt='Search' style={SearchStyle}/>
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
