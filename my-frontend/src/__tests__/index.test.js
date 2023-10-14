import { render, screen, cleanup } from '@testing-library/react';
import { Home } from '../pages';
import { phoneNum } from '../data/global';
import { App } from '../App';

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('home header renders', () => {
    render(<Home />);
    const homeHeader = screen.getByTestId('homeHeader')
    expect(homeHeader).toBeInTheDocument();
});

test('displays phone number', () => {
    render(<Home />);
    const phoneNumber = screen.getByTestId('homeSecondLine')
    expect(phoneNumber.textContent).toEqual(phoneNum);
});

test('pizza photo displays', () => {
    render(<Home />);
    const photo = screen.getByTestId('homePizza')
    expect(photo).toBeInTheDocument();
});

