import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { ComboSp } from '../pages/comboSpecial';

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe("Combo Specialties", () => {
    render(<BrowserRouter><ComboSp /></BrowserRouter>);
    test("Combo Specialties renders properly", () => {
        const combos = screen.getByTestId("comboSpecials");
        expect(combos).toBeInTheDocument();
    })
})
