import { React, useState, useEffect } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { EditItem } from '../pages/editItem';
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

    render(<EditItem />);

    // Wait for dynamic renders
    await waitFor(() => screen.getByTestId("itemDetails"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("EditItem", () => {
    test("renders a container", () => {
        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    })

    test("renders an item details container", () => {
        const itemDetails = screen.getByTestId("itemDetails");
        expect(itemDetails).toBeInTheDocument();
    })

    test("handles error in retrieveMenuItem()", async () => {
        DataService.getItemById.mockRejectedValue(new Error('Mocked error'));

        // Empty mock implementation prevents console from getting cluttered by the error message
        const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        render(<EditItem />);

        await waitFor(() => { // Wait for error to print to console
            expect(consoleLog).toHaveBeenCalledWith(expect.objectContaining({ message: 'Mocked error' }));
        })

        consoleLog.mockRestore(); // Restore original log implementation
    })

    /*
        Adjust everything below to match mocked data and way data is displayed in page
    */
    test("renders current item name", () => {
        expect(screen.getByText("Curent Name: Test item")).toBeInTheDocument();
    })

    test("renders current item price", () => {
        expect(screen.getByText("Current Price: $9.99")).toBeInTheDocument();
    })

    test("renders current item chicken price", () => {
        expect(screen.getByText("Chicken: $10.99")).toBeInTheDocument();
    })

    test("renders current item veggie price", () => {
        expect(screen.getByText("Veggie: $11.99")).toBeInTheDocument();
    })

    test("renders current item description", () => {
        expect(screen.getByText("This is a test item")).toBeInTheDocument();
    })
})
