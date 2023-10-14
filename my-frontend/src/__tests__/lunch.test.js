import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Lunch } from '../pages/lunchMenu';
import React from "react";
import "./App.css";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Lunch menu", () => {
    render(<Lunch />);
    test("lunch menu renders correctly", () => {
        const lunchMenu = screen.getByTestId("lunch");
        expect(lunchMenu).toBeInTheDocument();
    })
})
