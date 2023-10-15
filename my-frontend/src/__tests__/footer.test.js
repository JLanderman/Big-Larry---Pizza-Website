import {render, fireEvent, screen, cleanup} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer/index";
import { phoneNum, address } from "../data/global";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('Footer renders', () => {
    render(
    <BrowserRouter>
        <Footer />
    </BrowserRouter>
    );
    
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument();
})
test('phone number renders in footer', () => {
    render(
    <BrowserRouter>
        <Footer />
    </BrowserRouter>);
    const phone = screen.getByTestId("footerPhoneNumber")
    expect(phone.textContent).toEqual(phoneNum);
})
test('address renders in footer', () => {
    render(
    <BrowserRouter>
        <Footer />
    </BrowserRouter>);
    const footerAddress = screen.getByTestId("footerAddress")
    expect(footerAddress.textContent).toEqual(address);
})