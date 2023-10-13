import React from "react";
import { Nav, NavLink, Bars, NavMenu} from "./NavbarElements";
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
      <Nav data-testid="navbar">
        <NavLink to="/">
          SAM'S PIZZA & MORE
        </NavLink>
        <Bars />

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