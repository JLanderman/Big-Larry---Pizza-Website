import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})

test('App renders', () => {
  render(<App />);
  const app = screen.getByTestId("app")
  expect(app).toBeInTheDocument();
});

test("Content wrap renders", () =>{
  render(<App />);
  const contentWrap = screen.getByTestId("content-wrap");
  expect(contentWrap).toBeInTheDocument();
})