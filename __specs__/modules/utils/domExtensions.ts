import { fireEvent } from '@testing-library/react';
import { debug } from '@Utils/debug';
import { waitFor } from '@Utils/waitFor';

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Element {
        $$x: (xpath: string) => Element[];
        $x: (xpath: string) => Element;
        clickByCSS: (selector: string) => Promise<void>;
        clickByXpath: (selector: string) => Promise<void>;
        hoverByCSS: (selector: string) => Promise<void>;
        hoverByXpath: (selector: string) => Promise<void>;
        waitFor: <T>(func: () => T, options?: { timeout: number }) => Promise<T>;
        waitForQuerySelector: (selector: string) => Promise<Element[]>;
        waitForXpath: (selector: string, options?: { timeout: number }) => Promise<Element[]>;
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Document {
        $$x: (xpath: string) => Element[];
        $x: (xpath: string) => Element;
        clickByCSS: (selector: string) => Promise<void>;
        clickByXpath: (selector: string) => Promise<void>;
        hoverByCSS: (selector: string) => Promise<void>;
        hoverByXpath: (selector: string) => Promise<void>;
        waitFor: <T>(func: () => T, options?: { timeout: number }) => Promise<T>;
        waitForQuerySelector: (selector: string) => Promise<Element[]>;
        waitForXpath: (selector: string, options?: { timeout: number }) => Promise<Element[]>;
    }
}

Element.prototype.waitForXpath = async function waitForXpath(
    selector: string,
    options?: { timeout: number }
): Promise<Element[]> {
    const thisElement = this as Element;
    try {
        return await thisElement.waitFor(() => thisElement.$$x(selector), options);
    } catch (e) {
        throw new Error(`Waiting of xpath selector '${selector}' failed \n${(e as Error).stack}`);
    }
};

Element.prototype.waitForQuerySelector = async function waitForQuerySelector(selector: string): Promise<Element[]> {
    const thisElement = this as Element;
    try {
        return await thisElement.waitFor(() => Array.from(thisElement.querySelectorAll<Element>(selector)));
    } catch (e) {
        throw new Error(`Waiting of css selector '${selector}' failed \n${(e as Error).stack}`);
    }
};

Element.prototype.$x = function $x(xpath: string): Element {
    const thisElement = this as Element;
    const [element] = thisElement.$$x(xpath);
    return element;
};

Element.prototype.$$x = function $$x(xpath: string): Element[] {
    const thisElement = this as Element;
    const iterator = document.evaluate(xpath, thisElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    const result: Element[] = [];
    let element = iterator.iterateNext();
    while (element) {
        result.push(element as Element);
        element = iterator.iterateNext();
    }
    return result;
};

Element.prototype.clickByCSS = async function clickByCSS(selector: string): Promise<void> {
    try {
        const thisElement = this as Element;
        const [element] = await thisElement.waitForQuerySelector(selector);
        fireEvent.click(element);
    } catch (e) {
        throw new Error(`Cannot click by css \n${(e as Error).stack}`);
    }
};

Element.prototype.clickByXpath = async function clickByXpath(selector: string): Promise<void> {
    try {
        const thisElement = this as Element;
        const [element] = await thisElement.waitForXpath(selector);
        fireEvent.click(element);
    } catch (e) {
        throw new Error(`Cannot click by xpath \n${(e as Error).stack}`);
    }
};

Element.prototype.hoverByCSS = async function hoverByCSS(selector: string): Promise<void> {
    try {
        const thisElement = this as Element;
        const [element] = await thisElement.waitForQuerySelector(selector);
        fireEvent.mouseOver(element);
    } catch (e) {
        throw new Error(`Cannot hover by css \n${(e as Error).stack}`);
    }
};

Element.prototype.hoverByXpath = async function hoverByXpath(selector: string): Promise<void> {
    try {
        const thisElement = this as Element;
        const [element] = await thisElement.waitForXpath(selector);
        fireEvent.mouseOver(element);
    } catch (e) {
        throw new Error(`Cannot hover by xpath \n${(e as Error).stack}`);
    }
};

Element.prototype.waitFor = waitFor;
Document.prototype.waitFor = Element.prototype.waitFor;
Document.prototype.waitForQuerySelector = Element.prototype.waitForQuerySelector;
Document.prototype.waitForXpath = Element.prototype.waitForXpath;
Document.prototype.$x = Element.prototype.$x;
Document.prototype.$$x = Element.prototype.$$x;
Document.prototype.clickByCSS = Element.prototype.clickByCSS;
Document.prototype.clickByXpath = Element.prototype.clickByXpath;
Document.prototype.hoverByCSS = Element.prototype.hoverByCSS;
Document.prototype.hoverByXpath = Element.prototype.hoverByXpath;
