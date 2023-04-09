import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Login from './pages/login';
import Menu from './pages/menu';
import Cart from './pages/cart';


function App() {
return (
	<Router>
	<Navbar />
	<Footer />

	<Routes>
		<Route path='/' element={<Home/>} />
		<Route path='/about' element={<About/>} />
		<Route path='/login' element={<Login/>} />
		<Route path='/menu' element={<Menu/>} />
		<Route path='/cart' element={<Cart/>} />
	</Routes>
	</Router>
);
}

export default App;
