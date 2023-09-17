import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background: var(--clr-menu);
height: 4rem;
display: flex;
justify-content: space-between;
padding: 0.2rem clamp(2rem, 2vw, 5rem);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
font-size: 1.25rem;
color: var(--clr-txt-light);
display: flex;
align-items: center;
text-decoration: none;
padding: 0 clamp(1rem, 2vw, 2.5rem);
height: 100%;
cursor: pointer;
&.active {
  color: var(--clr-txt);
}
&:hover {
  color: var(--clr-txt-highlight);
}
`;

export const Bars = styled(FaBars)`
display: none;
color: var(--clr-txt-light);
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: clamp(0rem, 1vw, 3rem);
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: var(--clr-txt);
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: var(--clr-txt-light);
}
`;
