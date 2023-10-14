import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainMenu } from '../pages/mainmenu';
import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Main Menu", () => {
    test("Main Menu page renders correctly", async () => {
        render(
            <BrowserRouter>
                <MainMenu />
            </BrowserRouter>
        );
        const menu = screen.getByTestId("mainMenu");
        expect(menu).toBeInTheDocument();
    })
})