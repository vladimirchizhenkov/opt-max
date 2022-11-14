import { Component } from '@Core/component';

type CartItemInfo = {
    name: string;
    price: number;
    priceForAll: number;
    quantity: number;
};

const SELECTORS = {
    name: './/h2[contains(@class, "name")]',
    fullPrice: './/div[contains(@class, "fullprice")]',
    quantity: '[data-testid="quantity-current"]',
    priceForOne: './/div[contains(@class, "price-for-one")]',
    addOneButton: './/button[text()="+"]',
    removeOneButton: './/button[text()="-"]',
    deleteItemButton: '[data-testid="delete-btn"]',
};

export class CartItem extends Component {
    public async getPrice(): Promise<number | undefined> {
        const [priceElement] = await this.element
            .waitForXpath(SELECTORS.priceForOne, { timeout: 1000 })
            .catch(() => []);

        if (!priceElement) return;

        const price = priceElement.textContent.split('×')[0].replace('$', '');
        return Number(price);
    }

    public async getPriceForAll(): Promise<number> {
        const [priceElement] = await this.element.waitForXpath(SELECTORS.fullPrice);
        return Number(priceElement.textContent.replace('$', ''));
    }

    public async getName(): Promise<string> {
        const [nameElement] = await this.element.waitForXpath(SELECTORS.name);
        return nameElement.textContent;
    }

    public async getQuantity(): Promise<number> {
        const [quantityElement] = await this.element.waitForQuerySelector(SELECTORS.quantity);
        return Number(quantityElement.textContent);
    }

    public async getInfo(): Promise<CartItemInfo> {
        return {
            name: await this.getName(),
            price: await this.getPrice(),
            quantity: await this.getQuantity(),
            priceForAll: await this.getPriceForAll(),
        };
    }

    public async addOne(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.addOneButton);
    }

    public async removeOne(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.removeOneButton);
    }

    public async delete(): Promise<void> {
        await this.element.clickByCSS(SELECTORS.deleteItemButton);
    }
}
