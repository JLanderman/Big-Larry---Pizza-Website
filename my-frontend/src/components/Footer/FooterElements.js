import {Link} from "react-router-dom";
import styled from 'styled-components';

export const Container = styled.footer`
position: absolute;
left: 0;
right: 0;
bottom: 0;
background: var(--clr-menu);
line-height: 1.1rem;
height: 40px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0.2rem clamp(2rem, 2vw, 5rem);
z-index: 12;
overflow: hidden;
`;

export const Div = styled.div`
padding: 0px 1rem;
`;