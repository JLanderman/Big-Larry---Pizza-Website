import { React, useState, useEffect } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import UserService from "../services/UserData";
import EditUser from "../pages/editUser";
import { BrowserRouter } from "react-router-dom";

// Mock services
jest.mock("../services/UserData.js");

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

    render(
        <BrowserRouter>
            <EditUser />
        </BrowserRouter>
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

    // test("renders an item details container", () => {
    //     const itemDetails = screen.getByTestId("itemDetails");
    //     expect(itemDetails).toBeInTheDocument();
    // })

    // test("handles error in retrieveMenuItem()", async () => {
    //     DataService.getItemById.mockRejectedValue(new Error('Mocked error'));

    //     // Empty mock implementation prevents console from getting cluttered by the error message
    //     const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

    //     render(<EditItem />);

    //     await waitFor(() => { // Wait for error to print to console
    //         expect(consoleLog).toHaveBeenCalledWith(expect.objectContaining({ message: 'Mocked error' }));
    //     })

    //     consoleLog.mockRestore(); // Restore original log implementation
    // })

    // /*
    //     Adjust everything below to match mocked data and the way data is displayed in page
    // */
    // test("renders current item name", async () => {
    //     await waitFor(() => screen.getByTestId("currentName"));
    //     expect(screen.getByText("Curent Name: Test item")).toBeInTheDocument();
    // })

    // test("renders current item price", async () => {
    //     await waitFor(() => screen.getByTestId("currentPrice"));
    //     expect(screen.getByText("Current Price: $9.99")).toBeInTheDocument();
    // })

    // test("renders current item description", async () => {
    //     await waitFor(() => screen.getByTestId("currentInfo"));
    //     expect(screen.getByText("This is a test item")).toBeInTheDocument();
    // })
})
