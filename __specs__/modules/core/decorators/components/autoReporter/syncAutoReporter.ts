import { createMessageBuilder, FormatFunc } from '@Core/decorators/components/autoReporter/getMessageBuilder';
import { ReporterParams, syncReporterStep } from '@Core/decorators/helpers/logger';
import { MessageFillerParams } from '@Core/decorators/helpers/messageFiller/messageFiller';

type SyncFunctionGuard = TypedPropertyDescriptor<(...args: unknown[]) => unknown>;

export function SyncAutoReporter(): MethodDecorator;
export function SyncAutoReporter(p: ReporterParams): MethodDecorator;
export function SyncAutoReporter(p: MessageFillerParams): MethodDecorator;
export function SyncAutoReporter<T = string>(p: FormatFunc<T>): MethodDecorator;

export function SyncAutoReporter<T = string>(params?: MessageFillerParams | ReporterParams | FormatFunc<T>) {
    return function (_: unknown, key: string, descriptor: SyncFunctionGuard): void {
        const originalMethod = descriptor.value;
        const getMessage = createMessageBuilder({ report: params, originalName: key });

        descriptor.value = function (...args: T[]) {
            const func = syncReporterStep(() => originalMethod.apply(this, args) as unknown, getMessage(...args));

            if (func instanceof Promise) {
                throw new Error('Use @AutoReporter instead of @SyncAutoReporter for your promise based function!');
            }

            return func;
        };
    };
}
