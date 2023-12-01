import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pizza_customize } from '../pages/pizza_customize';
import React from "react";
import "./App.css";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Pizza Customize", () => {
    render(<Pizza_customize />);
    // Test 1
    test("renders container", () => {
        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    })
})
