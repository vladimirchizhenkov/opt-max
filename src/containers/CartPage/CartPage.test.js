import { CartPage } from './CartPage';
import { fireEvent, render } from '@testing-library/react';
import { store } from '../../redux/store/store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../redux/reducers';

function renderRedux(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('CartPage test', () => {
  const fakeCartItems = [
    { id: 1, name: 'item1', price: 100, quantity: 1 },
    { id: 2, name: 'item2', price: 23, quantity: 2 },
  ];

  it('should display a loading text', async () => {
    const { queryByTestId } = renderRedux(<CartPage />);
    expect(queryByTestId('cart')).not.toBeInTheDocument();
    expect(queryByTestId('loading')).toBeInTheDocument();
  });

  it('should display Cart is empty', async () => {
    const initialState = {
      isLoading: false,
      items: [],
      openAddForm: false,
    };
    const { queryByTestId, queryByText } = renderRedux(<CartPage />, {
      initialState: { cart: initialState },
    });
    expect(queryByTestId('loading')).not.toBeInTheDocument();
    expect(queryByText('Cart is empty')).toBeInTheDocument();
  });

  it('should fetch data from server', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeCartItems),
      })
    );

    const { findByTestId, getAllByTestId, queryByTestId } = render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    await findByTestId('cart');

    expect(fetch).toHaveBeenCalledTimes(1);

    const cartItems = getAllByTestId('cart-item');

    expect(cartItems).toHaveLength(fakeCartItems.length);
    expect(queryByTestId('loading')).not.toBeInTheDocument();

    expect(cartItems[0]).toHaveTextContent(fakeCartItems[0].name);
    expect(cartItems[1]).toHaveTextContent(fakeCartItems[1].name);

    global.fetch.mockRestore();
  });

  it('should open modal with form by click on `add cart item` btn', async () => {
    const initialState = {
      isLoading: false,
      items: [],
    };

    const { queryByTestId, queryByText } = renderRedux(<CartPage />, {
      initialState: { cart: initialState },
    });

    //Click Add Item Button
    //Open Modal

    const openBtn = queryByText('Add Cart Item');
    fireEvent.click(openBtn);

    const modal = queryByTestId('modal');
    const modalInside = queryByTestId('modal-inside');

    expect(modal).toBeInTheDocument();

    //Click inside modal
    fireEvent.click(modalInside);
    expect(modal).toBeInTheDocument();

    //Close Modal by clicking on close btn
    const closeBtn = queryByText('✕');
    fireEvent.click(closeBtn);
    expect(modal).not.toBeInTheDocument();

    //console.log(document.documentElement.outerHTML);
  });

  it('test delete btn', () => {
    const initialState = {
      isLoading: false,
      items: fakeCartItems,
    };

    const { queryAllByTestId } = renderRedux(<CartPage />, {
      initialState: { cart: initialState },
    });

    expect(queryAllByTestId('cart-item')).toHaveLength(2);
    fireEvent.click(queryAllByTestId('delete-btn')[0]);
    expect(queryAllByTestId('cart-item')).toHaveLength(1);
  });

  it('test quantity switcher', () => {
    const initialState = {
      isLoading: false,
      items: [{ id: 1, name: 'item1', quantity: 2, price: 3 }],
    };

    const { queryByTestId, queryByText } = renderRedux(<CartPage />, {
      initialState: { cart: initialState },
    });

    expect(queryByTestId('cart')).toBeInTheDocument();

    const minusBtn = queryByText('-');
    const plusBtn = queryByText('+');
    const currentValue = queryByTestId('quantity-current');

    expect(currentValue).toHaveTextContent('2');

    fireEvent.click(minusBtn);
    expect(minusBtn).toBeDisabled();
    expect(currentValue).toHaveTextContent('1');

    fireEvent.click(minusBtn);
    expect(currentValue).toHaveTextContent('1');

    fireEvent.click(plusBtn);
    expect(minusBtn).not.toBeDisabled();
    expect(currentValue).toHaveTextContent('2');

    fireEvent.click(plusBtn);
    expect(currentValue).toHaveTextContent('3');
  });

  it('should add new item to the top of cart item list', () => {
    const initialState = {
      isLoading: false,
      items: fakeCartItems,
      openAddForm: true,
    };

    const { queryAllByTestId, getByTestId, getByText } = renderRedux(
      <CartPage />,
      { initialState: { cart: initialState } }
    );

    getByTestId('modal');

    expect(queryAllByTestId('cart-item')).toHaveLength(2);

    fireEvent.change(getByTestId('input-name'), { target: { value: 'item3' } });
    fireEvent.change(getByTestId('input-price'), { target: { value: 10 } });
    fireEvent.change(getByTestId('input-quantity'), { target: { value: 3 } });
    fireEvent.click(getByText('Создать'));

    expect(queryAllByTestId('cart-item')).toHaveLength(3);
    expect(queryAllByTestId('cart-item')[0]).toHaveTextContent('item3');
  });
});
