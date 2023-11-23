import { React } from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import PaletteService from "../services/paletteData";
import Admin from "../pages/admin";
import { BrowserRouter } from "react-router-dom";

import { authContext, useAuth } from '../contexts/authContext';
// mock palette service
jest.mock("../services/paletteData");

const testColorArr = ["#ebb67b","#fffbd3","#6353d8","#5121a3","#130e2c","#ceb4f7","#feff9b","#d35eff"];

const mockAuthContext = require('../contexts/authContext')
mockAuthContext.useAuth = jest.fn(() => {
        return {auth: true}
    })

beforeEach(async () => {
    PaletteService.getLatestPalette.mockResolvedValue({
        data: {
            palette: [{ //NOTE: must be palette and not palettes
                _id: "5555555555555555555555",
                name: "Test palette",
                colorArr: testColorArr
            }]
        }
    });
        
    PaletteService.getLastTenPalettes.mockResolvedValue({
        data: {
            palettes: [{
                _id: "5555555555555555555555",
                name: "Test palette",
                colorArr: testColorArr
            }]
        }
    });
    
    render(
        <BrowserRouter>
            <Admin />
        </BrowserRouter>
    );
    
    await waitFor(() => screen.getByTestId("adminContainer"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("Admin", () => {
    test("Admin page renders", () => {
        const adminContainer = screen.getByTestId("adminContainer");
        expect(adminContainer).toBeInTheDocument();
    })
    
    test("Palette history container renders", async () => {
        const paletteHistoryContainer = screen.getByTestId("paletteHistoryContainer")
        expect(paletteHistoryContainer).toBeInTheDocument();
    })
    
    test("Palette history item renders", async () => {
        const paletteHistoryItem = screen.getByTestId("paletteHistoryItem")
        expect(paletteHistoryItem).toBeInTheDocument();
    });
})


