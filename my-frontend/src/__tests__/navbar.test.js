import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/index";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('Header renders', () => {
    render(
    <BrowserRouter>
        <Navbar />
    </BrowserRouter>
    );
    
    const header = screen.getByTestId("navbar")
    expect(header).toBeInTheDocument();
})

test('Menu Link renders in header', () => {
    render(
    <BrowserRouter>
        <Navbar />
    </BrowserRouter>
    );
    
    const menu = screen.getByTestId("menuLink")
    expect(menu).toBeInTheDocument();
})