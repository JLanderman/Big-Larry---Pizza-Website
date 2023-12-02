import { React } from "react";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditItem from "../pages/editItem";
import UserService from "../services/UserData";
import DataService from "../services/itemData";
import { act } from "react-test-renderer";
import Cookies from 'js-cookie';

// Mock services
jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');

const mockResponse = {
    data: [{
        _id: "5555555555555555555555",
        itemCategory: "testCategory",
        name: "Test item",
        price: "999", // No decimals
        price_chicken: "1099",
        price_veggie: "1199",
        info: "This is a test item"
    }]
};

// Test files
const testUpload = { files: [new File(['test_file'], 'test_file.png', { type: 'image/png'})]}
URL.createObjectURL = jest.fn(() => "testURL");

beforeEach(() => {
    DataService.getItemById.mockResolvedValue(mockResponse);
    UserService.getUserbyToken.mockResolvedValue('testUser');
    DataService.updateItem.mockResolvedValue({});
    Cookies.get.mockReturnValue('testToken');
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("EditItem", () => {
    test("renders an outer container", async () => {
        await act(async () => {
            render(<EditItem />);
        });
        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    })

    test("renders an item details container", async () => {
        await act(async () => {
            render(<EditItem />);
        });
        const itemDetails = screen.getByTestId("itemDetails");
        expect(itemDetails).toBeInTheDocument();
    })

    test("renders current item information", async () => {
        await act(async () => {
            render(<EditItem />)
        });
        expect(screen.getByTestId("currentName")).toBeInTheDocument();
        expect(screen.getByTestId("currentPrice")).toBeInTheDocument();
        expect(screen.getByTestId("currentInfo")).toBeInTheDocument();
    })

    test("handles error in retrieveMenuItem()", async () => {
        const mockedError = new Error("Mocked error");
        DataService.getItemById.mockRejectedValue(mockedError);

        // Empty mock implementation prevents console from getting cluttered by the error message
        const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        await act(async () => { // Wait for error to print to console
            render(<EditItem />);
        });

        expect(consoleLog).toHaveBeenCalledWith(mockedError);
        consoleLog.mockRestore(); // Restore original log implementation
    })

    test("can modify an item", async () => {
        // Mocks
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Setup
        await act(async () => {
            render(<EditItem />);
        });

        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(newDescription, { target: { value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        await waitFor(() => { // Need to wait for log
            expect(consoleLog).toHaveBeenCalledWith('Item updated successfully');
        });
    })

    test("handles error from DataService when updating an item", async () => {
        // Mocks
        const mockedError = new Error("Mocked error");
        DataService.updateItem.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

        // Setup
        await act(async () => {
            render(<EditItem />);
        });

        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(newDescription, { target: { value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        await waitFor(() => { // Need to wait for log
            expect(consoleError).toHaveBeenCalledWith('Error updating item:', mockedError);
        });
    })

    test("alerts the user if they are not logged in", async () => {
        // Setup
        Cookies.get.mockReturnValue(undefined); // No token
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Perform test
        await act(async () => {
            render(<EditItem />);
        });

        const submit = screen.getByTestId("submit");
        await act(async () => { // Set form fields
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('You need to be logged in to submit the form.');
    })

    test("alerts the user if they do not enter an item name", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(newDescription, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a category", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(newDescription, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a price", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newDescription, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a description", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not upload a file", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: '499' } });
            fireEvent.change(newDescription, { target: {value: 'testDescription' } });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    });

    test("alerts the user if they do not enter a valid item price", async () => {
        // Mocks
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue(true);

        // Setup
        await act(async () => {
            render(<EditItem />);
        });
        const submit = screen.getByTestId("submit");
        const newName = screen.getByTestId("newName");
        const newCat = screen.getByTestId("newCat");
        const newPrice = screen.getByTestId("newPrice");
        const newDescription = screen.getByTestId("newDescription");
        const file = screen.getByTestId("file");

        // Perform test
        await act(async () => {
            fireEvent.change(newName, { target: { value: 'testName' } });
            fireEvent.change(newCat, { target: { value: 'comboSpecial' } }); // Needs to be set to an actual value from dropdown
            fireEvent.change(newPrice, { target: { value: 'invalidPrice' } });
            fireEvent.change(newDescription, { target: {value: 'testDescription' } });
            fireEvent.change(file, { target: testUpload });
            fireEvent.click(submit);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please enter a valid numeric value for the price.');
    });
})
