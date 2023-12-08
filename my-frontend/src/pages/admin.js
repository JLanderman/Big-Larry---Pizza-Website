import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useAuth } from '../contexts/authContext';
import UserService from "../services/UserData";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "./admin.css"
import pizzacustom from "../images/Pizza Specialties/Customize Pizza.jpg"
import PaletteService from "../services/paletteData"

const Admin = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
      if (!auth) navigate('/');
    });
    
    const token = Cookies.get('x-auth-token');

    let defaultPalette = [
      '#ffffff',
      '#ffffff',
      '#ffffff',
      '#ffffff',
      
      '#ffffff',
      '#ffffff',
      '#ffffff',
      '#ffffff'
    ]

    // eslint-disable-next-line
    const [currentPalette, setCurrentPalette] = useState({palette: [defaultPalette]});
    const getCurrentPalette = () => {
      // eslint-disable-next-line
      PaletteService.getLatestPalette()
        .then((res) => {
          // console.log("getCurrentPalette return = " + JSON.stringify(res.data))
          setCurrentPalette(res.data)
          // console.log(JSON.stringify(currentPalette))
          // console.log(JSON.stringify(currentPalette.palette[0].colorArr))
          // console.log(JSON.stringify(res.data.palette[0].colorArr))
        }).catch((e) => {
          console.error(e);
        })
    };
    
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [customPalettes, setCustomPalettes] = useState([]);
    const retrievePalettes = () => {
      // console.log("retrievePalettes in admin.js")
      PaletteService.getLastTenPalettes()
        .then((res) => {
          setCustomPalettes(res.data)
          setLoading(false); // Set loading to false once data is fetched
        }).catch((e) => {
          console.error(e);
          setLoading(false); // Ensure loading is set to false on error as well
        })
    };
    
    useEffect(() => {
      retrievePalettes();
      getCurrentPalette();
    }, []);
    
    const PalettePreviewer = () => {
      return (
        <div className="preview-parent preview" data-testid="palettePreviewer">
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
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="preview-link" href="#">Link to another website</a>
              </div>
            </div>
            <div className="preview-item">
              <div className="preview-menuitem">
                <div className="preview-menu-light preview-image-container">
                  <img className="preview-image" src={pizzacustom} alt="Pizza CombinationCustom" />
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
    };
    
    
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
    };
      
      let updatePreviewColors = () => {
        let previewRoot = document.querySelector(".preview");
        updateColors(previewRoot);
      }
      
      let updateRootColors = () => {
        let root = document.querySelector(":root");
        updateColors(root);
        
        //logic here to push changes to db
        pushPalette();
      };

      // eslint-disable-next-line
      useEffect(() => {
        updatePreviewColors();
        //eslint-disable-next-line
      }, [colorBG, colorMenuLight, colorMenu, colorMenuDark, colorText, colorTextLight, colorTextHighlight, colorLink]);
      
      let MetaUpdate = (array, name) => {
        paletteUpdate(array);
        setCustomPaletteName(name);
      };
      
      const [customPaletteName, setCustomPaletteName] = useState("Custom");
      const pushPalette = async () => {
        const user = await UserService.getUserbyToken(token);
        // console.log("pushPalette")
        // eslint-disable-next-line
        const res = await PaletteService.putPaletteFront(customPaletteName, [colorBG, colorMenuLight, colorMenu, colorMenuDark, colorText, colorTextLight, colorTextHighlight, colorLink], user, token)
          .then((res) => {
            // console.log("putPaletteFront response = " + res.data); 
          })
          .catch((e) => {
            console.error(e);
          });
          
        retrievePalettes();
      };
      
      return (<div className="palette-grandparent" data-testid="palettePicker">
        <div className="palette-parent">
          {/* <ColorPickerComponent setterFunction={setColorBG} /> */}
          
          <div className="palette-container">
            Background
            <HexColorPicker color={colorBG} onChange={(e) => {setColorBG(e); updatePreviewColors();}} data-testid="backgroundPicker"/>
            <HexColorInput color={colorBG} onChange={(e) => {setColorBG(e); updatePreviewColors();}} data-testid="backgroundInput"/>
          </div>
          <div className="palette-container">
            Menu (Light)
            <HexColorPicker color={colorMenuLight} onChange={(e) => {setColorMenuLight(e); updatePreviewColors();}} data-testid="menuLightPicker"/>
            <HexColorInput color={colorMenuLight} onChange={(e) => {setColorMenuLight(e); updatePreviewColors();}} data-testid="menuLightInput"/>
          </div>
          <div className="palette-container">
            Menu (Main)
            <HexColorPicker color={colorMenu} onChange={(e) => {setColorMenu(e); updatePreviewColors();}} data-testid="menuPicker"/>
            <HexColorInput color={colorMenu} onChange={(e) => {setColorMenu(e); updatePreviewColors();}} data-testid="menuInput"/>
          </div>
          <div className="palette-container">
            Menu (Dark)
            <HexColorPicker color={colorMenuDark} onChange={(e) => {setColorMenuDark(e); updatePreviewColors();}} data-testid="menuDarkPicker"/>
            <HexColorInput color={colorMenuDark} onChange={(e) => {setColorMenuDark(e); updatePreviewColors();}} data-testid="menuDarkInput"/>
          </div>
        </div>
        <div className="palette-parent">
          <div className="palette-container">
            Text (Main)
            <HexColorPicker color={colorText} onChange={(e) => {setColorText(e); updatePreviewColors();}} data-testid="textPicker"/>
            <HexColorInput color={colorText} onChange={(e) => {setColorText(e); updatePreviewColors();}} data-testid="textInput"/>
          </div>
          <div className="palette-container">
            Text (light)
            <HexColorPicker color={colorTextLight} onChange={(e) => {setColorTextLight(e); updatePreviewColors();}} data-testid="textLightPicker"/>
            <HexColorInput color={colorTextLight} onChange={(e) => {setColorTextLight(e); updatePreviewColors();}} data-testid="textLightInput"/>
          </div>
          <div className="palette-container">
            Text (Highlighted)
            <HexColorPicker color={colorTextHighlight} onChange={(e) => {setColorTextHighlight(e); updatePreviewColors();}} data-testid="textHLPicker"/>
            <HexColorInput color={colorTextHighlight} onChange={(e) => {setColorTextHighlight(e); updatePreviewColors();}} data-testid="textHLInput"/>
          </div>
          <div className="palette-container">
            Text (Link)
            <HexColorPicker color={colorLink} onChange={(e) => {setColorLink(e); updatePreviewColors();}} data-testid="textLinkPicker"/>
            <HexColorInput color={colorLink} onChange={(e) => {setColorLink(e); updatePreviewColors();}} data-testid="textLinkInput"/>
          </div>
        </div>
        <div>
          <button className="custom-palette-apply" onClick={updateRootColors} data-testid="applyPalette">Apply changes to site</button>
          <input type="text" value={customPaletteName} onInput={e => setCustomPaletteName(e.target.value)} className="custom-palette-name" data-testid="namePalette"></input>
        </div>
        <div className="palette-presets">
          <button onClick={(e) => {MetaUpdate(crimsonPalette, "Crimson");     }} data-testid="crimsonPreset">Crimson</button>
          <button onClick={(e) => {MetaUpdate(figmaPalette, "Figma");         }} data-testid="figmaPreset">Figma</button>
          <button onClick={(e) => {MetaUpdate(pinkPalette, "Pink");           }} data-testid="pinkPreset">Pink</button>
          <button onClick={(e) => {MetaUpdate(oceanPalette, "Ocean");         }} data-testid="oceanPreset">Ocean</button>
          <button onClick={(e) => {MetaUpdate(burgerPalette, "Burger");       }} data-testid="burgerPreset">Burger</button>
          <button onClick={(e) => {MetaUpdate(halloweenPalette, "Halloween"); }} data-testid="halloweenPreset">Halloween</button>
        </div>
        
        <h3>History of Recent Palettes:</h3>
        <div className="palette-history" data-testid="paletteHistoryContainer">
          {!Array.isArray(customPalettes)
            ? customPalettes.palettes.map((currentItem, index) => {
                return (
                  <button key={index} onClick={e => MetaUpdate(currentItem.colorArr, currentItem.name)}>
                    <div data-testid="paletteHistoryItem">
                      {(index + 1) + ". "} 
                      {currentItem.name}
                    </div>
                  </button>
                );
              })
            : loading ? (
              <p>Loading...</p> // Display a loading indicator while data is being fetched
            ) : (
              <p>No palettes found</p> // Or any alternate UI when customPalettes is not an array
            )}
        </div>
      </div>);
    };
    
    return ( // render admin page
    <div className="admin-container" data-testid="adminContainer">
        <PalettePreviewer />
        <PaletteManager />
    </div>
    );
};

export { Admin };
export default Admin;
