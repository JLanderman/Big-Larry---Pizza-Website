import { React } from "react";
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextForm from "../pages/uploadTextTemplate";
import UserService from "../services/UserData";
import DataService from "../services/itemData";
import { act } from "react-test-renderer";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';

// Mock responses from services
jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');
const mockResponse = {
    data: [
        {
            _id: '1',
            name: 'textItem',
            price: 1500,
        },
    ],
};
const mockResponseMultiplePrices = {
    data: [
        {
            _id: '1',
            name: 'textItem',
            price_small: 899,
            price_large: 999,
        },
    ],
};

beforeEach(() => {
    Cookies.get.mockReturnValue('testToken');
})

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("TextForm", () => {
    test("renders container", async () => {
        render(<TextForm />);
        const textUpload = screen.getByTestId("textUpload");
        expect(textUpload).toBeInTheDocument();
    })

    test("renders different information if editing", async () => {
        // Mock service
        DataService.getItemById.mockResolvedValue(mockResponse);

        // Render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/TextForm/1']}>
                    <Routes>
                        <Route path="/TextForm/:id" element={<TextForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Check results
        const editHeader = screen.getByTestId("editHeader");
        const editName = screen.getByTestId("editName");
        expect(editHeader).toBeInTheDocument();
        expect(editName).toBeInTheDocument();
    });

    test("handles error in retrieveMenuItem", async () => {
        // Mock services
        const mockedError = new Error("Mocked error");
        DataService.getItemById.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

        // Perform test
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/TextForm/1']}>
                    <Routes>
                        <Route path="/TextForm/:id" element={<TextForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Check results
        expect(consoleError).toHaveBeenCalledWith(mockedError);
    })

    test("can add a new item", async () => {
        // Mock services
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockResolvedValue({});

        // Setup
        render(<TextForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formPrice = screen.getByTestId("formPrice");
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Perform test
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(formPrice, { target: { value: '999' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
    });

    test("can add a new item with multiple prices", async () => {
        // Setup
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log");

        // Perform test
        render(<TextForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formMultiplePrices = screen.getByTestId("formMultiplePrices");
        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.click(formMultiplePrices);
        })

        const formSmallPrice = screen.getByTestId("formSmallPrice");
        const formLargePrice = screen.getByTestId("formLargePrice");
        await act(async () => { // Set prices
            fireEvent.change(formSmallPrice, { target: { value: '999' } });
            fireEvent.change(formLargePrice, { target: { value: '1499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
    });

    test("can update an existing item", async () => {
        // Mock services
        DataService.getItemById.mockResolvedValue(mockResponse);
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.updateItem.mockResolvedValue({});

        // Initial render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/TextForm/1']}>
                    <Routes>
                        <Route path="/TextForm/:id" element={<TextForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Setup
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formPrice = screen.getByTestId("formPrice");
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(formPrice, { target: { value: '999' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item updated successfully');
    })

    test("can update an existing item with multiple prices", async () => {
        // Setup
        DataService.getItemById.mockResolvedValue(mockResponseMultiplePrices);
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.updateItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log");

        // Perform test
        render(<TextForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formMultiplePrices = screen.getByTestId("formMultiplePrices");
        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.click(formMultiplePrices);
        })
        
        const formSmallPrice = screen.getByTestId("formSmallPrice");
        const formLargePrice = screen.getByTestId("formLargePrice");
        await act(async () => { // Set prices
            fireEvent.change(formSmallPrice, { target: { value: '999' } });
            fireEvent.change(formLargePrice, { target: { value: '1499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
    });

    test("handles error from DataService when uploading an item", async () => {
        // Mock services
        const mockedError = new Error("Mocked error");
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockRejectedValue(mockedError);

        // Setup
        render(<TextForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formPrice = screen.getByTestId("formPrice");
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(formPrice, { target: { value: '999' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleError).toHaveBeenCalledWith('Error uploading/updating item:', mockedError);
    })

    test("alerts the user if they are not logged in", async () => {
        // Setup
        Cookies.get.mockReturnValue(undefined); // No token
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        await act(async () => {
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('You need to be logged in to submit the form.');
    })

    test("alerts the user if they do not enter an item name", async () => {
        // Setup
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        await act(async () => {
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in the name before submitting.');
    })

    test("alerts the user if they do not enter an item price", async () => {
        // Setup
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in the price before submitting.');
    })

    test("alerts the user if they do not enter an item price when the item has multiple prices", async () => {
        // Setup
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formMultiplePrices = screen.getByTestId("formMultiplePrices");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.click(formMultiplePrices);
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in both price fields before submitting.');
    })

    test("alerts the user if the price is not a number", async () => {
        // Setup
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formPrice = screen.getByTestId("formPrice");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(formPrice, { target: { value: 'avc' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please enter a valid price.');
    })

    test("alerts the user if one of the prices is not a number when there are multiple prices", async () => {
        // Setup
        render(<TextForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formMultiplePrices = screen.getByTestId("formMultiplePrices");
        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.click(formMultiplePrices);
        })

        const formSmallPrice = screen.getByTestId("formSmallPrice");
        const formLargePrice = screen.getByTestId("formLargePrice");
        await act(async () => {
            fireEvent.change(formSmallPrice, { target: { value: '999' } });
            fireEvent.change(formLargePrice, { target: { value: 'testError' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please enter valid prices for both small and large sizes.');
    })

    test("alerts the user if they attempt to change the price structure of an existing item", async () => {
        // Mock services
        DataService.getItemById.mockResolvedValue(mockResponse);
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.updateItem.mockResolvedValue({});
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Initial render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/TextForm/1']}>
                    <Routes>
                        <Route path="/TextForm/:id" element={<TextForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const formMultiplePrices = screen.getByTestId("formMultiplePrices");
        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.click(formMultiplePrices);
        })

        const formSmallPrice = screen.getByTestId("formSmallPrice");
        const formLargePrice = screen.getByTestId("formLargePrice");
        await act(async () => {
            fireEvent.change(formSmallPrice, { target: { value: '1299' } });
            fireEvent.change(formLargePrice, { target: { value: '1499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('You cannot change the price structure for an existing item. '
            + 'If you want a single price item to have two prices, or a two price item to have one price, then '
            + 'please create a new item with the right price structure and delete this one.');
    });
})
