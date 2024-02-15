export function extractRelativeFilePath(fileName: string): string {
    const separator = 'src';
    const relativePath = fileName.split(separator)?.[1];

    return `${separator}${relativePath}`;
}
