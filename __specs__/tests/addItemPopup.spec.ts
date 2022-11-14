import { CartPageContainer } from '@Components/cartPage/cartPage';

const NEW_ITEM_DATA = {
    name: 'Leet o.1337 v2',
    price: 150,
    quantity: 5,
};

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

describe('Add Item Popup', () => {
    let cartPage: CartPageContainer;

    beforeEach(async () => {
        cartPage = new CartPageContainer();
        await cartPage.fulfill(INITIAL_STATE);
    });

    test('popup`s logic should be correct', async () => {
        reporter.startStep('Open "Add Cart Item" popup');
        await cartPage.clickAddCartItemButton();
        reporter.endStep();

        const addItemPopup = await cartPage.getAddCartItemPopup();

        reporter.startStep('Fill all fields');
        await addItemPopup.fillInputName();
        await addItemPopup.fillInputPrice(NEW_ITEM_DATA.price);
        await addItemPopup.fillInputQuantity(NEW_ITEM_DATA.quantity);
        reporter.endStep();

        reporter.startStep('Check error message on `0` as `quantity` value');
        await addItemPopup.fillInputQuantity(0);
        await addItemPopup.clickOnAddBtn();
        expect(await addItemPopup.getErrorMessage()).toBe('This field should be greater or equal then 1')
        reporter.endStep();

        const cartList = await cartPage.getCartList();
        const [item] = await cartList.getCartItems();

        reporter.startStep('Created item should have the same fields as insert one');
        expect(await item.getInfo()).toMatchObject(NEW_ITEM_DATA);
        reporter.endStep();
    });
});
