export function extractRelativeFilePath(fileName: string): string {
    const separator: string = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
    const relativePath = fileName.split(separator)?.[1];

    return `${separator}${relativePath}`;
}
