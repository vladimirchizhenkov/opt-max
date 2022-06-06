import { ReporterParams } from '@Core/decorators/helpers/logger';
import { parseElementName } from '@Core/decorators/helpers/messageFiller/fieldNameParser';
import { LogType, MessageFillerParams, reporterAutofiller } from '@Core/decorators/helpers/messageFiller/messageFiller';

export type FormatFunc<T> = (...s: T[]) => ReporterParams;

type MessageBuilderParams = {
    /**
     * Name of decorated property
     *
     * Needed for fallback if no other variants provided
     *
     * Like :
     * ```typescript
     * .@AutoLogger()
     * function getWizardBlock() {...}
     * ```
     * Will transform to: `Trying to get wizard block`
     */
    originalName: string;
    /**
     *
     * {@link MessageFillerParams} - elementName & logType for auto filling funtion based on {@link LogType}
     *
     * {@link ReporterParams} - reporterError & reporterStart for manual reporter filling
     *
     * {@link FormatFunc} - format function, will get all arguments passed to the decorated function
     */
    report: MessageFillerParams | ReporterParams | FormatFunc<unknown>;
};

const isRawParams = (p?: MessageFillerParams | ReporterParams): p is ReporterParams =>
    p && 'reporterStart' in p && 'reporterError' in p;

type MessageBuilderCreator = (p: MessageBuilderParams) => FormatFunc<unknown>;

export const createMessageBuilder: MessageBuilderCreator = ({ originalName, report }) => {
    const useAutofillerIfNeeded = (params: MessageFillerParams | ReporterParams): ReporterParams =>
        isRawParams(params)
            ? params
            : reporterAutofiller({
                  elementName: params?.elementName ?? parseElementName(originalName),
                  logType: params?.logType ?? LogType.NoLogType,
              });

    const fillWithCallback = (fill: FormatFunc<unknown>, ...args: unknown[]): ReporterParams =>
        fill.apply(this, args) as ReporterParams;

    const fillMessage = (...args: unknown[]) =>
        report instanceof Function ? fillWithCallback(report, args) : useAutofillerIfNeeded(report);

    return fillMessage;
};
