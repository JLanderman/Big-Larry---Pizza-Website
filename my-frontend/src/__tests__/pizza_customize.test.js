import { render, screen, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pizza_customize } from '../pages/pizza_customize';
import React from "react";
import UserService from "../services/UserData";
import DataService from "../services/itemData";
import Cookies from 'js-cookie';

// Mock services
jest.mock('../services/itemData');
jest.mock('../services/UserData');
jest.mock('js-cookie');

const mockResponse = [
        {
            prices: {
                price_l:  "$4.99",
                price_m:  "$5.99",
                price_p:  "$6.99",
                price_s:  "$7.99",
                price_xl: "$8.99",
            },
            topping: "Cheese",
        },
    ];

beforeEach(() => {
    DataService.getAllToppingsPrices.mockResolvedValue(mockResponse);
    UserService.getUserbyToken.mockResolvedValue('testUser');
    Cookies.get.mockReturnValue('testToken');
})

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
})

describe("Pizza Customize", () => {
    test("renders container", () => {
        render(<Pizza_customize />);
        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
    })

    test("renders topping prices", async () => {
        await act(async () => {
            render(<Pizza_customize />);
        });

        const row = screen.getByTestId("row");
        const clickToppingAnchovies = screen.getByTestId("clickToppingAnchovies");
        fireEvent.click(clickToppingAnchovies);
        expect(row).toBeInTheDocument();
        expect(clickToppingAnchovies).toBeInTheDocument();
    })
})
