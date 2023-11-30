import {render, fireEvent, screen, cleanup} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer/index";
import { phoneNum, address } from "../data/global";
import Cookies from 'js-cookie';
import AuthProvider from "../contexts/authContext";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe('Footer', () => {
    test('renders properly', () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);
        const footer = screen.getByTestId("footer")
        expect(footer).toBeInTheDocument();
    })
    
    test('renders phone number', () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);
        const phone = screen.getByTestId("footerPhoneNumber")
        expect(phone.textContent).toEqual(phoneNum);
    })
    
    test('renders address', () => {
        render(<BrowserRouter><Footer /></BrowserRouter>);
        const footerAddress = screen.getByTestId("footerAddress")
        expect(footerAddress.textContent).toEqual(address);
    })

    test('can log the user out', () =>{
        // Setup test
        render(<BrowserRouter><AuthProvider initialState={{auth: true, loggedIn: true}}><Footer /></AuthProvider></BrowserRouter>);
        Cookies.set('x-auth-token', 'testToken');

        // Run test
        const logout = screen.getByTestId("logout");
        fireEvent.click(logout);
        expect(Cookies.get('x-auth-token')).toBe(undefined);
    })
})
