import { cartReducer } from './cart';
import { Constants } from '../types/cart';
import { cleanup } from '@testing-library/react';

describe('cart reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      isLoading: false,
      openAddForm: false,
      items: [
        { id: 1, name: 'item 1', price: 10, quantity: 2 },
        { id: 2, name: 'item 2', price: 100, quantity: 3 },
      ],
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({
      isLoading: true,
      openAddForm: false,
      items: [],
    });
  });

  it('should handle GET_ITEMS_SUCCESS', () => {
    const newItems = [
      { id: 1, name: 'item 1', price: 12, quantity: 2 },
      { id: 2, name: 'item 2', price: 12, quantity: 2 },
      { id: 3, name: 'item 3', price: 12, quantity: 2 },
      { id: 4, name: 'item 4', price: 12, quantity: 2 },
    ];
    expect(
      cartReducer(
        { isLoading: false, openAddForm: false, items: [] },
        { type: Constants.GET_ITEMS_SUCCESS, payload: newItems }
      )
    ).toEqual({
      isLoading: false,
      openAddForm: false,
      items: newItems,
    });
  });

  it('should handle ADD_ITEM', () => {
    expect(
      cartReducer(
        {
          isLoading: false,
          openAddForm: false,
          items: [{ id: 47, name: 'oldCartItem', quantity: 2, price: 10 }],
        },
        {
          type: Constants.ADD_ITEM,
          payload: { name: 'newCartItem', quantity: 7, price: 15 },
        }
      )
    ).toEqual({
      isLoading: false,
      openAddForm: false,
      items: [
        { id: 48, name: 'newCartItem', quantity: 7, price: 15 },
        { id: 47, name: 'oldCartItem', quantity: 2, price: 10 },
      ],
    });

    expect(
      cartReducer(
        {
          isLoading: false,
          openAddForm: false,
          items: [],
        },
        {
          type: Constants.ADD_ITEM,
          payload: { name: 'newCartItem', quantity: 7, price: 15 },
        }
      )
    ).toEqual({
      isLoading: false,
      openAddForm: false,
      items: [{ id: 1, name: 'newCartItem', quantity: 7, price: 15 }],
    });
  });

  it('should handle DELETE_ITEM', () => {
    expect(
      cartReducer(state, {
        type: Constants.DELETE_ITEM,
        payload: 2,
      })
    ).toEqual({
      isLoading: false,
      openAddForm: false,
      items: [{ id: 1, name: 'item 1', price: 10, quantity: 2 }],
    });
  });

  it('should handle INCREMENT_QUANTITY', () => {
    expect(
      cartReducer(state, {
        type: Constants.INCREMENT_QUANTITY,
        payload: 1,
      })
    ).toEqual({
      isLoading: false,
      openAddForm: false,
      items: [
        { id: 1, name: 'item 1', price: 10, quantity: 3 },
        { id: 2, name: 'item 2', price: 100, quantity: 3 },
      ],
    });
  });

  it('should handle DECREMENT_QUANTITY', () => {
    expect(
      cartReducer(
        {
          ...state,
          items: [{ id: 1, name: 'ItemName', quantity: 5, price: 10 }],
        },
        {
          type: Constants.DECREMENT_QUANTITY,
          payload: 1,
        }
      )
    ).toEqual({
      ...state,
      items: [{ id: 1, name: 'ItemName', quantity: 4, price: 10 }],
    });

    expect(
      cartReducer(
        {
          ...state,
          items: [{ id: 1, name: 'ItemName', quantity: 1, price: 10 }],
        },
        {
          type: Constants.DECREMENT_QUANTITY,
          payload: 1,
        }
      )
    ).toEqual({
      ...state,
      items: [{ id: 1, name: 'ItemName', quantity: 1, price: 10 }],
    });
  });
});
