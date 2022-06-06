import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Items Request', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPageContainer;

    beforeEach(async () => {
        cartPage = new CartPageContainer();
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();
    });

    test('items info should be correct', async () => {
        const cartList = await cartPage.getCartList();
        const items = await cartList.getCartItems();

        for (const item of items) {
            expect(await item.getInfo()).toMatchSnapshot();
        }
    });
});
