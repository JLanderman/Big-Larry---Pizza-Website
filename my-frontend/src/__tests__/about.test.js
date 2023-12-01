import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { About } from '../pages/about';
import React from "react";

beforeEach(() => {
    render(<About />);
})

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("About", () => {
    test("renders container", () => {
        const aboutContainer = screen.getByTestId("about");
        expect(aboutContainer).toBeInTheDocument();
    })
    
    test("renders about text", () => {
        const aboutText = screen.getByTestId("aboutText");
        expect(aboutText).toBeInTheDocument();
    })

    test("renders map", () => {
        const map = screen.getByTestId("map");
        expect(map).toBeInTheDocument();
    })
})