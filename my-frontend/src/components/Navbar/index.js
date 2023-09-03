import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/" activeStyle>
            Sam's Pizza & More
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/menu" activeStyle>
            Menu
          </NavLink>
          <NavLink to="/cart" activeStyle>
            Cart
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
