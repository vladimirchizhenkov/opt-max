import { CartStateT, CartItemT, Constants } from '../types/cart';
import { ActionT } from '../actions/cart';

const initialState = {
  isLoading: true,
  openAddForm: false,
  items: [],
};

export const cartReducer = (
  state: CartStateT = initialState,
  action: ActionT
) => {
  switch (action.type) {
    case Constants.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case Constants.GET_ITEMS_ERROR:
      return {
        ...state,
        // Hey, do it really was needed?
        // items: [],
        isLoading: false,
      };
    case Constants.OPEN_ADD_FORM:
      return {
        ...state,
        openAddForm: true,
      };
    case Constants.CLOSE_ADD_FORM:
      return {
        ...state,
        openAddForm: false,
      };
    case Constants.ADD_ITEM:
      return {
        ...state,
        items: [
          {
            ...action.payload,
            id: getNextId(state.items),
          },
          ...state.items,
        ],
        openAddForm: false,
      };
    case Constants.INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            item.quantity = item.quantity + 1;
          }
          return item;
        }),
      };
    case Constants.DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity > 1) item.quantity = item.quantity - 1;
          }
          return item;
        }),
      };
    case Constants.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

/**
 * Get Next Id for new cart item
 * @param items: array of cart items
 */
const getNextId = (items: Array<CartItemT>) =>
  items.reduce((max: number, item) => (max < item.id ? item.id : max), 0) + 1;
