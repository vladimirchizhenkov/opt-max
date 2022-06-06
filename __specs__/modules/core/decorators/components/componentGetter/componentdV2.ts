import { Component } from '@Core/component';
import { Container } from '@Core/container';
import { LogType } from '@Core/decorators';
import { attachToObject } from '@Core/decorators/helpers/attachToObject';
import { createElementGetter } from '@Core/decorators/helpers/elementGetterCreator';
import { isElementExist } from '@Core/decorators/helpers/isExist';
import { ReporterParams } from '@Core/decorators/helpers/logger';
import { reporterAutofiller } from '@Core/decorators/helpers/messageFiller/messageFiller';
import { mergeLeft, omit, pick } from 'ramda';

type ComponentV2SelectorOptions = {
    elementId?: number;
    elementName?: string;
    logType?: LogType;
    s: string;
};

export type CompD<T extends Component | Component[] = Component> = {
    get(): Promise<T>;
    getUnsafe(p?: { timeout: number }): Promise<T | undefined>;
    isExist(): boolean;
};

type ComponentV2GetterOptions = ComponentV2SelectorOptions & ReporterParams;

type ElementHolder<T> = { new (e?: Element | null): T };

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
export function ComponentGetterV2<T extends Component>(
    params: ComponentV2GetterOptions,
    ctor?: ElementHolder<T> | ElementHolder<T>[]
): PropertyDecorator {
    const isNeededToReturnArray = ctor instanceof Array;
    const ElementClass = isNeededToReturnArray ? ctor[0] : ctor ?? (Component as ElementHolder<T>);
    const converter = (e: Element) => new ElementClass(e);

    return function (target: Container | Component, key: string): void {
        const configuredParams = mergeLeft(
            reporterAutofiller({
                elementName: params.elementName ?? key,
                logType: params.logType ?? LogType.ComponentGetting,
            }),
            params
        );

        const reporter = pick<ComponentV2GetterOptions, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const getterOptions = omit<ComponentV2GetterOptions, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const { s: selector } = getterOptions;

        const getFromArrayIfNeeded = (elements: T[]) =>
            isNeededToReturnArray ? elements : elements[params.elementId ?? 0];

        const getter = function (this: Container | Component): CompD<T[] | T> {
            const root = this instanceof Container ? document : this['element'];

            const get = () =>
                createElementGetter({
                    root,
                    converter,
                    awaitable: true,
                    selector,
                    reporter,
                }).then(getFromArrayIfNeeded);

            const getUnsafe = ({ timeout = 0 }) =>
                createElementGetter({
                    root,
                    converter,
                    awaitable: false,
                    selector,
                    reporter,
                    timeout,
                }).then(getFromArrayIfNeeded);

            const isExist = () => isElementExist({ root, selector });

            return { isExist, getUnsafe, get };
        };

        attachToObject({ key, target, getter });
    };
}
