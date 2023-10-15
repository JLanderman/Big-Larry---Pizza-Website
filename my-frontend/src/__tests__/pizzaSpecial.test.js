import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PizzaSp } from '../pages/pizzaSpecial';
import React from "react";
import "./App.css";


afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Pizza Specialties", () => {
    render(<PizzaSp />);
    test("Pizza Specialties page renders correctly", () => {
        const pizzaSp = screen.getByTestId("pizzaSpecialties");
        expect(pizzaSp).toBeInTheDocument();
    })
})