export function parseElementName(name: string): string {
    return name.replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3').toLowerCase();
}
