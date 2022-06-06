import * as log4js from 'log4js';
import prettyFormat from 'pretty-format';

export const debug = (): void => {
    const formattedDom = prettyFormat(document.body, {
        plugins: [prettyFormat.plugins.DOMElement, prettyFormat.plugins.DOMCollection],
        printFunctionName: false,
        highlight: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    log4js.getLogger('DOM Debug').mark(`\n${formattedDom}`);
};
