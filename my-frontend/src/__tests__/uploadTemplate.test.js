import { React } from "react";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemFormLarge from "../pages/uploadTemplate";
import UserService from "../services/UserData";
import DataService from "../services/itemData";
import { act } from "react-test-renderer";
import Cookies from 'js-cookie';
import AuthProvider from "../contexts/authContext";
import { BrowserRouter } from "react-router-dom";

// Mock services
jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');

// Test files
const testUpload = { files: [new File(['test_file'], 'test_file.png', { type: 'image/png'})]}
URL.createObjectURL = jest.fn(() => "testURL");

const loggedIn = {
    loggedIn: true,
    auth: true,
};

// Navigation mocks
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));


beforeEach(() => {
    UserService.getUserbyToken.mockResolvedValue('testUser');
    DataService.createItem.mockResolvedValue({});
    Cookies.get.mockReturnValue('testToken');
})

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("ItemFormLarge", () => {
    test("renders container", async () => {
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const container = screen.getByTestId("uploadContainer");
        expect(container).toBeInTheDocument();
    })

    test("can add a new item", async () => {
        // Mocks
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        await waitFor(() => { // Need to wait for log
            expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
            const uploaded = screen.getByTestId("uploaded");
            expect(uploaded).toBeInTheDocument();
        })
    });

    test("handles error from DataService when uploading an item", async () => {
        // Mocks
        const mockedError = new Error("Mocked error");
        DataService.createItem.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        await waitFor(() => { // Need to wait for log
            expect(consoleError).toHaveBeenCalledWith('Error uploading item:', mockedError);
        })
    })

    test("alerts the user if they are not logged in", async () => {
        // Setup
        Cookies.get.mockReturnValue(undefined); // No token
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Perform test
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        await act(async () => { // Set form fields
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('You need to be logged in to submit the form.');
    })

    test("alerts the user if they do not enter an item name", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a category", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a price", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a description", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not upload a file", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: '4.99' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a valid item price", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        render(<AuthProvider initialState={loggedIn}><BrowserRouter><ItemFormLarge /></BrowserRouter></AuthProvider>);
        const form = screen.getByTestId("form");
        const name = screen.getByTestId("name");
        const category = screen.getByTestId("category");
        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(name, { target: { value: 'testName' } });
            fireEvent.change(category, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(price, { target: { value: 'invalidPrice' } });
            fireEvent.change(description, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please enter a valid numeric value for the price.');
    });
});
