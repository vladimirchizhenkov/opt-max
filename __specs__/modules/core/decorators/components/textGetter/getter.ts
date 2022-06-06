import { getAttributesFromElements } from './getAttributes';

import { Component } from '@Core/component';
import { Container } from '@Core/container';
import { LogType, Attribute } from '@Core/decorators';
import { attachToObject } from '@Core/decorators/helpers/attachToObject';
import { createElementGetter } from '@Core/decorators/helpers/elementGetterCreator';
import { ReporterParams } from '@Core/decorators/helpers/logger';
import { reporterAutofiller } from '@Core/decorators/helpers/messageFiller/messageFiller';
import { mergeLeft, omit, pick } from 'ramda';

type TextGetterParams = {
    attribute?: Attribute | [Attribute];
    elementName?: string;
    filter?: (s: string) => boolean;
    s?: string;
} & ReporterParams;

type SelfTextGetterParams = {
    attribute: Attribute;
    elementName?: string;
} & ReporterParams;

export function TextGetter(params: SelfTextGetterParams): PropertyDecorator;
export function TextGetter(params: TextGetterParams): PropertyDecorator;

export function TextGetter(params: TextGetterParams | SelfTextGetterParams): PropertyDecorator {
    params.attribute = params.attribute ?? Attribute.TextContent;
    return function (target: Container | Component, key: string): void {
        const configuredParams = mergeLeft(
            reporterAutofiller({
                elementName: params.elementName ?? key,
                logType: LogType.AttributeGetting,
            }),
            params
        );

        const reporter = pick<TextGetterParams, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const getterOptions = omit<TextGetterParams | SelfTextGetterParams, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const { s: selector } = getterOptions as TextGetterParams;
        const isSelfUsage = selector === undefined;

        const getter = async function (this: Component | Container): Promise<string | string[]> {
            const root = this instanceof Container ? document : this['element'];

            if (root instanceof Document && isSelfUsage) {
                throw new Error("You can't use text getter on document element directly");
            }

            const getElementsWithReporter = () =>
                createElementGetter({ root, converter: (e) => e, awaitable: true, selector, reporter });

            const elements = isSelfUsage ? [root as Element] : await getElementsWithReporter();

            return getAttributesFromElements({ ...params, attribute: params.attribute, elements });
        };

        attachToObject({ key, target, getter });
    };
}
