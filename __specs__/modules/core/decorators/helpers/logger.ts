export type ReporterParams = {
    reporterError?: string;
    reporterStart?: string;
};

const throwCoolErrorMessage = (message: string, e: Error) => {
    const coolMessage = `\x1b[41m------ ${message} ------\x1b[0m`;
    throw new Error(`	${coolMessage} \n${e.stack}`);
};

export async function asyncReporterStep<T>(promise: Promise<T> | T, params: ReporterParams): Promise<T> {
    try {
        reporter.startStep(params.reporterStart);
        return await promise;
    } catch (e) {
        throwCoolErrorMessage(params.reporterError, e);
    } finally {
        reporter.endStep();
    }
}

export function syncReporterStep<T>(func: () => T, params: ReporterParams): T {
    try {
        reporter.startStep(params.reporterStart);
        return func();
    } catch (e) {
        throwCoolErrorMessage(params.reporterError, e);
    } finally {
        reporter.endStep();
    }
}
