import { Component } from '@Core/component';
import { Container } from '@Core/container';
import { LogType } from '@Core/decorators';
import { attachToObject } from '@Core/decorators/helpers/attachToObject';
import { createElementGetter } from '@Core/decorators/helpers/elementGetterCreator';
import { ReporterParams } from '@Core/decorators/helpers/logger';
import { reporterAutofiller } from '@Core/decorators/helpers/messageFiller/messageFiller';
import { mergeLeft, omit, pick } from 'ramda';

type ComponentSelectorOptions = {
    elementId?: number;
    elementName?: string;
    logType?: LogType;
    s: string;
};

type ComponentGetterOptions = ComponentSelectorOptions & ReporterParams;

type ElementHolder<T> = { new (e?: Element | null): T };

export function ComponentGetter<T extends Component>(
    params: ComponentGetterOptions,
    ctor?: ElementHolder<T> | ElementHolder<T>[]
): PropertyDecorator {
    const Constructor = ctor instanceof Array ? ctor[0] : ctor ?? (Component as ElementHolder<T>);

    return function (target: Container | Component, key: string): void {
        const configuredParams = mergeLeft(
            reporterAutofiller({
                elementName: params.elementName ?? key,
                logType: params.logType ?? LogType.ComponentGetting,
            }),
            params
        );

        const reporter = pick<ComponentGetterOptions, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const getterOptions = omit<ComponentGetterOptions, keyof ReporterParams>(
            ['reporterStart', 'reporterError'],
            configuredParams
        );

        const getter = async function (this: Container | Component): Promise<T | T[]> {
            const elements = await createElementGetter({
                root: this instanceof Container ? document : this['element'],
                converter: (e: Element) => new Constructor(e),
                awaitable: true,
                selector: getterOptions.s,
                reporter,
            });

            return ctor instanceof Array ? elements : elements[params.elementId ?? 0];
        };

        attachToObject({ key, target, getter });
    };
}
