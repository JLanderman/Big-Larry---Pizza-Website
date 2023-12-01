import { render, screen, cleanup } from '@testing-library/react';
import { Home } from '../pages';
import { phoneNum } from '../data/global';
import React from "react";

beforeEach(() => {
    render(<Home />);
})

afterEach(() => {
    cleanup();
})

describe('Home', () => {
    test('renders header', () => {
        const homeHeader = screen.getByTestId('homeHeader')
        expect(homeHeader).toBeInTheDocument();
    });
    
    test('displays phone number', () => {
        const phoneNumber = screen.getByTestId('homeSecondLine')
        expect(phoneNumber.textContent).toEqual(phoneNum);
    });
    
    test('displays pizza photo', () => {
        const photo = screen.getByTestId('homePizza')
        expect(photo).toBeInTheDocument();
    });
})
