import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/index";
import AuthProvider from '../contexts/authContext';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe('Navbar', () =>{
    // Values to pass to AuthProvider
    const loggedIn = {
        auth: true,
        loggedIn: true,
    }

    test('renders', () => {
        render(<BrowserRouter><Navbar /></BrowserRouter>);
        const header = screen.getByTestId("navbar")
        expect(header).toBeInTheDocument();
    })
    
    test('renders menuLink', () => {
        render(<BrowserRouter><Navbar /></BrowserRouter>);
        const menu = screen.getByTestId("menuLink")
        expect(menu).toBeInTheDocument();
    })

    test('renders admin-only links', () => {
        // Setup logged in state
        render(<BrowserRouter><AuthProvider initialState={loggedIn}>
            <Navbar /></AuthProvider></BrowserRouter>);
        
        const adminLink = screen.getByTestId("adminLink");
        const editCredLink = screen.getByTestId("editCredLink");
        expect(adminLink).toBeInTheDocument();
        expect(editCredLink).toBeInTheDocument();
    })
});
