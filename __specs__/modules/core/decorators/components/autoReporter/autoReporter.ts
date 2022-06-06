import { createMessageBuilder, FormatFunc } from '@Core/decorators/components/autoReporter/getMessageBuilder';
import { ReporterParams, asyncReporterStep } from '@Core/decorators/helpers/logger';
import { MessageFillerParams } from '@Core/decorators/helpers/messageFiller/messageFiller';

type AsyncFunctionGuard = TypedPropertyDescriptor<(...args: unknown[]) => Promise<unknown>>;

export function AutoReporter(): MethodDecorator;
export function AutoReporter(p: ReporterParams): MethodDecorator;
export function AutoReporter(p: MessageFillerParams): MethodDecorator;
export function AutoReporter<T = string>(p: FormatFunc<T>): MethodDecorator;

export function AutoReporter<T = string>(params?: MessageFillerParams | ReporterParams | FormatFunc<T>) {
    return function (_: unknown, key: string, descriptor: AsyncFunctionGuard): void {
        const originalMethod = descriptor.value;
        const getMessage = createMessageBuilder({ report: params, originalName: key });

        descriptor.value = function (...args: T[]) {
            return asyncReporterStep(originalMethod.apply(this, args), getMessage(...args));
        };
    };
}
