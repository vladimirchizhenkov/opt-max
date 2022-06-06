export const waitForElements = async (rootElement: Element | Document, selector: string): Promise<Element[]> => {
    const elements =
        selector.startsWith('/') || selector.startsWith('./')
            ? await rootElement.waitForXpath(selector)
            : await rootElement.waitForQuerySelector(selector);

    return elements;
};

export const getElements = (rootElement: Element | Document, selector: string): Element[] => {
    const elements =
        selector.startsWith('/') || selector.startsWith('./')
            ? rootElement.$$x(selector)
            : Array.from(rootElement.querySelectorAll(selector));

    return elements;
};
