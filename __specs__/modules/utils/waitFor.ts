import { delay } from '@Utils/delay';

export const waitFor = async function waitFor<T>(
    func: () => T | Promise<T>,
    options: { timeout: number } = { timeout: 10000 }
): Promise<T> {
    const endTime = Date.now() + options.timeout;
    while (Date.now() < endTime) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await func();
        if ((!Array.isArray(result) && result) || (Array.isArray(result) && result.length > 0)) {
            return result;
        }
        await delay(500);
    }
    throw new Error('Timed out.');
};
