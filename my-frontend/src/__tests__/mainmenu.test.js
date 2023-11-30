import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainMenu } from '../pages/mainmenu';
import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';

// Navigation mocks
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    mockNavigate.mockRestore();
})

describe("Main Menu", () => {
    test("renders correctly", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const menu = screen.getByTestId("mainMenu");
        expect(menu).toBeInTheDocument();
    })

    test("can navigate to pizza menu", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const nav = screen.getByTestId("navPizza");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/pizzaSpecial');
    })

    test("can navigate to combo special menu", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const nav = screen.getByTestId("navCombo");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/comboSpecial');
    })

    test("can navigate to drink menu", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const nav = screen.getByTestId("navDrink");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/drink');
    })

    test("can navigate to special deals menu", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const nav = screen.getByTestId("navSpecial");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/specialDeals');
    })

    test("can navigate to lunch menu", async () => {
        render(<BrowserRouter><MainMenu /></BrowserRouter>);
        const nav = screen.getByTestId("navLunch");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/lunchMenu');
    })
})