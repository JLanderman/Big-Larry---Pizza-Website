import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from '../pages/login';
import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Login Page", () => {
    test("Login page renders correctly", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const loginForm = screen.getByTestId("loginForm");
        expect(loginForm).toBeInTheDocument();
    })
})