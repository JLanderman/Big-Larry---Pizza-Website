import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { About } from '../pages/about';
import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("About Page", () => {
    test("About page renders correctly", () => {
        render(
            <About />
        );
        const aboutContainer = screen.getByTestId("about");
        expect(aboutContainer).toBeInTheDocument();
    })
    
    test("About text renders correctly", () => {
        render(
            <About />
        );
        const aboutText = screen.getByTestId("aboutText");
        expect(aboutText).toBeInTheDocument();
    })
})