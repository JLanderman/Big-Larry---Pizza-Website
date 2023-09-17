import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router";

const styles = {
  container: {
    margin: '5% 10%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '500px',
    minWidth: '500px',
  },
  header: {
    fontSize: '40px',
    textAlign: 'center',
    color: 'var(--clr-txt-dark)'
  },
  submenuGrid: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridColumnGap: '40px',
    gridRowGap: '30px',
    marginTop: '50px'
  },
};

const SubmenuLink = styled.button`
font-size: 34px;
font-weight: bold;
color: var(--clr-txt-dark);
border: none;
width: 100%;
padding-top: 20px;
padding-bottom: 20px;
background-color: var(--clr-menu);
border-radius: 20px;
&:hover {
  color: var(--clr-txt-highlight);
}
`

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <span style={styles.header}>CHECK OUT OUR MENU</span>
      <div style={styles.submenuGrid}>
        <SubmenuLink onClick={() => navigate('/lunchMenu')}>LUNCH & DINNER</SubmenuLink>
        <SubmenuLink onClick={() => navigate('/drink')}>DRINK SPECIALTIES</SubmenuLink>
        <SubmenuLink onClick={() => navigate('/pizzaSpecial')}>PIZZA SPECIALTIES</SubmenuLink>
        <SubmenuLink onClick={() => navigate('/comboSpecial')}>COMBO SPECIALTIES</SubmenuLink>
        <SubmenuLink onClick={() => navigate('/specialDeals')}>SPECIAL DEALS</SubmenuLink>
      </div>
    </div>
  );
};

export default MainMenu;