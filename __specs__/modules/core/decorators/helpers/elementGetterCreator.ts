import { getElements, waitForElements } from '@Core/decorators/api/parseSelector';
import { asyncReporterStep, ReporterParams } from '@Core/decorators/helpers/logger';
import { waitFor } from '@Utils/waitFor';

type ElementsGetterCreator = <T>(params: {
    awaitable: boolean;
    converter?: (e: Element) => T;
    reporter?: ReporterParams;
    root: Element | Document;
    selector: string;
    timeout?: number;
}) => Promise<T[]>;

export const createElementGetter: ElementsGetterCreator = async ({
    root,
    selector,
    reporter,
    converter,
    awaitable,
    timeout = 0,
}) => {
    const getElementsConfigured = () =>
        awaitable
            ? waitForElements(root, selector)
            : waitFor(() => getElements(root, selector), { timeout }).catch(() => []);

    const elements = reporter
        ? await asyncReporterStep(getElementsConfigured(), reporter)
        : await getElementsConfigured();

    const convertedElements = elements.map(converter);

    return convertedElements;
};
