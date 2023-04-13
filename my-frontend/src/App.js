import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import { Home, Login, Menu, Cart } from './pages';

const styles = {
	appContainer : {
		position: 'relative',
		minHeight: '100vh'
	},
	contentWrap : {
		paddingBottom: 'calc(40px + 0.4rem)' // Space for footer
	}
};

function App() {
return (
	<Router>
	<div id="app-container" style={styles.appContainer}>
		<div id="content-wrap" style={styles.contentWrap}>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/about' element={<About/>} />
					<Route path='/login' element={<Login/>} />
					<Route path='/menu' element={<Menu/>} />
					<Route path='/cart' element={<Cart/>} />
				</Routes>
		</div>
		<Footer />
	</div>
	</Router>
);
}

export default App;
