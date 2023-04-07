import {Link} from "react-router-dom";
import styled from 'styled-components';

export const Container = styled.footer`
position: absolute;
left: 0;
right: 0;
bottom: 0;
margin: 8px;
background: #D9D9D9;
height: 40px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12
`;

export const Div = styled.div`
padding: 0px 1rem;
`;