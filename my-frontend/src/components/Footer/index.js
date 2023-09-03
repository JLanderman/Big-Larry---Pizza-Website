import React from "react";
import { Container, Div } from "./FooterElements";
import { NavLink } from "../Navbar/NavbarElements";
const Footer = () => {
  return (
    <Container>
      <Div>
        <span>(209) 463-0210</span>
        <br />
        <span>1852 Country Club Blvd, Stockton, CA</span>
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
