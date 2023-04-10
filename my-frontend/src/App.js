import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, About, Login, Menu, Cart } from './pages';


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
