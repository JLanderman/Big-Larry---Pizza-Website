import { React } from "react";
import { render, screen, cleanup, act, waitFor, fireEvent } from '@testing-library/react';
import PaletteService from "../services/paletteData";
import UserService from "../services/UserData";
import Admin from "../pages/admin";
import { BrowserRouter } from "react-router-dom";
import { HexColorPicker, HexColorInput } from "react-colorful";

/** 
 * Palettes for testing.
 * If styles don't match when test runs, change these to match the values in admin.js
 */
 const testPalette = [ '#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888' ]
 const crimsonPalette = [ '#974545', '#fffdcb', '#c12d2d', '#760202', '#000000', '#ffd0d0', '#faffe2', '#e36316' ]
 const figmaPalette = [ '#94dfdf', '#ffffff', '#d4d4d4', '#696969', '#222222', '#808080', '#c01111', '#0000ff' ]
 const pinkPalette = [ '#ffa9f1', '#ffdfff', '#e473c2', '#be0973', '#630840', '#fff8e6', '#87edff', '#ffffff' ]
 const oceanPalette = [ '#a5dee5', '#ddfff9', '#3e9ed0', '#1263a9', '#085463', '#c3f1d7', '#fff696', '#ffae5e' ]
 const burgerPalette = [ '#dbcf86', '#fcffdd', '#b98347', '#754732', '#633008', '#fcf864', '#eaffd8', '#ffae5e' ]
 const halloweenPalette = [ '#ebb67b', '#fffbd3', '#6353d8', '#5121a3', '#130e2c', '#ceb4f7', '#feff9b', '#d35eff' ]

// Mock services
jest.mock("../services/paletteData");
jest.mock("../services/UserData");

// Auth context mock
const mockAuthContext = require('../contexts/authContext')
mockAuthContext.useAuth = jest.fn(() => {
    return { auth: true }
})

// Navigation mocks
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

beforeEach(async () => {
    PaletteService.getLatestPalette.mockResolvedValue({
        data: {
            palette: [{ //NOTE: must be palette and not palettes
                _id: "5555555555555555555555",
                name: "Test palette",
                colorArr: testPalette
            }]
        }
    });

    PaletteService.getLastTenPalettes.mockResolvedValue({
        data: {
            palettes: [{
                _id: "5555555555555555555555",
                name: "Test palette",
                colorArr: testPalette
            }]
        }
    });

    // Empty responses because admin.js doesn't do anything with them
    UserService.getUserbyToken.mockResolvedValue({ });
    PaletteService.putPaletteFront.mockResolvedValue({ });

    render(<BrowserRouter><Admin /></BrowserRouter>);
    await waitFor(() => screen.getByTestId("adminContainer"));
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
    jest.clearAllMocks();
});

