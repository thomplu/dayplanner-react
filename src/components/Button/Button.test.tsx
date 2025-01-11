import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('renders the button with the correct label', () => {
        render(<Button label="Click Me" />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('triggers the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} />);

        const button = screen.getByText('Click Me');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
