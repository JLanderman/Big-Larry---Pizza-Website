import { render, screen, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Lunch } from '../pages/lunchMenu'; // Import your Drinks page component
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from '../contexts/authContext';
import DataService from '../services/itemData';
import UserService from '../services/UserData';
import Cookies from 'js-cookie';

jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');

const mockResponse = {
    data: {
        item: [
            {
                _id: '1',
                name: 'Lunch 1',
                price: 1500,
            },
            {
                _id: '2',
                name: 'Lunch 2',
                price: 1800,
            },
        ],
    },
  // Add more items as needed for comprehensive testing
};

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

beforeEach(() =>{
    DataService.getAllLunch.mockResolvedValue(mockResponse);
    UserService.getUserbyToken.mockResolvedValue({ username: 'testUser' });
    DataService.deleteItem.mockResolvedValue({ status: 200 });
    Cookies.get.mockReturnValue(undefined); // No token
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
})

describe('Lunch Page', () => {

    const loggedIn = {
        loggedIn: true,
        auth: true,
    };


test('renders page correctly', async () => {
    await act(async () => {
        render(<BrowserRouter><Lunch /></BrowserRouter>);
    });

    expect(screen.getByTestId('lunch')).toBeInTheDocument();
    expect(screen.getByTestId('LunchHeader')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-1')).toBe(null);
    expect(screen.queryByTestId('remove-1')).toBe(null);

});

test('renders admin components correctly', async () => {
    UserService.getUserbyToken.mockResolvedValue({ username: 'testUser', isAdmin: true });
    await act(async () => {
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch />
        </AuthProvider></BrowserRouter>);
    });

    expect(screen.getByTestId('lunch')).toBeInTheDocument();
    expect(screen.queryByTestId('LunchHeader')).toBe(null);
    expect(screen.getByTestId('addItemButton')).toBeInTheDocument();
    expect(screen.getByTestId('edit-1')).toBeInTheDocument();
    expect(screen.getByTestId('remove-1')).toBeInTheDocument();

});

test("can navigate to the drink edit page", async () => {
    await act(async () => { // Wait for dynamic renders
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch/></AuthProvider></BrowserRouter>);
    });
    const nav = screen.getByTestId("edit-1");
    fireEvent.click(nav);
    expect(mockNavigate).toHaveBeenCalledWith('/TextForm/1');
});

test("can navigate to the add new drink page", async () => {
    await act(async () => { // Wait for dynamic renders
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch/></AuthProvider></BrowserRouter>);
    });
    const nav = screen.getByTestId("addItemButton");
    fireEvent.click(nav);
    expect(mockNavigate).toHaveBeenCalledWith('/TextForm/');
});

test("should be able to remove items", async () =>{
    // Wait for initial render
    await act(async () =>{
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch /></AuthProvider></BrowserRouter>);
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
    fireEvent.click(screen.getByTestId('remove-1'));
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
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch /></AuthProvider></BrowserRouter>);
    });
    
    // Setup mocks
    Cookies.get.mockReturnValue('testToken');
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    DataService.deleteItem.mockResolvedValue({ status: 401 }); // Not Authorized

    // Spy on window.confirm
    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(true);

    // Test item deletion
    fireEvent.click(screen.getByTestId('remove-1'));
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
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch /></AuthProvider></BrowserRouter>);
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
    fireEvent.click(screen.getByTestId('remove-1'));
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
    DataService.getAllLunch.mockRejectedValue(mockedError);
    
    // Wait for render
    await act(async () =>{
        render(<BrowserRouter><AuthProvider initialState={loggedIn}><Lunch /></AuthProvider></BrowserRouter>);
    });
    
    expect(consoleError).toHaveBeenCalledWith(mockedError);

    // Restore implementations
    consoleError.mockRestore();
})

});
