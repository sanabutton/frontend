export function arrayFlatten<T>(arr: T[][]): T[] {
  return arr.reduce((a, b) => [...a, ...b]);
}

export function objectFlatten<T>(arr: { [key: string]: T }[]): { [key: string]: T } {
  return arr.reduce((a, b) => ({
    ...a,
    ...b,
  }));
}
