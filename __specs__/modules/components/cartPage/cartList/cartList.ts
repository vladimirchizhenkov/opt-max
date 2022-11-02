import { CartItem } from '@Components/cartPage/cartList/cartItem/cartItem';
import { Component } from '@Core/component';

const SELECTORS = {
    cartItems: '[data-testid="cart-item"]',
};

export class CartList extends Component {
    public async getCartItems(): Promise<CartItem[]> {
        const cartItemsElements = await this.element.waitForQuerySelector(SELECTORS.cartItems);
        const cartItems = cartItemsElements.map(i => new CartItem(i));
        return cartItems;
    }
}
