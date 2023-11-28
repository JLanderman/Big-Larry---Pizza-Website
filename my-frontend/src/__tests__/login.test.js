import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from '../pages/login';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import UserService from "../services/UserData";
import { decodeJwt } from 'jose';
import Cookies from "js-cookie";
import { act } from 'react-test-renderer';
import AuthProvider from "../contexts/authContext";

// Login mocks
jest.mock("../services/UserData");
jest.mock('jose', () => ({
    ...jest.requireActual('jose'),
    decodeJwt: jest.fn(),
}));

// Navigation mocks
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
})

describe("Login Page", () => {
    test("renders", () => {
        render(<BrowserRouter><Login /></BrowserRouter>);

        const loginForm = screen.getByTestId("loginForm");
        expect(loginForm).toBeInTheDocument();
    })

    test("logs in and redirects admins", async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);

        // Setup mocks
        const mockToken = 'test';
        const mockClaims = { exp: Date.now() + 3600000, user: { isAdmin: true } };
        decodeJwt.mockReturnValue(mockClaims);
        UserService.login.mockResolvedValue({
            status: 200, // OK
            data: { token: mockToken }
        });

        jest.spyOn(Cookies, 'set');

        await act(async () => { // Simulate login
            fireEvent.click(screen.getByText(/Sign-In/i));
        })

        // Assert that the expected actions were called
        expect(Cookies.set).toHaveBeenCalledWith('x-auth-token', mockToken, {
            expires: new Date(mockClaims.exp),
        });
        expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });

    test("logs in and redirects normal users", async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);

        // Setup mocks
        const mockToken = 'test';
        const mockClaims = { exp: Date.now() + 3600000, user: { isAdmin: false } };
        decodeJwt.mockReturnValue(mockClaims);
        UserService.login.mockResolvedValue({
            status: 200, // OK
            data: { token: mockToken }
        });

        jest.spyOn(Cookies, 'set');

        await act(async () => {
            fireEvent.click(screen.getByText(/Sign-In/i));
        })

        // Assert that the expected actions were called
        expect(Cookies.set).toHaveBeenCalledWith('x-auth-token', mockToken, {
            expires: new Date(mockClaims.exp),
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test("handles login exceptions", async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        UserService.login.mockRejectedValue(new Error('Mocked error')); // Mocked error

        // Empty mock implementation prevents console from getting cluttered by the error mesesage
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Try to sign in so handleSubmit function is called
        fireEvent.click(screen.getByText(/Sign-In/i));

        await waitFor(() => { // Wait for error to print to console
            expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Mocked error' }));
        })

        consoleError.mockRestore(); // Restore original log implementation
    })

    test("redirects already logged in users", () => {
        render(<BrowserRouter><AuthProvider initialState={{ loggedIn: true }}><Login /></AuthProvider></BrowserRouter>);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    })
})