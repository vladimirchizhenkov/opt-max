import { CartItem } from '@Components/cartPage/cartList/cartItem/cartItem';
import { CartPageContainer } from '@Components/cartPage/cartPage';

const INITIAL_ITEM_COUNT = 5;

const INITIAL_STATE = {
    cart: {
        isLoading: false,
        openAddForm: false,
        items: [
            {
                name: 'Leet o.1337 v2',
                price: 150,
                quantity: 5,
                id: 1,
            },
        ],
    },
};

describe('Item Quantity', () => {
    let cartPage: CartPageContainer;
    let item: CartItem;

    beforeEach(async () => {
        cartPage = new CartPageContainer();

        await cartPage.fulfill(INITIAL_STATE);

        const cartList = await cartPage.getCartList();
        [item] = await cartList.getCartItems();
    });

    test('increase & decrease item quantity buttons should work', async () => {
        await item.addOne();

        reporter.startStep('Item quantity should be increased by one');
        expect(await item.getQuantity()).toBe(INITIAL_ITEM_COUNT + 1);
        reporter.endStep();

        await item.removeOne();
        await item.removeOne();

        reporter.startStep('Item quantity should be decreased by one');
        expect(await item.getQuantity()).toBe(INITIAL_ITEM_COUNT - 1);
        reporter.endStep();
    });

    test("decreasing quantity to zero shouldn't be possible", async () => {
        // Negative quantity test :)

        reporter.startStep('Item quantity should be one');
        expect(await item.getQuantity()).toBe(1);
        reporter.endStep();
    });
});
