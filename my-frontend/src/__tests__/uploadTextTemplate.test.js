import { React } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import TextForm from "../pages/uploadTextTemplate";

// polyfill for fetch
import 'whatwg-fetch'

beforeEach(async () => {
    render(<TextForm />);
    await waitFor(() => screen.getByTestId("textUpload"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("TextForm", () => {
    test("Text upload form renders", () => {
        const textUpload = screen.getByTestId("textUpload");
        expect(textUpload).toBeInTheDocument();
    })
})
