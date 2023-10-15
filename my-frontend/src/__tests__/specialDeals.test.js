import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpDeals from '../pages/specialDeals';
import React from "react";
import "./App.css";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Special Deals", () => {
    render(<SpDeals />);
    test("Special Deals renders correctly", () => {
        const specialDeals = screen.getByTestId("specialDeals");
        expect(specialDeals).toBeInTheDocument();
    })
})