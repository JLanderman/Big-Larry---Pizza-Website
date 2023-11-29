import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import { useAuth } from '../../contexts/authContext';
import HamburgerMenu from "../HamburgerMenu";


const Navbar = () => {
  const { auth} = useAuth();

  return (
    <>
      <Nav data-testid="navbar">
        <NavLink to="/">
          SAM'S PIZZA & MORE
        </NavLink>
        <HamburgerMenu />
        <NavMenu>
          {auth
            ? <NavLink to="/admin" data-testid="adminLink">ADMIN</NavLink>
            : null
          }
          {auth
            ? <NavLink to="/admin/editUserCred" data-testid="editCredLink">Edit Username/Password</NavLink>
            : null
          }
          <NavLink to="/about">
            ABOUT
          </NavLink>
          <NavLink to="/mainmenu" data-testid="menuLink">
            MENU
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;