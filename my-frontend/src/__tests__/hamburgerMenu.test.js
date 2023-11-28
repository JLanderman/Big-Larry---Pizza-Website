import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Cookies from "js-cookie";
import HamburgerMenu from "../components/HamburgerMenu";
import AuthProvider, { useAuth } from '../contexts/authContext';
import { BrowserRouter } from 'react-router-dom';

afterEach(() =>{
    cleanup();
})

describe("HamburgerMenu", () =>{
    const loggedInState = {
        auth: true,
        loggedIn: true,
    }

    it("can be toggled", () =>{
        render(<BrowserRouter><HamburgerMenu/></BrowserRouter>);

        // Check for normal style
        const HM = screen.getByTestId("hamburger-menu");
        const menu = screen.getByTestId("menu")
        expect(HM).toHaveClass("hamburger-menu");
        expect(menu).toHaveClass("menu");

        // Check for open style
        const toggleButton = screen.getByTestId("menu-toggle");
        fireEvent.click(toggleButton);
        expect(HM).toHaveClass("hamburger-menu open");
        expect(menu).toHaveClass("menu open");
    });

    it("renders the sign in link", () =>{
        render(<BrowserRouter><HamburgerMenu/></BrowserRouter>);
        const link = screen.getByTestId("hamburgerSignIn");
        expect(link).toBeInTheDocument();
    })

    it("renders the log out link", () =>{
        render(<BrowserRouter><AuthProvider initialState={loggedInState}>
            <HamburgerMenu/></AuthProvider></BrowserRouter>);

        const link = screen.getByTestId("hamburgerLogout");
        expect(link).toBeInTheDocument();
    })

    it("logs the user out", () =>{
        // Setup
        render(<BrowserRouter><AuthProvider initialState={loggedInState}>
            <HamburgerMenu/></AuthProvider></BrowserRouter>);
        Cookies.set('x-auth-token', 'test');
        
        // Logout
        const logoutLink = screen.getByTestId("hamburgerLogout");
        fireEvent.click(logoutLink);

        // Check result
        const cookie = Cookies.get('x-auth-token');
        expect(cookie).toBe(undefined);
    });
});