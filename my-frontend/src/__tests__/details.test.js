import { React, useState, useEffect } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { Details } from '../pages/details';
import DataService from "../services/itemData";

// Mock services
jest.mock("../services/itemData");

beforeEach(async () => {
    // Mock response from DataService
    DataService.getItemById.mockResolvedValue({
        data: [{
            _id: "5555555555555555555555",
            name: "Test item",
            price: "999", // No decimals
            price_chicken: "1099",
            price_veggie: "1199",
            info: "This is a test item"
        }]
    });

    render(<Details />);

    // Wait for dynamic renders
    await waitFor(() => screen.getByTestId("itemDetails"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("Details", () => {
    test("renders a container", () => {
        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    })

    test("renders item details container", () => {
        const itemDetails = screen.getByTestId("itemDetails");
        expect(itemDetails).toBeInTheDocument();
    })

    test("handles error in retrieveMenuItem()", async () => {
        DataService.getItemById.mockRejectedValue(new Error('Mocked error'));

        // Empty mock implementation prevents console from getting cluttered by the error message
        const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        render(<Details />);

        await waitFor(() => { // Wait for error to print to console
            expect(consoleLog).toHaveBeenCalledWith(expect.objectContaining({ message: 'Mocked error' }));
        })

        consoleLog.mockRestore(); // Restore original log implementation
    })

    /*
        Adjust everything below to match mocked data and way data is displayed in page
    */
    test("renders item name", () => {
        expect(screen.getByText("Test item")).toBeInTheDocument();
    })

    test("renders item price", () => {
        expect(screen.getByText("Price: $9.99")).toBeInTheDocument();
    })

    test("renders item chicken price", () => {
        expect(screen.getByText("Chicken: $10.99")).toBeInTheDocument();
    })

    test("renders item veggie price", () => {
        expect(screen.getByText("Veggie: $11.99")).toBeInTheDocument();
    })

    test("renders item description", () => {
        expect(screen.getByText("This is a test item")).toBeInTheDocument();
    })
})
