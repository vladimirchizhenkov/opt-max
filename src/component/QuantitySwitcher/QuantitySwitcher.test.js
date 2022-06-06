import { fireEvent, render } from '@testing-library/react';
import { QuantitySwitcher } from './QuantitySwitcher';

describe('quantity switcher', () => {
  let props;
  beforeEach(() => {
    props = {
      quantity: 2,
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
    };
  });

  it('check mount', () => {
    const { getByTestId } = render(<QuantitySwitcher {...props} />);
    expect(getByTestId('quantity-current')).toHaveTextContent('2');
  });

  it('check click + and - btns', () => {
    const { getByText } = render(<QuantitySwitcher {...props} />);
    expect(getByText('-')).not.toBeDisabled();
    fireEvent.click(getByText('-'));
    expect(props.decrementQuantity).toBeCalled();

    fireEvent.click(getByText('+'));
    expect(props.incrementQuantity).toBeCalled();
  });

  it('minus btn should be disabled if current quantity equal 1', () => {
    const { getByText } = render(<QuantitySwitcher {...props} quantity={1} />);
    expect(getByText('-')).toBeDisabled();
    fireEvent.click(getByText('-'));
    expect(props.decrementQuantity).not.toBeCalled();
  });
});
