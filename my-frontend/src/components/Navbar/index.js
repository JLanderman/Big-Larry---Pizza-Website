import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

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
          <NavLink to="/menu">
            Menu
          </NavLink>
          <NavLink to="/cart">
            Cart
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
