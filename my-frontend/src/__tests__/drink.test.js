import { React, useState, useEffect } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import { Drink } from '../pages/drink';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('Drink Specialties render', () => {
    render(<Drink />);
    const drinks = screen.getByTestId('drinks')
    expect(drinks).toBeInTheDocument();
});

// test('Beverages header renders', () => {
//     render(<Drink />);
//     const bev = screen.getByTestId('BeveragesHeader')
//     expect(bev).toBeInTheDocument();
// });
