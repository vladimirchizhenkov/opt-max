import { Modal } from './Modal';
import { fireEvent, render } from '@testing-library/react';

describe('test modal close outside and not close inside', () => {
  const close = jest.fn();

  test('modal close outside', () => {
    const { getByTestId, queryByText } = render(<Modal close={close}></Modal>);
    const modal = getByTestId('modal');
    const modalInside = getByTestId('modal-inside');
    const closeBtn = queryByText('✕');

    //should be called
    fireEvent.click(closeBtn);
    expect(close).toBeCalledTimes(1);

    //should be called
    fireEvent.click(modal);
    expect(close).toBeCalledTimes(2);

    //should not be called
    fireEvent.click(modalInside);
    expect(close).toBeCalledTimes(2);
  });
});
