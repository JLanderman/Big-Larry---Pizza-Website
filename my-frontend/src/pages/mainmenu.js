import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router";
import downArrow from '../images/Other/downArrow.png';
import hotwings from '../images/Other/hotwingsCartoon.png';
import taco from '../images/Other/tacoCartoon.png';
import icecream from '../images/Other/icecreamCartoon.png';

/*
   .webp files are used if supported by the user's browser. 
   They are much smaller in size and load faster.
*/
import hotwings_webp from '../images/Other/hotwingsCartoon.webp';
import taco_webp from '../images/Other/tacoCartoon.webp';
import icecream_webp from '../images/Other/icecreamCartoon.webp';

// const styles = {
//   container: {
//     margin: '5% 10%',
//     paddingTop: '20px',
//     paddingBottom: '20px',
//     paddingLeft: 'min(20px, 0.1vw)',
//     paddingRight: 'min(20px, 0.1vw)',
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     minHeight: '300px',
//     minWidth: '300px',
//   },
//   header: {
//     display: 'flex',
//     width: '100%',
//     fontSize: 'min(40px, 8vw)',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'var(--clr-txt-dark)'
//   },
//   downArrow: {
//     marginLeft: 'max(20px, 2vw)',
//     marginRight: 'max(20px, 2vw)',
//     height: 'min(60px, 12vw)',
//   },
//   submenuGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gridColumnGap: 'min(40px, 4vw)',
//     gridRowGap: 'min(30px, 1.5vh)',
//     marginTop: '50px',
//     minHeight: '300px',
//     minWidth: '300px',
//   },
//   pictureGrid: {
//     display: 'grid',
//     width: '100%',
//     maxWidth: '100%',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gap: '10%',
//     alignItems: 'center',
//     alignText: 'center',
//     marginTop: '50px',
//   }, 
//   picture: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',
//   },
// };

const SubmenuButton = styled.button`
font-size: min(35px, 5vw);
font-weight: bold;
color: var(--clr-txt-dark);
border: none;
width: 100%;
padding-top: min(20px, 1.5vh);
padding-bottom: min(20px, 1.5vh);
background-color: var(--clr-menu);
border-radius: 20px;
&:hover {
  color: var(--clr-txt-highlight);
}
`

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="mainMenuContainer" data-testid="mainMenu">
      <div className="mainMenuHeader">
        <img src={downArrow} className="mainMenuDownArrow" alt='downArrow' />
        <span>CHECK OUT OUR MENU</span>
        <img src={downArrow} className="mainMenuDownArrow" alt='downArrow' />
      </div>
      <div className="mainMenuSubmenuGrid" >
        <SubmenuButton onClick={() => navigate('/lunchMenu')}>LUNCH & DINNER</SubmenuButton>
        <SubmenuButton onClick={() => navigate('/drink')}>DRINK SPECIALTIES</SubmenuButton>
        <SubmenuButton onClick={() => navigate('/pizzaSpecial')}>PIZZA SPECIALTIES</SubmenuButton>
        <SubmenuButton onClick={() => navigate('/comboSpecial')}>COMBO SPECIALTIES</SubmenuButton>
        <SubmenuButton onClick={() => navigate('/specialDeals')}>SPECIAL DEALS</SubmenuButton>
      </div>
      <div className="mainMenuPictureGrid">
        <picture>
          <source type="image/webp" srcSet={hotwings_webp} />
          <source type="image/png" srcSet={hotwings} />
          <img src={hotwings} className="mainMenuPicture" alt='hotwings' />
        </picture>
        <picture>
          <source type="image/webp" srcSet={taco_webp} />
          <source type="image/png" srcSet={taco} />
          <img src={taco} className="mainMenuPicture" alt='taco' />
        </picture>
        <picture>
          <source type="image/webp" srcSet={icecream_webp} />
          <source type="image/png" srcSet={icecream} />
          <img src={icecream} className="mainMenuPicture" alt='icecream' />
        </picture>
      </div>
    </div>
  );
};

export { MainMenu }
export default MainMenu;