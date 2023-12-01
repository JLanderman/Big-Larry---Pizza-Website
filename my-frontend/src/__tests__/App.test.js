import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})

describe('App', () => {
  test('renders application', () => {
    render(<App />);
    const app = screen.getByTestId("app")
    expect(app).toBeInTheDocument();
  });
})
