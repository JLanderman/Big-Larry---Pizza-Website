import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
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
	<Routes>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/login' component={Login} />
		<Route path='/menu' component={Menu} />
		<Route path='/cart' component={Cart} />
	</Routes>
	</Router>
);
}

export default App;
