import { Component } from "@Core/component";

const SELECTORS = {
    name: 'input[data-testid="input-name"]',
    price: 'input[data-testid="input-price"]',
    quantity: 'input[data-testid="input-quantity"]',
    errorQuantityField: 'input[data-testid="input-quantity"] + .error',
    addBtn: './/button[contains(text(), "Создать")]'
};

export class AddItemPopup extends Component {
    public async fillInputName (name: string | number) {
        await this.element.fillTextByCss(SELECTORS.name, name);
    }

    public async fillInputPrice (price: number) {
        await this.element.fillTextByCss(SELECTORS.price, price);
    }

    public async fillInputQuantity (quantity: number) {
        await this.element.fillTextByCss(SELECTORS.quantity, quantity);
    }

    public async getErrorMessage(): Promise<string> {
        const [errorElement] = await this.element.waitForQuerySelector(SELECTORS.errorQuantityField);
        return String(errorElement.textContent);
    }

    public async clickOnAddBtn (): Promise<void> {
        await this.element.clickByXpath(SELECTORS.addBtn);
    }
}