describe("Admin", () => {
    test("redirects unauthorized users", async () =>{
        // Mock unauthorized context
        mockAuthContext.useAuth = jest.fn(() => {
            return { auth: false }
        })
        
        // Test result
        await act(async () => { // Wait for everything to run
            render(<BrowserRouter><Admin /></BrowserRouter>);
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    })

    test("renders container", () => {
        const adminContainer = screen.getByTestId("adminContainer");
        expect(adminContainer).toBeInTheDocument();
    })

    test("renders palette history", async () => {
        const paletteHistoryContainer = screen.getByTestId("paletteHistoryContainer")
        expect(paletteHistoryContainer).toBeInTheDocument();
    })

    test("renders items in palette history", async () => {
        const paletteHistoryItem = screen.getByTestId("paletteHistoryItem")
        expect(paletteHistoryItem).toBeInTheDocument();
    });

    test("handles error in getCurrentPalette()", async () => {
        // Setup
        const mockedError = new Error("Mocked error");
        PaletteService.getLatestPalette.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Run test
        await act(async () => { // Wait for everything to run
            render(<BrowserRouter><Admin /></BrowserRouter>);
        });
        expect(consoleError).toHaveBeenCalledWith(mockedError);

        // Cleanup
        consoleError.mockRestore();
        PaletteService.getLatestPalette.mockRestore();
    })

    test("handles error in retrievePalettes()", async () => {
        // Setup
        const mockedError = new Error("Mocked error");
        PaletteService.getLastTenPalettes.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Run test
        await act(async () => { // Wait for everything to run
            render(<BrowserRouter><Admin /></BrowserRouter>);
        });
        expect(consoleError).toHaveBeenCalledWith(mockedError);

        // Cleanup
        consoleError.mockRestore();
        PaletteService.getLastTenPalettes.mockRestore();
    })

    test("handles error in pushPalette()", async () => {
        // Setup
        const mockedError = new Error("Mocked error");
        PaletteService.putPaletteFront.mockRejectedValue(mockedError);
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        
        // Run test
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(applyPalette);
        });
        expect(consoleError).toHaveBeenCalledWith(mockedError);

        // Cleanup
        consoleError.mockRestore();
        PaletteService.putPaletteFront.mockRestore();
    })

    // test("can preview palette with color picker", async () => {
    //     // Setup and run test
    //     const backgroundPicker = screen.getByTestId("backgroundPicker");
    //     const menuLightPicker = screen.getByTestId("menuLightPicker");
    //     const menuPicker = screen.getByTestId("menuPicker");
    //     const menuDarkPicker = screen.getByTestId("menuDarkPicker");
    //     const textPicker = screen.getByTestId("textPicker");
    //     const textLightPicker = screen.getByTestId("textLightPicker");
    //     const textHLPicker = screen.getByTestId("textHLPicker");
    //     const textLinkPicker = screen.getByTestId("textLinkPicker");
    //     const applyPalette = screen.getByTestId("applyPalette");
    //     const namePalette = screen.getByTestId("namePalette");

    //     await waitFor(async () => { // Test with custom palette
    //         fireEvent.change(backgroundPicker, testPalette[0]);
    //         fireEvent.change(menuLightPicker, testPalette[1]);
    //         fireEvent.change(menuPicker, testPalette[2]);
    //         fireEvent.change(menuDarkPicker, testPalette[3]);
    //         fireEvent.change(textPicker, testPalette[4]);
    //         fireEvent.change(textLightPicker, testPalette[5]);
    //         fireEvent.change(textHLPicker, testPalette[6]);
    //         fireEvent.change(textLinkPicker, testPalette[7]);
    //         fireEvent.input(namePalette, 'custom');
    //         fireEvent.click(applyPalette);
    //     });

    //     // Assert
    //     const style = window.getComputedStyle(document.querySelector(":root"));
    //     expect(style.getPropertyValue("--clr-bg")).toBe(testPalette[0])
    //     expect(style.getPropertyValue("--clr-menu-light")).toBe(testPalette[1]);
    //     expect(style.getPropertyValue("--clr-menu")).toBe(testPalette[2]);
    //     expect(style.getPropertyValue("--clr-menu-dark")).toBe(testPalette[3]);
    //     expect(style.getPropertyValue("--clr-txt")).toBe(testPalette[4])
    //     expect(style.getPropertyValue("--clr-txt-light")).toBe(testPalette[5]);
    //     expect(style.getPropertyValue("--clr-txt-highlight")).toBe(testPalette[6]);
    //     expect(style.getPropertyValue("--clr-link")).toBe(testPalette[7]);
    // })

    // test("can preview palette with color input (text)", async () => {
    //     // Setup and run test
    //     const backgroundInput = screen.getByTestId("backgroundInput");
    //     const menuLightInput = screen.getByTestId("menuLightInput");
    //     const menuInput = screen.getByTestId("menuInput");
    //     const menuDarkInput = screen.getByTestId("menuDarkInput");
    //     const textInput = screen.getByTestId("textInput");
    //     const textLightInput = screen.getByTestId("textLightInput");
    //     const textHLInput = screen.getByTestId("textHLInput");
    //     const textLinkInput = screen.getByTestId("textLinkInput");
    //     const applyPalette = screen.getByTestId("applyPalette");
    //     const namePalette = screen.getByTestId("namePalette");

    //     await waitFor(async () => { // Test with custom palette
    //         fireEvent.change(backgroundInput, testPalette[0]);
    //         fireEvent.change(menuLightInput, testPalette[1]);
    //         fireEvent.change(menuInput, testPalette[2]);
    //         fireEvent.change(menuDarkInput, testPalette[3]);
    //         fireEvent.change(textInput, testPalette[4]);
    //         fireEvent.change(textLightInput, testPalette[5]);
    //         fireEvent.change(textHLInput, testPalette[6]);
    //         fireEvent.change(textLinkInput, testPalette[7]);
    //         fireEvent.input(namePalette, 'custom');
    //         fireEvent.click(applyPalette);
    //     });

    //     // Assert
    //     const style = window.getComputedStyle(document.querySelector(":root"));
    //     expect(style.getPropertyValue("--clr-bg")).toBe(testPalette[0])
    //     expect(style.getPropertyValue("--clr-menu-light")).toBe(testPalette[1]);
    //     expect(style.getPropertyValue("--clr-menu")).toBe(testPalette[2]);
    //     expect(style.getPropertyValue("--clr-menu-dark")).toBe(testPalette[3]);
    //     expect(style.getPropertyValue("--clr-txt")).toBe(testPalette[4])
    //     expect(style.getPropertyValue("--clr-txt-light")).toBe(testPalette[5]);
    //     expect(style.getPropertyValue("--clr-txt-highlight")).toBe(testPalette[6]);
    //     expect(style.getPropertyValue("--clr-link")).toBe(testPalette[7]);
    // })

    test("can set crimson preset", async () => {
        // Setup and run test
        const crimsonPreset = screen.getByTestId("crimsonPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(crimsonPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(crimsonPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(crimsonPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(crimsonPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(crimsonPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(crimsonPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(crimsonPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(crimsonPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(crimsonPalette[7]);
    })

    test("can set figma preset", async () => {
        // Setup and run test
        const figmaPreset = screen.getByTestId("figmaPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(figmaPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(figmaPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(figmaPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(figmaPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(figmaPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(figmaPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(figmaPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(figmaPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(figmaPalette[7]);
    })

    test("can set pink preset", async () => {
        // Setup and run test
        const pinkPreset = screen.getByTestId("pinkPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(pinkPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(pinkPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(pinkPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(pinkPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(pinkPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(pinkPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(pinkPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(pinkPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(pinkPalette[7]);
    })

    test("can set ocean preset", async () => {
        // Setup and run test
        const oceanPreset = screen.getByTestId("oceanPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(oceanPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(oceanPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(oceanPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(oceanPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(oceanPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(oceanPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(oceanPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(oceanPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(oceanPalette[7]);
    })

    test("can set burger preset", async () => {
        // Setup and run test
        const burgerPreset = screen.getByTestId("burgerPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(burgerPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(burgerPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(burgerPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(burgerPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(burgerPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(burgerPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(burgerPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(burgerPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(burgerPalette[7]);
    })

    test("can set halloween preset", async () => {
        // Setup and run test
        const halloweenPreset = screen.getByTestId("halloweenPreset");
        const applyPalette = screen.getByTestId("applyPalette");
        await waitFor(async () => {
            fireEvent.click(halloweenPreset);
            fireEvent.click(applyPalette);
        });

        // Assert
        const style = window.getComputedStyle(document.querySelector(":root"));
        expect(style.getPropertyValue("--clr-bg")).toBe(halloweenPalette[0])
        expect(style.getPropertyValue("--clr-menu-light")).toBe(halloweenPalette[1]);
        expect(style.getPropertyValue("--clr-menu")).toBe(halloweenPalette[2]);
        expect(style.getPropertyValue("--clr-menu-dark")).toBe(halloweenPalette[3]);
        expect(style.getPropertyValue("--clr-txt")).toBe(halloweenPalette[4])
        expect(style.getPropertyValue("--clr-txt-light")).toBe(halloweenPalette[5]);
        expect(style.getPropertyValue("--clr-txt-highlight")).toBe(halloweenPalette[6]);
        expect(style.getPropertyValue("--clr-link")).toBe(halloweenPalette[7]);
    })
})
