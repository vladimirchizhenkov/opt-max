export enum Attribute {
    DataTestValue,
    DataTestName,
    Href,
    Class,
    AriaValueNow,
    Value,
    InnerHTML,
    TextContent,
    ShallowText,
}

export const attributeToExtractFunc: Record<Attribute, (e: Element) => string> = {
    [Attribute.DataTestValue]: (e) => e.getAttribute('data-test-value'),
    [Attribute.DataTestName]: (e) => e.getAttribute('data-test-name'),
    [Attribute.Href]: (e) => e.getAttribute('href'),
    [Attribute.Class]: (e) => e.getAttribute('class'),
    [Attribute.AriaValueNow]: (e) => e.getAttribute('aria-valuenow'),
    [Attribute.Value]: (e) => e.getAttribute('value'),
    [Attribute.TextContent]: (e) => e.textContent,
    [Attribute.InnerHTML]: (e) => e.innerHTML,
    [Attribute.ShallowText]: (e) => e.childNodes[0].textContent,
};
