export function attachToObject({
    key,
    target,
    getter,
    setter,
    value,
}: {
    getter?: () => unknown;
    key: string;
    setter?: () => unknown;
    target: unknown;
    value?: () => unknown;
}): void {
    if (delete target[key]) {
        Object.defineProperty(target, key, value ? { value } : { get: getter, set: setter });
    }
}
