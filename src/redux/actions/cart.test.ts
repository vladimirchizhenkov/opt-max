import { Constants } from '../types/cart';
import { deleteItem } from './cart';

describe('actions', () => {
  it('should create an action for delete by id', () => {
    const id = 1;
    const expectedAction = {
      type: Constants.DELETE_ITEM,
      payload: id,
    };
    expect(deleteItem(id)).toEqual(expectedAction);
  });
});
