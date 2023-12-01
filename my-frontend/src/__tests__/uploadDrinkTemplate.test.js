import { React } from "react";
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrinkForm from "../pages/uploadDrinkTemplate";
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
            drinktype: 'Milk Shakes',
            price: [
                199
            ],
        },
    ],
};
const mockResponseTwoPrices = {
    data: [
        {
            _id: '1',
            name: 'textItem',
            drinktype: 'testType',
            price: [
                199,
                299
            ],
        },
    ],
};
const mockResponseThreePrices = {
    data: [
        {
            _id: '1',
            name: 'textItem',
            drinktype: 'testType',
            price: [
                199,
                299,
                399
            ],
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

describe("DrinkForm", () => {
    test("renders container", async () => {
        render(<DrinkForm />);
        const drinkUpload = screen.getByTestId("drinkUpload");
        expect(drinkUpload).toBeInTheDocument();
    })

    test("renders different information if editing", async () => {
        // Mock service
        DataService.getItemById.mockResolvedValue(mockResponse);

        // Render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/DrinkForm/1']}>
                    <Routes>
                        <Route path="/DrinkForm/:id" element={<DrinkForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Check results
        const currentName = screen.getByTestId("currentName");
        const currentCategory = screen.getByTestId("currentCategory");
        expect(currentName).toBeInTheDocument();
        expect(currentCategory).toBeInTheDocument();
    });

    test("handles error in retrieveMenuItem", async () => {
        // Mock services
        const mockedError = new Error("Mocked error");
        DataService.getItemById.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

        // Perform test
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/DrinkForm/1']}>
                    <Routes>
                        <Route path="/DrinkForm/:id" element={<DrinkForm />} />
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
        render(<DrinkForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Perform test
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            // Needs to be set to an actual value from dropdown
            fireEvent.change(subCategory, { target: { value: 'Cold Drink' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
    });

    test("can add a new item with two prices", async () => {
        // Setup
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log");

        // Perform test
        render(<DrinkForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const twoPricesCheckbox = screen.getByTestId("twoPricesCheckbox");

        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            // Needs to be set to an actual value from dropdown
            fireEvent.change(subCategory, { target: { value: 'Cold Drink' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.click(twoPricesCheckbox);
        })

        const twoPricesLarge = screen.getByTestId("twoPricesLarge");
        await act(async () => { // Set price
            fireEvent.change(twoPricesLarge, { target: { value: '699' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item uploaded successfully');
    });

    test("can add a new item with three prices", async () => {
        // Setup
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log");

        // Perform test
        render(<DrinkForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const threePricesCheckbox = screen.getByTestId("threePricesCheckbox");

        await act(async () => { // Toggle multiple prices and wait for rerender
            fireEvent.change(formName, { target: { value: 'testName' } });
            // Needs to be set to an actual value from dropdown
            fireEvent.change(subCategory, { target: { value: 'Cold Drink' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.click(threePricesCheckbox);
        })

        const threePricesMedium = screen.getByTestId("threePricesMedium");
        const threePricesLarge = screen.getByTestId("threePricesLarge");
        await act(async () => { // Set price
            fireEvent.change(threePricesMedium, { target: { value: '599' } });
            fireEvent.change(threePricesLarge, { target: { value: '699' } });
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
                <MemoryRouter initialEntries={['/DrinkForm/1']}>
                    <Routes>
                        <Route path="/DrinkForm/:id" element={<DrinkForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Setup
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const price = screen.getByTestId("price");
        const subCategory = screen.getByTestId("subCategory");
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item updated successfully');
    })

    test("can update an existing item with two prices", async () => {
        // Mock services
        DataService.getItemById.mockResolvedValue(mockResponseTwoPrices);
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.updateItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Initial render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/DrinkForm/1']}>
                    <Routes>
                        <Route path="/DrinkForm/:id" element={<DrinkForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Setup
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const twoPricesLarge = screen.getByTestId("twoPricesLarge");

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(twoPricesLarge, { target: { value: '699' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item updated successfully');
    })

    test("can update an existing item with three prices", async () => {
        // Mock services
        DataService.getItemById.mockResolvedValue(mockResponseThreePrices);
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.updateItem.mockResolvedValue({});
        const consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });

        // Initial render
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/DrinkForm/1']}>
                    <Routes>
                        <Route path="/DrinkForm/:id" element={<DrinkForm />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Setup
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const threePricesMedium = screen.getByTestId("threePricesMedium");
        const threePricesLarge = screen.getByTestId("threePricesLarge");

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.change(threePricesMedium, { target: { value: '599' } });
            fireEvent.change(threePricesLarge, { target: { value: '699' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleLog).toHaveBeenCalledWith('Item updated successfully');
    })

    test("handles error from DataService when uploading an item", async () => {
        // Mock services
        const mockedError = new Error("Mocked error");
        UserService.getUserbyToken.mockResolvedValue('testUser');
        DataService.createItem.mockRejectedValue(mockedError);

        // Setup
        render(<DrinkForm />);
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

        // Perform test
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(consoleError).toHaveBeenCalledWith('Error uploading/updating item:', mockedError);
    })

    test("alerts the user if they are not logged in", async () => {
        // Setup
        Cookies.get.mockReturnValue(undefined); // No token
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        await act(async () => { // Set form fields
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('You need to be logged in to submit the form.');
    })

    test("alerts the user if they do not enter an item name", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        await act(async () => { // Set form fields
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    })

    test("alerts the user if they do not enter an item subcategory", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const price = screen.getByTestId("price");
        await act(async () => { // Set form fields
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    })

    test("alerts the user if they do not enter an item price", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all required fields before submitting.');
    })

    test("alerts the user if they do not enter a valid number for the item price", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const price = screen.getByTestId("price");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.change(price, { target: { value: 'invalidPrice' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all the available price fields with valid numbers.');
    })

    test("alerts the user if they do not enter an item price when the item has two prices", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const twoPricesCheckbox = screen.getByTestId("twoPricesCheckbox");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.click(twoPricesCheckbox);
        });

        const price = screen.getByTestId("price");
        await act(async () => {
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all the available price fields with valid numbers.');
    })

    test("alerts the user if they do not enter a valid number for item prices when there are two prices", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const twoPricesCheckbox = screen.getByTestId("twoPricesCheckbox");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.click(twoPricesCheckbox);
        });

        const price = screen.getByTestId("price");
        const twoPricesLarge = screen.getByTestId("twoPricesLarge");
        await act(async () => {
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(twoPricesLarge, { target: { value: 'invalidPrice' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all the available price fields with valid numbers.');
    })

    test("alerts the user if they do not enter an item price when the item has three prices", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const checkbox = screen.getByTestId("threePricesCheckbox");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.click(checkbox);
        });

        const price = screen.getByTestId("price");
        const medium = screen.getByTestId("threePricesMedium");
        await act(async () => {
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(medium, { target: { value: '599' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all the available price fields with valid numbers.');
    })

    test("alerts the user if they do not enter a valid number for item prices when there are three prices", async () => {
        // Setup
        render(<DrinkForm />);
        const alertSpy = jest.spyOn(window, "alert");
        alertSpy.mockReturnValue(true);

        // Perform test
        const form = screen.getByTestId("form");
        const formName = screen.getByTestId("formName");
        const subCategory = screen.getByTestId("subCategory");
        const checkbox = screen.getByTestId("threePricesCheckbox");
        await act(async () => {
            fireEvent.change(formName, { target: { value: 'testName' } });
            fireEvent.change(subCategory, { target: { value: 'Milk Shakes' } });
            fireEvent.click(checkbox);
        });

        const price = screen.getByTestId("price");
        const medium = screen.getByTestId("threePricesMedium");
        const large = screen.getByTestId("threePricesLarge");
        await act(async () => {
            fireEvent.change(price, { target: { value: '499' } });
            fireEvent.change(medium, { target: { value: '599' } });
            fireEvent.change(large, { target: { value: 'invalidNumber' } });
            fireEvent.submit(form);
        });

        // Check results
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all the available price fields with valid numbers.');
    });
});
