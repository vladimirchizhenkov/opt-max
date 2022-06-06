import { Attribute, attributeToExtractFunc } from './attributeExtractor';

type GetAttributesType = {
    attribute: Attribute | [Attribute];
    elements: Element[];
    filter?: (s: string) => boolean;
};

const getAttribute = (element: Element, attribute: Attribute) => attributeToExtractFunc[attribute](element);

export const getAttributesFromElements = (params: GetAttributesType): string[] | string => {
    const { attribute, elements, filter } = params;

    if (attribute instanceof Array) {
        const attributes = elements.map((elem) => getAttribute(elem, attribute[0]));

        if (filter) {
            return attributes.filter(filter);
        }

        return attributes;
    }

    return getAttribute(elements[0], attribute);
};
