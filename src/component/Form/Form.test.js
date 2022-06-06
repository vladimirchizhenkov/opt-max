import { render, cleanup, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('form test', () => {
  let props;
  beforeEach(() => {
    props = {
      addItem: jest.fn(),
    };
  });

  afterEach(cleanup);

  it('should be mount', () => {
    const { getByTestId } = render(<Form {...props} />);
    expect(getByTestId('form')).toBeInTheDocument();
  });

  it('test initial values', () => {
    const { getByTestId } = render(<Form {...props} />);

    const inputName = getByTestId('input-name');
    const inputPrice = getByTestId('input-price');
    const inputQuantity = getByTestId('input-quantity');

    expect(inputName).toHaveValue('');
    expect(inputPrice.value).toBe(''); //expect(inputPrice).toHaveValue(null);
    expect(inputQuantity).toHaveValue(1);
  });

  it('test change value', () => {
    const { getByTestId } = render(<Form {...props} />);

    const inputName = getByTestId('input-name');
    const inputPrice = getByTestId('input-price');
    const inputQuantity = getByTestId('input-quantity');

    fireEvent.change(inputName, { target: { value: 'New Name' } });
    fireEvent.change(inputPrice, { target: { value: '1.2' } });
    fireEvent.change(inputQuantity, { target: { value: '2' } });

    expect(inputName).toHaveValue('New Name');
    expect(inputPrice).toHaveValue(1.2);
    expect(inputQuantity).toHaveValue(2);
  });

  it('test required errors', () => {
    const { getByTestId, getByText, queryAllByText } = render(
      <Form {...props} />
    );

    const inputName = getByTestId('input-name');
    const inputPrice = getByTestId('input-price');
    const inputQuantity = getByTestId('input-quantity');
    const button = getByText('Создать');

    fireEvent.click(button);

    //Should be 2 field required errors
    expect(queryAllByText('This field is required').length).toBe(2);

    fireEvent.change(inputQuantity, { target: { value: '' } });
    fireEvent.click(button);
    expect(queryAllByText('This field is required').length).toBe(3);

    fireEvent.change(inputName, { target: { value: 'New Name' } });
    fireEvent.change(inputQuantity, { target: { value: '2' } });
    fireEvent.click(button);
    expect(queryAllByText('This field is required').length).toBe(1);

    fireEvent.change(inputPrice, { target: { value: '15' } });

    expect(props.addItem).toBeCalledTimes(0);
    fireEvent.click(button);
    expect(queryAllByText('This field is required').length).toBe(0);
    expect(props.addItem).toBeCalledTimes(1);
  });

  it('test min value validation for price and quantity', () => {
    const { getByTestId, getByText, queryByText } = render(<Form {...props} />);

    const inputName = getByTestId('input-name');
    const inputPrice = getByTestId('input-price');
    const inputQuantity = getByTestId('input-quantity');

    const button = getByText('Создать');

    fireEvent.change(inputName, { target: { value: 'Name new item' } });
    fireEvent.change(inputPrice, { target: { value: 0 } });
    fireEvent.change(inputQuantity, { target: { value: 0 } });

    fireEvent.click(button);

    //Should be error min value
    expect(
      queryByText('This field should be greater then 0')
    ).toBeInTheDocument();
    expect(
      queryByText('This field should be greater or equal then 1')
    ).toBeInTheDocument();

    expect(props.addItem).toBeCalledTimes(0);

    fireEvent.change(inputPrice, { target: { value: 0.01 } });
    fireEvent.change(inputQuantity, { target: { value: 1 } });
    fireEvent.click(button);

    //Shouldn't be error
    expect(
      queryByText('This field should be greater or equal then 1')
    ).not.toBeInTheDocument();
    expect(
      queryByText('This field should be greater then 0')
    ).not.toBeInTheDocument();

    expect(props.addItem).toBeCalledTimes(1);
  });
});
