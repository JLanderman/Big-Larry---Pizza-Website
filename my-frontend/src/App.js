import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Admin from './pages/admin';
import { Home } from "./pages";
import Login from "./pages/login";
import MainMenu from './pages/mainmenu';
import Menu from "./pages/menu";
import Details from "./pages/details";
import Cart from './pages/cart';
import Payment from './pages/payment';
import Pizza_customize from './pages/pizza_customize'
import Lunch from './pages/lunchMenu';
import Drink_specialties from "./pages/drink";
import ComboSp from './pages/comboSpecial';
import PizzaSp from './pages/pizzaSpecial';
import SpDeals from './pages/specialDeals';
import ListOrderManager from './pages/listOrderManager';
import AuthProvider from './contexts/authContext';
import UploadTemplate from './pages/uploadTemplate';
import UploadTextTemplate from './pages/uploadTextTemplate';




const styles = {
  appContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "var(--clr-bg)",
    color: "var(--clr-txt)",
    fontWeight: "bold",
  },
  contentWrap: {
    paddingBottom: "4rem", // Space for footer
  },
};

function App() {
  return (
    <div id="app-container" data-testid="app" style={styles.appContainer}>
      <div id="content-wrap" data-testid="content-wrap" style={styles.contentWrap}>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mainmenu" element={<MainMenu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/comboSpecial" element={<ComboSp />} />
              <Route path="/pizzaSpecial" element={<PizzaSp />} />
              <Route path="/specialDeals" element={<SpDeals />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/pizza_customize" element={<Pizza_customize />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/lunchMenu" element={<Lunch />} />
              <Route path="/drink" element={<Drink_specialties />} />
              <Route path="/listOrderManager" element={<ListOrderManager />} />
              <Route path="/ItemFormLarge" element={<UploadTemplate />} />
              <Route path="/TextForm" element={<UploadTextTemplate />} />

            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
