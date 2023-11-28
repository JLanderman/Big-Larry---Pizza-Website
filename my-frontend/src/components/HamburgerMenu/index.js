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
        onClick();
      }
    };
    
    const closeMenu = () => {
      setMenuOpen(false); // Close the menu
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle) {
        menuToggle.checked = false;
      }
      if (onClick) {
        onClick();
      }
    };

  return (
    <div data-testid="hamburger-menu" className={`hamburger-menu${menuOpen ? ' open' : ''}`}>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon" onClick={toggleMenu}>
        <Bars data-testid="menu-toggle"/>
      </label>
      <ul data-testid="menu" className={`menu${menuOpen ? ' open' : ''}`} >
        <li><NavLink to="/about" onClick={closeMenu}><div className='hamburgerMenuItemText'>ABOUT</div></NavLink></li>
        <li><NavLink to="/mainmenu" data-testid="menuLinkHamburgerMenu" onClick={closeMenu}><div className='hamburgerMenuItemText'>MENU</div></NavLink></li>
        <li>{loggedIn
            ? <NavLink to="/" data-testid="hamburgerLogout" onClick={() => { logout() ; closeMenu(); }} ><div className='hamburgerMenuItemText'>LOG OUT</div></NavLink>
            : <NavLink to="/login" data-testid="hamburgerSignIn" onClick={closeMenu}><div className='hamburgerMenuItemText'>SIGN IN</div></NavLink>
          }</li>
      </ul>
    </div>
  );
}

export default HamburgerMenu;