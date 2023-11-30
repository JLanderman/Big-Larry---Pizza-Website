import MockAdapter from 'axios-mock-adapter';
import PaletteService from '../services/paletteData';
import http from '../http-common';

// Create a new instance of the mock adapter
const mock = new MockAdapter(http);

describe('PaletteService', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  test('putPaletteFront returns data on success', async () => {
    // Mock setup
    const name = 'testName';
    const colorArr = [];
    const username = "testUsername";
    const token = "testToken";
    const testData = { success: true };
    mock.onPost('/palettes/add').reply(200, testData);

    // Execute test
    const data = await PaletteService.putPaletteFront(name, colorArr, username, token);
    expect(data).toStrictEqual(testData);
  });

  test('putPaletteFront returns error message on failure', async () => {
    // Mock setup
    const name = 'testName';
    const colorArr = [];
    const username = "testUsername";
    const token = "testToken";
    const testData = { };
    mock.onPost('/palettes/add').reply(200, testData);

    // Execute test
    const data = await PaletteService.putPaletteFront(name, colorArr, username, token);
    expect(data).toStrictEqual({ success: false, message: "Palette upload failed" });
  });

  test('putPaletteFront catches errors', async () => {
    // Mock setup
    const name = 'testName';
    const colorArr = [];
    const username = "testUsername";
    const token = "testToken";
    const mockError = new Error("Request failed with status code 500");
    mock.onPost('/palettes/add').reply(500, { });

    // Spy setup
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Execute test
    await PaletteService.putPaletteFront(name, colorArr, username, token);
    expect(consoleError).toHaveBeenCalledWith(mockError);
    consoleError.mockRestore();
  });

  test('getLatestPalette works', async () => {
    // Mock setup
    mock.onGet('/palettes/current').reply(200, { });

    // Execute test
    const res = await PaletteService.getLatestPalette();
    expect(res.status).toBe(200);
  });

  test('getLastTenPalettes works', async () => {
    // Mock setup
    mock.onGet('/palettes').reply(200, { });

    // Execute test
    const res = await PaletteService.getLastTenPalettes();
    expect(res.status).toBe(200);
  });
});