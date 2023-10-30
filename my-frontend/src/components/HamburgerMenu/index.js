import React, { useState } from 'react';
import { NavLink, Bars } from '../Navbar/NavbarElements';
import { useAuth } from '../../contexts/authContext';
import Cookies from 'js-cookie';
import './HamburgerMenu.css';

function HamburgerMenu({ onClick }) {
    const { auth, setAuth, loggedIn, setLoggedIn } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        Cookies.remove('x-auth-token');
        setAuth(false);
        setLoggedIn(false);
      };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (onClick) {
        onClick(); // Call the onClick function passed as a prop
        console.log("OnClick"); // Add this line
        }
    };

  console.log("HamburgerMenu component rendered");

  return (
    <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon" onClick={toggleMenu}>
        <Bars />
      </label>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/about">ABOUT</NavLink></li>
        <li><NavLink to="/mainmenu" data-testid="menuLinkHamburgerMenu">MENU</NavLink></li>
        <li>{loggedIn
            ? <NavLink to="/" onClick={() => { logout() }}>LOG OUT</NavLink>
            : <NavLink to="/login">SIGN IN</NavLink>
          }</li>
      </ul>
    </div>
  );
}

export default HamburgerMenu;