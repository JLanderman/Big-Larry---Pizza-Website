import {render, fireEvent, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer/index";

test('Footer renders', () => {
    render(
    <BrowserRouter>
        <Footer />
    </BrowserRouter>
    );
    
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument();
})