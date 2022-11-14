import { Container } from '@Core/container';
import { CartList } from '@Components/cartPage/cartList/cartList';
import { AddItemPopup } from "@Components/cartPage/addItemPopup";

const SELECTORS = {
    addCartItemButton: './/button[contains(text(), "Add Cart Item")]',
    addCartItemPopup: './/div[@class="modal" and contains(., "Add New Cart Item")]',

    cartList: './/div[@class="cart__list"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async clickAddCartItemButton(): Promise<void> {
        await document.clickByXpath(SELECTORS.addCartItemButton);
    }

    public async getCartList(): Promise<CartList> {
        const [cartListElement] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartListElement);
    }

    public async getAddCartItemPopup(): Promise<AddItemPopup> {
        const [addItemPopupElement] = await document.waitForXpath(SELECTORS.addCartItemPopup);
        return new AddItemPopup(addItemPopupElement);
    }
}
