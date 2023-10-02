import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useAuth } from '../contexts/authContext';

import { HexColorPicker, HexColorInput } from "react-colorful";
import { useState } from "react";
import "./admin.css"

const Admin = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!auth) navigate('/');
  });

  const token = Cookies.get('x-auth-token');
    
    const PalettePreviewer = () => {
      return (
        <div className="preview-parent preview">
        {/* <div className="preview-accent-oval"></div> */}
          <div className="preview-header">
            <div className="navlink">
              SAM'S PIZZA & MORE
            </div>
            <div className="preview-header-navbar">
              <div className="navlink">ABOUT</div>
              <div className="navlink">MENU</div>
              <div className="navlink">SIGN IN</div>
            </div>
          </div>
          <div className="preview-body">
            <div className="preview-menuparent">
              <div className="preview-menu">Menu Item</div>
              <div className="preview-menu">Menu Item</div>
              <div className="preview-menu preview-highlight">Menu Item that's highlighted</div>
              <div className="preview-menu-light preview-lightmenu">
                Sometimes there's text in front of a lighter menu, and there may even be a 
                <a className="preview-link" href="#">Link to another website</a>
              </div>
            </div>
            <div className="preview-item">
              <div className="preview-menuitem">
                <div className="preview-menu-light preview-image-container">
                  <img className="preview-image" src="/static/media/Pizza Combination.3a624f328b5116121f7d.png" alt="Pizza CombinationCustom" />
                </div>
                <div className="preview-menu-description">
                  This is a sample description for the pizza. 
                  Make sure this is easy to read against the background!
                </div>
                <button className="preview-menu-dark preview-submit">Add to Order</button>
              </div>
            </div>
          </div>
          <div className="preview-footer">
            <div className="navlink">Address</div>
            <div className="navlink">Facebook</div>
          </div>
        </div>
      );
      
      // return (
      // <div className="preview-parent preview">
      //   <div className="preview menu">Menu</div>
      //   <div className="preview accent">Menu</div>
      //   <div className="preview menu">Menu</div>
      //   <div className="preview accent">Menu</div>
      //   <div className="preview menu">Menu</div>
      //   <div className="preview accent">Menu</div>
      //   <div className="preview menu">Menu</div>
      // </div>)
    }
    
    
    const PaletteManager = () => {
      let root = document.querySelector(":root");
      const [colorBG, setColorBG] = useState(window.getComputedStyle(root).getPropertyValue("--clr-bg"));
      const [colorText, setColorText] = useState(window.getComputedStyle(root).getPropertyValue("--clr-txt"));
      
      const [colorMenuLight, setColorMenuLight] = useState(window.getComputedStyle(root).getPropertyValue("--clr-menu-light"));
      const [colorMenu, setColorMenu] = useState(window.getComputedStyle(root).getPropertyValue("--clr-menu"));
      const [colorMenuDark, setColorMenuDark] = useState(window.getComputedStyle(root).getPropertyValue("--clr-menu-dark"));
      
      const [colorTextLight, setColorTextLight] = useState(window.getComputedStyle(root).getPropertyValue("--clr-txt-light"));
      const [colorTextHighlight, setColorTextHighlight] = useState(window.getComputedStyle(root).getPropertyValue("--clr-txt-highlight"));
      const [colorLink, setColorLink] = useState(window.getComputedStyle(root).getPropertyValue("--clr-link"));
      
      
    let crimsonPalette = [
      '#974545',
      '#fffdcb',
      '#c12d2d',
      '#760202',
      
      '#000000',
      '#ffd0d0',
      '#faffe2',
      '#e36316'
    ]
    
    let figmaPalette = [
      '#94dfdf',
      '#ffffff',
      '#d4d4d4',
      '#696969',
      
      '#222222',
      '#808080',
      '#c01111',
      '#0000ff'
    ]
    let pinkPalette = [
      '#ffa9f1',
      '#ffdfff',
      '#e473c2',
      '#be0973',
      
      '#630840',
      '#fff8e6',
      '#87edff',
      '#ffffff'
    ]
    
    let oceanPalette = [
      '#a5dee5',
      '#ddfff9',
      '#3e9ed0',
      '#1263a9',
      
      '#085463',
      '#c3f1d7',
      '#fff696',
      '#ffae5e'
    ]
    
    let burgerPalette = [
      '#dbcf86',
      '#fcffdd',
      '#b98347',
      '#754732',
      
      '#633008',
      '#fcf864',
      '#eaffd8',
      '#ffae5e'
    ]
    
    let halloweenPalette = [
      '#ebb67b',
      '#fffbd3',
      '#6353d8',
      '#5121a3',
      
      '#130e2c',
      '#ceb4f7',
      '#feff9b',
      '#d35eff'
    ]
    
    let paletteUpdate = (array) => {
          setColorBG(array[0]);
          setColorMenuLight(array[1])
          setColorMenu(array[2])
          setColorMenuDark(array[3])
          setColorText(array[4])
          setColorTextLight(array[5])
          setColorTextHighlight(array[6])
          setColorLink(array[7])
    }
      
    let updateColors = (element) => {
      element.setAttribute(
              "style",
              `
              --clr-bg: ${colorBG};
              --clr-menu-light: ${colorMenuLight};
              --clr-menu: ${colorMenu};
              --clr-menu-dark: ${colorMenuDark};
              
              --clr-txt: ${colorText};
              --clr-txt-light: ${colorTextLight};
              --clr-txt-highlight: ${colorTextHighlight};
              --clr-link: ${colorLink};
                `
            );
            //add logic here to push changes to db
    }
      
      let updatePreviewColors = () => {
        let previewRoot = document.querySelector(".preview");
        updateColors(previewRoot);
      }
      
      let updateRootColors = () => {
        let root = document.querySelector(":root");
        updateColors(root);
      }
      
      useEffect(() => {
        updatePreviewColors();
      }, [colorBG, colorMenuLight, colorMenu, colorMenuDark, colorText, colorTextLight, colorTextHighlight, colorLink]);
      
      let MetaUpdate = (array) => {
        // let previewer = document.querySelector(".preview-parent")
        // previewer.paletteUpdate(array);
        paletteUpdate(array);
      }
      
      return (<div className="palette-grandparent">
        <div className="palette-parent">
          {/* <ColorPickerComponent setterFunction={setColorBG} /> */}
          
          <div className="palette-container">
            Background
            <HexColorPicker color={colorBG} onChange={(e) => {setColorBG(e); updatePreviewColors();}} />
            <HexColorInput color={colorBG} onChange={(e) => {setColorBG(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Menu (Light)
            <HexColorPicker color={colorMenuLight} onChange={(e) => {setColorMenuLight(e); updatePreviewColors();}} />
            <HexColorInput color={colorMenuLight} onChange={(e) => {setColorMenuLight(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Menu (Main)
            <HexColorPicker color={colorMenu} onChange={(e) => {setColorMenu(e); updatePreviewColors();}} />
            <HexColorInput color={colorMenu} onChange={(e) => {setColorMenu(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Menu (Dark)
            <HexColorPicker color={colorMenuDark} onChange={(e) => {setColorMenuDark(e); updatePreviewColors();}} />
            <HexColorInput color={colorMenuDark} onChange={(e) => {setColorMenuDark(e); updatePreviewColors();}} />
          </div>
        </div>
        <div className="palette-parent">
          <div className="palette-container">
            Text (Main)
            <HexColorPicker color={colorText} onChange={(e) => {setColorText(e); updatePreviewColors();}} />
            <HexColorInput color={colorText} onChange={(e) => {setColorText(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Text (light)
            <HexColorPicker color={colorTextLight} onChange={(e) => {setColorTextLight(e); updatePreviewColors();}} />
            <HexColorInput color={colorTextLight} onChange={(e) => {setColorTextLight(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Text (Highlighted)
            <HexColorPicker color={colorTextHighlight} onChange={(e) => {setColorTextHighlight(e); updatePreviewColors();}} />
            <HexColorInput color={colorTextHighlight} onChange={(e) => {setColorTextHighlight(e); updatePreviewColors();}} />
          </div>
          <div className="palette-container">
            Text (Link)
            <HexColorPicker color={colorLink} onChange={(e) => {setColorLink(e); updatePreviewColors();}} />
            <HexColorInput color={colorLink} onChange={(e) => {setColorLink(e); updatePreviewColors();}} />
          </div>
        </div>
        <button onClick={updateRootColors}>Apply changes to site</button>
        <div className="palette-presets">
          <button onClick={(e) => {MetaUpdate(crimsonPalette);   }}>Crimson</button>
          <button onClick={(e) => {MetaUpdate(figmaPalette);     }}>Figma</button>
          <button onClick={(e) => {MetaUpdate(pinkPalette);      }}>Pink</button>
          <button onClick={(e) => {MetaUpdate(oceanPalette);     }}>Ocean</button>
          <button onClick={(e) => {MetaUpdate(burgerPalette);    }}>Burger</button>
          <button onClick={(e) => {MetaUpdate(halloweenPalette); }}>Halloween</button>
        </div>
      </div>);
    };
    
    return ( // render admin page
    <div className="admin-container">
        <PalettePreviewer />
        <PaletteManager />
    </div>
    )
};

export default Admin;
