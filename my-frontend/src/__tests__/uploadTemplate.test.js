import { React } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import ItemFormLarge from "../pages/uploadTemplate";

beforeEach(async () => {
    render(<ItemFormLarge />);
    await waitFor(() => screen.getByTestId("uploadContainer"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("ItemFormLarge", () => {
    test("Upload form renders", () => {
        const uploadContainer = screen.getByTestId("uploadContainer");
        expect(uploadContainer).toBeInTheDocument();
    })
})
