import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpDeals from '../pages/specialDeals';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import "./App.css";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Special Deals", () => {
    render(<BrowserRouter><SpDeals /></BrowserRouter>);
    test("Special Deals renders correctly", () => {
        const specialDeals = screen.getByTestId("specialDeals");
        expect(specialDeals).toBeInTheDocument();
    })
})