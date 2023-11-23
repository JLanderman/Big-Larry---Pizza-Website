import { React } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import DrinkForm from "../pages/uploadDrinkTemplate";

// polyfill for fetch
import 'whatwg-fetch'

beforeEach(async () => {
    render(<DrinkForm />);
    await waitFor(() => screen.getByTestId("drinkUpload"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("DrinkForm", () => {
    test("Drink upload form renders", () => {
        const drinkUpload = screen.getByTestId("drinkUpload");
        expect(drinkUpload).toBeInTheDocument();
    })
})
