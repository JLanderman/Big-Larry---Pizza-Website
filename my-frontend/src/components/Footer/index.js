import React from "react";
import { Container, Div } from "./FooterElements";
import { NavLink } from "../Navbar/NavbarElements";
import { phoneNum, address } from "../../data/global";

const Footer = () => {
  return (
    <Container data-testid="footer">
      <Div>
        <span>{phoneNum}</span>
        <br />
        <span>{address}</span>
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
