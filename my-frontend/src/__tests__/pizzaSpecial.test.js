import { render, screen, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PizzaSp } from '../pages/pizzaSpecial';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from '../contexts/authContext';
import DataService from '../services/itemData';
import UserService from '../services/UserData';
import Cookies from 'js-cookie';

// Mock responses from services
jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');
const mockResponse = { 
    data: {
        item: [
            {
                _id: "0",
                name: "Lets Customize",
                photo: 'customize_pizza.jpg'
            },
            {
                _id: '1',
                name: 'Special Pizza 1',
                price: 1500,
                photo: 'special_pizza_1.jpg',
            },
            {
                _id: '2',
                name: 'Special Pizza 2',
                price: 1800,
                photo: 'special_pizza_2.jpg',
            },
        ],
    },
};

// Navigation mocks
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

beforeEach(() =>{
    DataService.getPizzaSpecial.mockResolvedValue(mockResponse);
    UserService.getUserbyToken.mockResolvedValue({ username: 'testUser' });
    DataService.deleteItem.mockResolvedValue({ status: 200 });
    Cookies.get.mockReturnValue(undefined); // No token
});


afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
    mockNavigate.mockRestore();
})

describe("Pizza Specialties", () => {
    // Logged in status for auth context initialization
    const loggedIn = {
        loggedIn: true,
        auth: true,
    };
    
    test("renders correctly", async () => {
        // Wait for everything to render
        await act(async () => {
            render(<BrowserRouter><PizzaSp/></BrowserRouter>);
        });

        // Test results
        const pizzaSp = screen.getByTestId("pizzaSpecials");
        expect(pizzaSp).toBeInTheDocument();
        expect(screen.getByTestId("testItem0")).toBeInTheDocument();
        expect(screen.getByTestId("testItem1")).toBeInTheDocument();
        expect(screen.getByTestId("testItem2")).toBeInTheDocument();
        expect(screen.queryByTestId("authTestItem0")).toBe(null);
        expect(screen.queryByTestId("authTestItem1")).toBe(null);
        expect(screen.queryByTestId("authTestItem2")).toBe(null);
    })

    test("renders admin view correctly", async() => {
        // Wait for everything to render
        await act(async () => {
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });

        // Test results
        expect(screen.getByTestId("testItem0")).toBeInTheDocument(); 
        expect(screen.getByTestId("testItem1")).toBeInTheDocument(); 
        expect(screen.getByTestId("testItem2")).toBeInTheDocument(); 
        expect(screen.queryByTestId("authTestItem0")).toBe(null); // Lets Customize option does not render this
        expect(screen.getByTestId("authTestItem1")).toBeInTheDocument();
        expect(screen.getByTestId("authTestItem2")).toBeInTheDocument();
    })

    test("should be able to remove items", async () =>{
        // Wait for initial render
        await act(async () =>{
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        
        // Setup mocks
        Cookies.get.mockReturnValue('testToken');
        const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        // Spy on window
        const confirmSpy = jest.spyOn(window, "confirm");
        confirmSpy.mockReturnValue(true);
        const reloadSpy = jest.fn();
        Object.defineProperty(window, 'location', {
            value: { reload: reloadSpy },
            writable: true,
        });

        // Test item deletion
        fireEvent.click(screen.getByTestId('removeTestItem1'));
        await waitFor(() => {
            expect(confirmSpy).toHaveBeenCalled();
            expect(consoleLog).toHaveBeenCalledWith('Item deleted successfully');
            expect(reloadSpy).toHaveBeenCalled();
        });

        // Restore implementations
        confirmSpy.mockRestore();
        consoleLog.mockRestore();
    });

    test("should handle bad status code from DataService", async () =>{
        // Wait for initial render
        await act(async () =>{
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        
        // Setup mocks
        Cookies.get.mockReturnValue('testToken');
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        DataService.deleteItem.mockResolvedValue({ status: 401 }); // Not Authorized

        // Spy on window.confirm
        const confirmSpy = jest.spyOn(window, "confirm");
        confirmSpy.mockReturnValue(true);

        // Test item deletion
        fireEvent.click(screen.getByTestId('removeTestItem1'));
        await waitFor(() => {
            expect(confirmSpy).toHaveBeenCalled();
            expect(consoleError).toHaveBeenCalledWith('Failed to delete item');
        });

        // Restore implementations
        confirmSpy.mockRestore();
        consoleError.mockRestore();
    });

    test("should handle error in handleRemoveItem", async () =>{
        // Wait for initial render
        await act(async () =>{
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        
        // Setup mocks
        Cookies.get.mockReturnValue('testToken');
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const mockedError = new Error('Mocked Error');
        DataService.deleteItem.mockRejectedValue(mockedError);

        // Spy on window.confirm
        const confirmSpy = jest.spyOn(window, "confirm");
        confirmSpy.mockReturnValue(true);

        // Test item deletion
        fireEvent.click(screen.getByTestId('removeTestItem1'));
        await waitFor(() => {
            expect(confirmSpy).toHaveBeenCalled();
            expect(consoleError).toHaveBeenCalledWith('Error deleting item:', mockedError);
        });

        // Restore implementations
        confirmSpy.mockRestore();
        consoleError.mockRestore();
    });

    test("should handle error in retrieveItems", async () =>{
        // Setup mocks
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const mockedError = new Error('Mocked Error');
        DataService.getPizzaSpecial.mockRejectedValue(mockedError);

        // Wait for render
        await act(async () =>{
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        
        expect(consoleError).toHaveBeenCalledWith(mockedError);

        // Restore implementations
        consoleError.mockRestore();
    })

    test("can navigate to edit page", async () => {
        await act(async () => { // Wait for dynamic renders
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        const nav = screen.getByTestId("editTestItem1");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/editItem/1');
    })

    test("can navigate to the add new item page", async () => {
        await act(async () => { // Wait for dynamic renders
            render(<BrowserRouter><AuthProvider initialState={loggedIn}><PizzaSp/></AuthProvider></BrowserRouter>);
        });
        const nav = screen.getByTestId("addItemButton");
        fireEvent.click(nav);
        expect(mockNavigate).toHaveBeenCalledWith('/ItemFormLarge/');
    })
    
})