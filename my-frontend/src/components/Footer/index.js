import React from "react";
import { Container, Div } from "./FooterElements";
import { NavLink } from "../Navbar/NavbarElements";
import { phoneNum, address } from "../../data/global";

const Footer = () => {
  return (
    <Container data-testid="footer">
      <Div>
        <span style={{color: 'var(--clr-txt-light)'}} data-testid="footerPhoneNumber">{phoneNum}</span>
        <br />
        <span style={{color: 'var(--clr-txt-light)'}} data-testid="footerAddress">{address}</span>
      </Div>
      <Div>
        <NavLink to="https://www.facebook.com/bestfoodcountryclub/">
          Facebook
        </NavLink>
      </Div>
    </Container>
  );
};

export default Footer;
