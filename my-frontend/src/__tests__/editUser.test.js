import { React, useState, useEffect } from "react";
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import UserService from "../services/UserData";
import EditUser from "../pages/editUser";
import { BrowserRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import AuthProvider from '../contexts/authContext';

// Mock services
jest.mock("../services/UserData.js");
jest.mock("js-cookie");

beforeEach(async () => {
    // Mock response from UserService
    // UserService.getItemById.mockResolvedValue({
    //     data: [{
    //         _id: "5555555555555555555555",
    //         name: "Test item",
    //         price: "999", // No decimals
    //         price_chicken: "1099",
    //         price_veggie: "1199",
    //         info: "This is a test item"
    //     }]
    // });

    const loggedIn = {
        loggedIn: true,
        auth: true
    }

    render(
        <AuthProvider initialState={loggedIn}>
            <BrowserRouter>
                <EditUser />
            </BrowserRouter>
        </AuthProvider>
    );

    // Wait for dynamic renders
    await waitFor(() => screen.getByTestId("editUserWrapper"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("EditUser", () => {
    test("renders the editUserWrapper", () => {
        const editUserWrapper = screen.getByTestId("editUserWrapper");
        expect(editUserWrapper).toBeInTheDocument();
    })

    test("renders input fields", () => {
        const newPasswordField = screen.getByTestId("newPasswordField");
        expect(newPasswordField).toBeInTheDocument();
    })

    test("sets error when passwords do not match", async () => {
        // Setup and submit mismatching passwords
        const form = screen.getByTestId("editUserForm");
        const newPassword = screen.getByTestId("newPassword");
        const confirmPassword = screen.getByTestId("confirmPassword");
        fireEvent.change(newPassword, { target: { value: 'testPassword' } });
        fireEvent.change(confirmPassword, { target: { value: 'differentPassword' } });
        fireEvent.submit(form);

        await waitFor(async () => { // Wait for error
            expect(screen.getByTestId("editUserError")).toBeInTheDocument();
        })
    })

    test("sets success when user credentials are updated", async () => {
        // Mocks
        Cookies.get.mockReturnValue('testToken');
        UserService.getUserbyToken.mockResolvedValue({});
        UserService.editUserCred.mockResolvedValue({ username: 'testUser' });

        // Setup credentials
        const form = screen.getByTestId("editUserForm");
        const newUsername = screen.getByTestId("newUsername");
        const newPassword = screen.getByTestId("newPassword");
        const confirmPassword = screen.getByTestId("confirmPassword");

        // Submit form
        fireEvent.change(newUsername, { target: { value: 'testUsername' } });
        fireEvent.change(newPassword, { target: { value: 'testPassword' } });
        fireEvent.change(confirmPassword, { target: { value: 'testPassword' } });
        fireEvent.submit(form);

        await waitFor(async () => { // Wait for success
            expect(screen.getByTestId("editUserSuccess")).toBeInTheDocument();
        })
    })

    test("handles error in handleSubmit", async () => {
        // Mocks
        Cookies.get.mockReturnValue('testToken');
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });
        const mockError = new Error("Mock error");
        UserService.getUserbyToken.mockRejectedValue(mockError);

        // Setup credentials
        const form = screen.getByTestId("editUserForm");
        const newUsername = screen.getByTestId("newUsername");
        const newPassword = screen.getByTestId("newPassword");
        const confirmPassword = screen.getByTestId("confirmPassword");

        // Submit form
        fireEvent.change(newUsername, { target: { value: 'testUsername' } });
        fireEvent.change(newPassword, { target: { value: 'testPassword' } });
        fireEvent.change(confirmPassword, { target: { value: 'testPassword' } });
        fireEvent.submit(form);

        await waitFor(async () => { // Wait for error
            expect(screen.getByTestId("editUserSuccess")).toBeInTheDocument();
            expect(consoleError).toHaveBeenCalledWith(`handleSubmit failed in editUser.js, ${mockError}`)
        })

        consoleError.mockRestore();
    })
})
