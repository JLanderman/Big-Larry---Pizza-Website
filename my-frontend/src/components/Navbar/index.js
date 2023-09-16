import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
/* currently listOrderManager linked here, will change as is integrated with admin login */
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/">
            Sam's Pizza & More
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
          <NavLink to="/mainmenu">
            Menu
          </NavLink>
          <NavLink to="/cart">
            Cart
          </NavLink>
          <NavLink to="/listOrderManager"> 
            List Order Manager
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
