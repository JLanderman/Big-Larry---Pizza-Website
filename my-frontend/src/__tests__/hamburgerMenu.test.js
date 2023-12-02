import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Cookies from "js-cookie";
import HamburgerMenu from "../components/HamburgerMenu";
import AuthProvider, { useAuth } from '../contexts/authContext';
import { BrowserRouter } from 'react-router-dom';

afterEach(() =>{
    cleanup();
})

describe("HamburgerMenu", () =>{
    test("can be toggled", () =>{
        const onClickMock = jest.fn();
        render(<BrowserRouter><HamburgerMenu onClick={onClickMock}/></BrowserRouter>);

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
        expect(onClickMock).toHaveBeenCalled();
    });

    test("can be closed", () =>{
        const onClickMock = jest.fn();
        render(<BrowserRouter><HamburgerMenu onClick={onClickMock}/></BrowserRouter>);

        // Check for open style
        const HM = screen.getByTestId("hamburger-menu");
        const menu = screen.getByTestId("menu")
        const toggleButton = screen.getByTestId("menu-toggle");
        fireEvent.click(toggleButton);
        expect(HM).toHaveClass("hamburger-menu open");
        expect(menu).toHaveClass("menu open");

        // Check for closed style
        const close = screen.getByTestId("menuLinkHamburgerMenu");
        fireEvent.click(close);
        expect(HM).toHaveClass("hamburger-menu");
        expect(menu).toHaveClass("menu");
    });
});