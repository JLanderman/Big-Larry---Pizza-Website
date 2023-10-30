import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Admin from './pages/admin';
import { Home } from "./pages";
import Login from "./pages/login";
import EditUserCred from "./pages/editUser";
import MainMenu from './pages/mainmenu';
import Menu from "./pages/menu";
import Details from "./pages/details";
import PizzaCustomize from './pages/pizza_customize'
import Lunch from './pages/lunchMenu';
import Drink from "./pages/drink";
import DrinkSpecialties from "./pages/drink";
import ComboSp from './pages/comboSpecial';
import PizzaSp from './pages/pizzaSpecial';
import SpDeals from './pages/specialDeals';
import AuthProvider from './contexts/authContext';
import UploadTemplate from './pages/uploadTemplate';
import UploadTextTemplate from './pages/uploadTextTemplate';
import EditItem from './pages/editItem';
import PaletteService from "./services/paletteData"


let res = PaletteService.getLatestPalette()
  .then((res) => {
    console.log("getCurrentPalette return = " + JSON.stringify(res.data))
    let currentPaletteArr = res.data.palette[0].colorArr;
    // console.log(JSON.stringify(currentPaletteArr))
    let root = document.querySelector(":root");
    root.setAttribute(
      "style",
      `
      --clr-bg: ${currentPaletteArr[0]};
      --clr-menu-light: ${currentPaletteArr[1]};
      --clr-menu: ${currentPaletteArr[2]};
      --clr-menu-dark: ${currentPaletteArr[3]};
      
      --clr-txt: ${currentPaletteArr[4]};
      --clr-txt-light: ${currentPaletteArr[5]};
      --clr-txt-highlight: ${currentPaletteArr[6]};
      --clr-link: ${currentPaletteArr[7]};
        `
    );
  }).catch((e) => {
    console.log("error in admin getCurrentPalette")
    console.log(e);
  })

const styles = {
  appContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "var(--clr-bg)",
    color: "var(--clr-txt)",
    fontWeight: "bold",
    fontFamily: 'Roboto, Helvetica, Segoe UI, Arial, sans-serif',
    display: "flex",
    flexDirection: "column",
    paddingBottom: "4rem",
  },
};

function App() {
  return (
    <div id="app-container" data-testid="app" style={styles.appContainer}>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/editUserCred" element={<EditUserCred />} />
              <Route path="/mainmenu" element={<MainMenu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/comboSpecial" element={<ComboSp />} />
              <Route path="/pizzaSpecial" element={<PizzaSp />} />
              <Route path="/specialDeals" element={<SpDeals />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/pizza_customize" element={<PizzaCustomize />} />
              <Route path="/lunchMenu" element={<Lunch />} />
              <Route path="/drink" element={<Drink />} />
              <Route path="/drink" element={<DrinkSpecialties />} />
              <Route path="/ItemFormLarge" element={<UploadTemplate />} />
              <Route path="/TextForm" element={<UploadTextTemplate />} />
              <Route path="/TextForm/:id" element={<UploadTextTemplate />} />
              <Route path="/editItem/:id" element={<EditItem />} />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
