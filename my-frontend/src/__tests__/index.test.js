import { render, screen } from '@testing-library/react';
import { Home } from '../pages';
import { phoneNum } from '../data/global';


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

