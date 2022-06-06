import { ReporterParams } from '../logger';

export enum LogType {
    ComponentGetting = 'get the following component:',
    NoLogType = '',
    Selecting = 'select',
    FormFilling = 'fill the following form:',
    ButtonClick = 'click',
    TextGetting = 'get text from',
    AttributeGetting = 'get attribute of',
    ComponentActiveness = 'check if the following element is active:',
    ComponentExistence = 'check if the following element exists:',
}

export type MessageFillerParams = {
    elementName: string;
    logType?: LogType;
};

/**
 * Format Like :
 *
 * On start of action : `Trying to %logType% "%elementName%"`
 *
 * On action fail : `Cannot %logType% "%elementName%"`
 */

export function reporterAutofiller(params: MessageFillerParams): ReporterParams {
    const { logType, elementName } = params;

    return {
        reporterStart: `Trying to ${logType} "${elementName}"`,
        reporterError: `Cannot ${logType} "${elementName}"`,
    };
}
