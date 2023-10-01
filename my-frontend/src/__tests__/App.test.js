import { render, screen } from '@testing-library/react';
import App from '../App';

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